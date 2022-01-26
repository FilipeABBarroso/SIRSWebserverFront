import React from "react";
import styles from "./style.module.css";
import { nextClient } from '../../../lib/api-client';
import { useState } from "react";
import { useRouter } from "next/router";
import { QRCode } from "react-qr-svg";
import File from "../../File";

export default function Auth({ secret, token, path, pw, username, jwt, fileAuth }) {
  const [code, setCode] = useState('');
  const router = useRouter();
  const [wrongCode, setWrongCode] = useState(false);
  const [file, setFile] = useState(false);

  if(!token) {
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(fileAuth !== undefined){
      nextClient
        .post('/authFile', {
          'token': token,
          'auth_code': code,
        }).then((res) => {
          setFile(true);
        })
        .catch((err) => {
          if (err.response?.status === 401 && err.response.data) {
            if (err.response.data === 'Wrong code') {
              if (!wrongCode) {
                setWrongCode(true);
              }
            }
          }
        });
    } else {
      nextClient
        .post('/auth', {
          'token': token,
          'auth_code': code,
        })
        .then(() => {
          if(pw && username) { //register
            nextClient
            .post(path, {
              uid: token,
              pw: pw,
              username: username,
            });
            router.push('/');
          } else {
            localStorage.setItem("token", jwt); //login
            router.push('/files');
          }
        })
        .catch((err) => {
          if (err.response?.status === 401 && err.response.data) {
            if (err.response.data === 'Wrong code') {
              if (!wrongCode) {
                setWrongCode(true);
              }
            }
          }
        });
    }
  };

  return (
    <>
      {
        file ? (
          <div>
              <div className={styles.header}>
                  <div className={styles.buttons}>
                      <button onClick={(e) => {router.push('/')}}>Back</button>
                  </div>
              </div>
              <File file={fileAuth} />
          </div>
      ) : (
          <div className={styles.root}>
          {
            secret ? (
              <div>
                <h1 className={styles.h1}>Scan the QRCode :)</h1>
                <div className={styles.qrcode}>
                  <QRCode
                    level="Q"
                    className={styles.qrSize}
                    value={JSON.stringify({
                      secret: secret,
                      token: token,
                    })}
                  />
                </div>
              </div>
            ) : null
          }
          <h1 className={styles.h1}>Insere já o código bro</h1>
          <input type='text' value={code} required onChange={(e) => {
            setCode(e.target.value);
          }} />
          <button onClick={handleSubmit}>submit</button>
          {
            wrongCode ? (
              <label className={styles.label}>Wrong code</label>
            ) : null
          }
        </div>)

      }
    </>
  );
}