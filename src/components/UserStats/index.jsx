import { useAuth } from "../../contexts/authContext";
import styles from './styles.module.css'
import {AiFillStar} from "react-icons/ai"

export default function UserStats() {
    const { user } = useAuth();

  return (
    <div className={styles["header"]}>
      <div className={styles["header-content"]}>
        <h2 className={styles["welcome-message"]}>Long Term Goals</h2>
        <div className={styles["task-list"]}>
          {user.goals.length ? user.goals.map((g, i) => <Goals key={i} task={g} />) : null}
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