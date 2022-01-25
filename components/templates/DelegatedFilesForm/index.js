import React from "react";
import styles from "./style.module.css";
import File from "../../File"
import {useRouter} from "next/router"
import { nextClient } from "../../../lib/api-client";

export default function DelegatedFiles ({files}) {
    const router = useRouter();

    return (
      <>
        <div className={styles.header}>
            <h1 className={styles.h1}>My Delegated Files</h1>
            <div className={styles.buttons}>
                <button onClick={(e) => {router.push('/files')}}>Back</button>
            </div>
        </div>
        <div className={styles.wrapper}>
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