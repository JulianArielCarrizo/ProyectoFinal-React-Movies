import { FaSpinner } from "react-icons/fa6";
import styles from './Spinner.module.css';
export function Spinner (){
    return(
        <div className={styles.spinner}>
            <FaSpinner className={styles.spinnerMov} size={65}/>
        </div>
    )

}