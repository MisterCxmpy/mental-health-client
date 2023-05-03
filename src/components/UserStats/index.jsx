import { useAuth } from "../../contexts/authContext";
import styles from './styles.module.css'

export default function UserStats() {
    const { user } = useAuth();

    return (
        <div className={styles["header"]}>
            <div className={styles["header-content"]}>
                <h1 className={styles["welcome-message"]}>Good Morning, {user.username}!</h1>
                <p className={styles["message"]}>Some amount of words about progress and other things I presume</p>
            </div>
            <button className="btn">Call to action</button>
        </div>
    )
}