import React from "react";
import styles from "./style.module.css";
import { nextClient } from '../../../lib/api-client';
import { useState } from "react";
import { useRouter } from "next/router";
import { QRCode } from "react-qr-svg";
import { useCookies } from "react-cookie";

export default function Auth({ secret, token, path, pw, username, jwt }) {
  const [code, setCode] = useState('');
  const [cookies, setCookie] = useCookies(['jwt'])
  const router = useRouter();
  const [wrongCode, setWrongCode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    nextClient
      .post('/auth', {
        'token': token,
        'auth_code': code,
      })
      .then(() => {
        if(pw && username) {
          nextClient
          .post(path, {
            uid: token,
            pw: pw,
            username: username,
          });
        } else {
          let d = new Date();
          d.setTime(d.getTime() + (90*60*1000));
          console.log(d);
          setCookie("jwt", jwt, {path: "/", expires: d});
          console.log('Foi');
        }
        router.push('/');
      })
      .catch((err) => {
        if (err.response?.status === 400 && err.response.data) {
          if (err.response.data === 'Wrong code') {
            if (!wrongCode) {
              setWrongCode(true);
            }
          }
        }
      });
  };

  return (
    <>
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
      </div>
    </>
  );
}