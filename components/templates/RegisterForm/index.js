import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { useRouter } from "next/router";
import { nextClient } from '../../../lib/api-client';
import { useState } from "react";

export default function Register(){
    const [username, setUsername] = useState('');
    const [pw, setPw] = useState('');
    const [error, setError] = useState(false);

    const router = useRouter();

    const handleForm = async (e) => {
        e.preventDefault();
        nextClient
        .post('/registration', {
            'username': username,
            'pw': pw,
        })
        .then((res) => {
            router.push('/auth');
            console.log(res);
        })
        .catch((err) => {
            if(err.response?.status === 400 && err.response.data === 'existing user'){
                if(!error){
                    setError(true);
                }
            }
        });
    };

    return (
        <>
            <div className={styles.outerWrapper}>
                <div className={styles.wrapper}>
                    <div className={classNames(['box', styles.container])}>
                        <h1 className={styles.h1}>Register</h1>
                        <form className={styles.form} onSubmit={handleForm} >
                            <div className={styles.inputs}>
                                <label className={styles.label}>Username</label>
                                <input type='text' value={username} required onChange={(e) => {
                                    setUsername(e.target.value);
                                    setError(false);
                                }} />
                                {
                                    error ? (
                                        <label className={styles.label}>Username already exists</label>
                                    ) : null
                                }
                            </div>
                            <div className={styles.inputs}>
                                <label className={styles.label} >Password</label>
                                <input type='password' value={pw} required minLength="5" onChange={(e) => setPw(e.target.value)} />
                            </div>
                            <button type="submit">Regist</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}