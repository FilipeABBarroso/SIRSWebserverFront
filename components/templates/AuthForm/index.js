import React from "react";
import styles from "./style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { QRCode } from "react-qr-svg";

export default function Auth(){
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSubmit = () => {

  };



  return (
    <>
      <div className={styles.root}>
        <h1 className={styles.h1}>Scan the QRCode :)</h1>
        <div className={styles.qrcode}>
          <QRCode
            level="Q"
            className={styles.qrSize}
            value={JSON.stringify({
              secret: "JF2SYTLEKRVT4OS3MMYC67K6KRVUUT2MHAZTQKTMJ4XTAUZGONJA",
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGQ3MmY0ZmMtMTk2OS00ZjBmLTk3MDctMzM2OTVhMmYxMjA2IiwiaWF0IjoxNjQyOTgwMjk3fQ.p_5b95Z0q7eZXmoRLdApo-EuCSNpnACnV9obpleCXJU"
            })}
          />
        </div>
        <h1 className={styles.h1}>Insere já o código bro</h1>
        <input type='text' value={code} required onChange={(e) => {
          setCode(e.target.value);
        }} />
        <button onClick={handleSubmit}>submit</button>
      </div>
    </>
  );
}