
import { MeditationList, TaskContainer, UserStats } from "../../components"
import styles from "./index.module.css"

export default function Home() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <UserStats />

        <MeditationList />

        <TaskContainer />
      </div>
    </div>
  )
}
