import { useAuth } from "../../contexts/authContext";
import styles from './styles.module.css'
import {AiFillStar} from "react-icons/ai"

export default function UserStats() {
    const { user } = useAuth();

  return (
    <div className={styles["header"]} role="header">
      <div className={styles["header-content"]} role="header-content">
        <h2 className={styles["welcome-message"]} role="welcome-message">Long Term Goals</h2>
        <div className={styles["task-list"]} role="task-list">
          {user.goals.length ? user.goals.map((g, i) => <Goals key={i} task={g} role="listitem"/>) : null}
        </div>
      </div>
    </div>
  )
}

function Goals({ task }) {
  return (
    <div className={styles["goal"]}>
      <AiFillStar />
      <h3>
        {task}
      </h3>
    </div>
  );
}