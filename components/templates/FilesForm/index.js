import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import File from "../../File"
import {useRouter} from "next/router"
import classNames from "classnames";
import { nextClient } from "../../../lib/api-client";
import AuthPage from "../AuthForm"
import { string } from "prop-types";

export default function Files () {
    const [isMyFiles, setMyFiles] = useState(true);
    const [isDelegatedFiles, setDelegatedFiles] = useState(true);
    const [back, setBack] = useState(false);
    const [main, setMain] = useState(true);
    const [auth, setAuth] = useState(false);
    const [file, setFile] = useState(false);
    const [fileContent, setFileContent] = useState();
    const [items, setItems] = useState();
    const [selected, setSelected] = useState([]);
    const router = useRouter();
    let files = null;

    const handleFiles = async (e) => {
        e.preventDefault();
        const fh = []
        localStorage.setItem("fileHashes", JSON.stringify(fh));
        nextClient
        .post('/getFiles', {
            token: localStorage.getItem("token"),
        })
        .then((res) => {
            files = res.data;
            setItems(files.map((file) => (
                <div className={styles.wrapper}>
                    <div className={classNames(['box', styles.container])}>
                        <div className={styles.svg}>
                        {
                            file.isBlocked ? (
                                    <img alt="" src="/locker.svg" />
                                
                            ) : null
                        }
                        </div>
                        <div className={styles.ficheiro}>
                            <label className={styles.label} >{file.title}</label>
                            <div className={styles.button}>
                                <button id={file.id} onClick={(e) => {
                                    if(file.isBlocked){
                                        setAuth(true);
                                        setMain(false);
                                        setFileContent(file);
                                        setFile(false);
                                    } else {
                                        setAuth(false);
                                        setMain(false);
                                        setFileContent(file);
                                        setFile(true);                                    
                                    }
                                }}>Open</button>
                                <input type="checkbox" value={file.fileHash} id={file.id} onChange={handleCheck}/*() => {
                                    if(selected.indexOf(file.fileHash) !== -1){
                                        setSelected(selected.splice(selected.indexOf(file.fileHash)));
                                    } else {
                                        setSelected(selected.push(file.fileHash));
                                    }
                                }} */ />
                                <label>Add to delegate</label>
                            </div>
                        </div>
                    </div>
                </div> )
            ));
            setDelegatedFiles(true);
            setMyFiles(false);
            setBack(true);
            selected=[];
        })
        .catch((err) => {
            console.log((err));
        });
    }

    const handleDelegation = async (e) => {
        e.preventDefault();
        nextClient
        .post('/getDelegated', {
            token: localStorage.getItem("token"),
        })
        .then((res) => {
            files = res.data;
            setItems(files.map((file) => (
                <div className={styles.wrapper}>
                    <div className={classNames(['box', styles.container])}>
                        <div className={styles.ficheiro}>
                            <label className={styles.label} >{file.title}</label>
                            <div className={styles.button}>
                                <button onClick={(e) => {
                                    setAuth(false);
                                    setMain(false);
                                    setFileContent(file);
                                    setFile(true);                                    
                                }}>Open</button>
                            </div>
                        </div>
                    </div>
                </div> )
            ));
            setDelegatedFiles(false);
            setMyFiles(true);
            setBack(true);
        })
        .catch((err) => {
            console.log((err));
        });
    }

    const handleDelegateFiles = async (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("fileHashes")+ '  aaa');
        nextClient
        .post('setDelegate', {
            'token': localStorage.getItem("token"),
            'fileHashes': JSON.parse(localStorage.getItem("fileHashes")),
        }).then(() => {
            localStorage.removeItem("fileHashes");
            router.push('/');
        })
        .catch((err) => {
            console.log((err));
        });
    }

    const handleCheck = (e) => {
        var updatedList = JSON.parse(localStorage.getItem("fileHashes"));
        if(e.target.checked){
            updatedList.push(e.target.value);
        } else {
            updatedList.splice(updatedList.indexOf(e.target.value), 1);
        }
        localStorage.setItem("fileHashes", JSON.stringify(updatedList));
    }

    return (
      <>
        { 
          main ? (
            <div>
                <div className={styles.header}>
                    <h1 className={styles.h1}>Files</h1>
                    <div className={styles.buttons}>
                        {
                            isMyFiles ? (
                                <button onClick={handleFiles}>My Files</button>
                            ) : null
                        }
                        {
                            isDelegatedFiles ? (
                                <button onClick={handleDelegation}>My delegated files</button>
                            ) : null
                        }

                        {
                            back ? (
                                <button onClick={(e) => {router.push('/');}}>Main Page</button>
                            ) : null
                        }
                        
                        <button onClick={(e) => {router.push('/createFile')}}>Create File</button>
                        <button onClick={handleDelegateFiles}>Delegate Files</button>
                        <button onClick={(e) => {
                            localStorage.removeItem('token');
                            router.push('/');
                        }}>
                        Logout
                        </button>
                    </div>
                </div>
                <div className={styles.wrapper}>
                    {items}
                </div>
            </div>
          ) : null
        }
        {
            file ? (
                <div>
                    <div className={styles.header}>
                        <div className={styles.buttons}>
                            <button onClick={(e) => {router.push('/');}}>Back</button>
                        </div>
                    </div>
                    <File file={fileContent} />
                </div>
            ) : null
        }
        {
            auth ? (
                <AuthPage token={localStorage.getItem("token")} fileAuth={fileContent} />
            ): null
        }
      </>
    );
};