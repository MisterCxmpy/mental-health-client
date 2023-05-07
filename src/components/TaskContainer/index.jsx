/* eslint-disable react/prop-types */
import { useAuth } from "../../contexts/authContext";
import styles from "./index.module.css"
import { Link } from 'react-router-dom'

export default function TaskContainer({ goals = [], getUserGoals }) {
  return (
    <div className={styles["task-container"]}>
      <div className={styles["task-content"]}>
        <h2>My AIMentor:</h2>
        <div className={styles["task-list"]}>
          {goals.length ? goals.map(g => (<PromptTask {...g} key={g.id} />)) : null}
        </div>
      </div>
      <div className={styles["control-options"]}>
        <Link to={'/my-ai-mentor'}><button className="btn">Have a chat</button></Link>
        <button onClick={async () => await getUserGoals()} className="btn">Reroll ideas</button>
      </div>
    </div>
  );
}

function PromptTask({ task = 'Lorem ipsum.', id, completed }) {
  const { completeStGoal } = useAuth()

  return (
    <div className={styles["prompt-task"]}>
      <h3>
        {task}
      </h3>

     {!completed ? <button className="btn" onClick={async () => await completeStGoal(id)}>Complete</button> : <h3>Done</h3>}
    </div>
  );
}
