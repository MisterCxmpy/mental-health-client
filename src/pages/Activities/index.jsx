import { GameList, UserStats } from "../../components"
import styles from "./index.module.css"

export default function Activities() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <UserStats />
        <GameList />
      </div>
    </div>
  )
}
