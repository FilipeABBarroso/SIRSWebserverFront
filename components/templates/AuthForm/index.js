import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import TextField from "../../TextField";
import { useRouter } from "next/router";

export default function Auth(){
    const router = useRouter();

    const handleForm = () => {
        router.push('/');
    };

    return (
        <>
            <div className={styles.outerWrapper}>
                <div className={styles.wrapper}>
                    <div className={classNames(['box', styles.container])}>
                        <h1 className={styles.h1}>Authenticate Your Account</h1>
                        <p className={styles.p}>Protecting your tickets is our top priority. Please confirm your
                            account by entering the authorization code.</p>
                        <form className={styles.form} onSubmit={handleForm}>
                            <div className={styles.inputs}>
                                <label>Code</label>
                                <input input='text' />
                            </div>
                            <div className={styles.inputs}>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}