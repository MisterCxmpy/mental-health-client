
import { MeditationList } from "../../components"
import styles from "./index.module.css"

export default function Home() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <div className={styles["header-content"]}>
            <h1 className={styles["welcome-message"]}>Good Morning, Bob!</h1>
            <p className={styles["message"]}>Some amount of words about progress and other things I presume</p>
          </div>
          <button className={styles["btn"]}>Call to action</button>
        </div>
        <MeditationList />
        <div className={styles["task-container"]}>
          <div className={styles["task-content"]}>
            <h2>My AIMentor:</h2>
            <div className={styles["task-list"]}>
              <div className={styles["prompt-task"]}><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!</h3></div>
              <div className={styles["prompt-task"]}><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!</h3></div>
              <div className={styles["prompt-task"]}><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!</h3></div>
              <div className={styles["prompt-task"]}><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!</h3></div>
              <div className={styles["prompt-task"]}><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!</h3></div>
              <div className={styles["prompt-task"]}><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius possimus voluptates, dolor aperiam obcaecati voluptatem!</h3></div>
            </div>
          </div>
          <div className={styles["control-options"]}>
            <button className={styles["btn"]}>Have a chat</button>
            <button className={styles["btn"]}>Reroll ideas</button>
          </div>
        </div>
      </div>
    </div>
  )
}
