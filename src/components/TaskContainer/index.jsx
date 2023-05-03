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
        <button className="btn">Have a chat</button>
        <button className="btn">Reroll ideas</button>
      </div>
    </div>
  );
}

function PromptTask({ task = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!' }) {
  return (
    <div className={styles["prompt-task"]}>
      <h3>
      {task}
      </h3>
    </div>
  );
}
