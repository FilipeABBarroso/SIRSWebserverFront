import React from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { nextClient } from '../../lib/api-client';

export default function File ({title}) {

    const handleClick = async (e) => {
        e.preventDefault();
        nextClient
        .post('/openFile', {
            title: title,
        })
    };

    return (
      <>
        <div className={styles.wrapper}>
          <div className={classNames(['box', styles.container])}>
            <div className={styles.ficheiro}>
                <label className={styles.label} >{title}</label>
                <div>
                  <button onClick={handleClick}>Open</button>
                  <input type="checkbox" />
                </div>
            </div>
          </div>
        </div>
      </>
    );

    };