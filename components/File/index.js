import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";

export default function File ({file}) {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={classNames(['box', styles.container])}>
            <div className={styles.ficheiro}>
                <h2 className={styles.h2}>Title</h2>
                <label className={styles.label} >{file.title}</label>
                <h2 className={styles.h2}>Content</h2>
                <label className={styles.label} >{file.content}</label>
            </div>
          </div>
        </div>
      </>
    );

    };