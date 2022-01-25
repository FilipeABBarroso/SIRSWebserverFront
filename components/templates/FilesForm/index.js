import React from "react";
import styles from "./style.module.css";
import File from "../../File"
import {useRouter} from "next/router"
import { nextClient } from "../../../lib/api-client";

export default function Files ({files}) {
    const router = useRouter();

    const handleDelegation = async (e) => {
        e.preventDefault();
        nextClient
        .post('/delegation', {
            id: id,
        })
    }

    return (
      <>
        <div className={styles.header}>
            <h1 className={styles.h1}>Files</h1>
            <div className={styles.buttons}>
                <button onClick={handleDelegation}>Delegate Files</button>
                <button onClick={(e) => {router.push('/createFile')}}>Create File</button>
                <button onClick={(e) => {router.push('/delegatedFiles')}}>My delegated files</button>
                <button onClick={(e) => {
                    localStorage.removeItem('token');
                    router.push('/');
                }}>
                  Logout
                </button>
            </div>
        </div>
        <div className={styles.wrapper}>
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
          <File title='exemplo' />
        </div>
      </>
    );
};