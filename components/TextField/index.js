import styles from "./style.module.css";

const TextField = ({label, type, ...inputFieldProps}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input type={type} {...inputFieldProps}/>
        </div>
    );
};

export default TextField;