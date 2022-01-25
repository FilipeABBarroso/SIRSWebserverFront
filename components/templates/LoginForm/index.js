import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { nextClient } from '../../../lib/api-client';
import { useRouter } from "next/router";
import { useState } from "react";
import AuthForm from "../AuthForm"

export default function Login(){
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');
    const [jwt, setJWT] = useState('');
    const [token, setToken] = useState('');
    const [wrongPW, setWrongPW] = useState(false);
    const [qr, setQR] = useState(false);
    const [wrongUser, setWrongUser] = useState(false);

    if(localStorage.getItem("token")){
        router.push('/')
    }

    const handleForm = async (e) => {
        e.preventDefault();
        nextClient
        .post('/login', {
            'username': username,
            'pw': pw,
        })
        .then((res) => {
            setToken(res.data.token); //to auth server
            setJWT(res.data.uid);
            setQR(true);
        })
        .catch((err) => {
            if(err.response?.status === 400 && err.response.data){
                if(err.response.data === 'Wrong username'){
                    if(!wrongUser){
                        setWrongUser(true);
                    }
                }
                if(err.response.data === 'Wrong password'){
                    if(!wrongPW){
                        setWrongPW(true);
                    }
                }
            }
        });
    };

    return (
        <>
            {
                qr ? (
                    <AuthForm path="/login" jwt={jwt} token={token}/>
                    ) : (
                        <div className={styles.outerWrapper}>
                            <div className={styles.wrapper}>
                                <div className={classNames(['box', styles.container])}>
                                    <h1 className={styles.h1}>Login</h1>
                                    <form className={styles.form} onSubmit={handleForm}>
                                        <div className={styles.inputs}>
                                            <label className={styles.label}>Username</label>
                                            <input type='text' value={username} required onChange={(e) => {
                                                setUsername(e.target.value);
                                                setWrongUser(false);
                                            }} />
                                            {
                                                wrongUser ? (
                                                    <label className={styles.label}>Username does not exist</label>
                                                ) : null
                                            }
                                        </div>
                                        <div className={styles.inputs}>
                                            <label className={styles.label} >Password</label>
                                            <input type='password' value={pw} required minLength="5" onChange={(e) => {
                                                setPw(e.target.value);
                                                setWrongPW(false);
                                            }} />

                                            {
                                                wrongPW ? (
                                                    <label className={styles.label}>Wrong password</label>
                                                ) : null
                                            }
                                        </div>
                                        <button type="submit">Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
            }
            
        </>
    );
}