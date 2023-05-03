import { GameList } from "../../components"
import styles from "./index.module.css"

export default function Activities() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["header"]}>
          <div className={styles["header-content"]}>
            <h1 className={styles["welcome-message"]}>Good Morning, Bob!</h1>
            <p className={styles["message"]}>Some amount of words about progress and other things I presume</p>
          </div>
          <button className="btn">Call to action</button>
        </div>
        <GameList />
      </div>
    </div>
  )
}
