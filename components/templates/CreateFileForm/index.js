import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { useState } from "react";
import { nextClient } from '../../../lib/api-client';
import { useRouter } from "next/router";

export default function CreateFile () {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isBlocked , setPrivate] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        nextClient
        .post('/createFile', {
            title: title,
            content: content,
            isBlocked: isBlocked,
        }).then((res) => {
            router.push('/files');
        })
        .catch((err) =>{
            console.log(err);
        });
    };

    return (
      <>
        <div className={styles.wrapper}>
          <div className={classNames(['box', styles.container])}>
            <div className={styles.ficheiro}>
                <h1 className={styles.h1} >Create File</h1>
                <label>Title</label>
                <input type="text" onChange={(e) => {
                  setTitle(e.target.value);
                }} />
                <label className={styles.label}>Content</label>
                <textarea type="textArea" onChange={(e) => {
                  setContent(e.target.value);
                }} />
                <div className={styles.lowerButtons}>
                  <div>
                    <button onClick={handleClick}>Create</button>
                    <input type="checkbox" onClick={(e) => {
                        setPrivate(true);
                    }}/>
                    <label>Set as private</label>
                  </div>
                  <button onClick={(e) => {router.push('/files')}}>Cancel</button>
                </div>
            </div>
          </div>
        </div>
      </>
    );

    };