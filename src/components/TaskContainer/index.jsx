import PromptTask from "../PromptTask";
import styles from "./index.module.css"

export default function TaskContainer() {
  return (
    <div className={styles["task-container"]}>
      <div className={styles["task-content"]}>
        <h2>My AIMentor:</h2>
        <div className={styles["task-list"]}>
          <PromptTask />
        </div>
      </div>
      <div className={styles["control-options"]}>
        <button className={styles["btn"]}>Have a chat</button>
        <button className={styles["btn"]}>Reroll ideas</button>
      </div>
    </div>
  );
}

function PromptTask({task}) {
  return (
    <div className={styles["prompt-task"]}>
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus
        voluptates, dolor aperiam obcaecati voluptatem!
      </h3>
    </div>
  );
}
