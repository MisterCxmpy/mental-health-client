import { Outlet } from "react-router-dom"
import styles from "./index.module.css"

export default function Navbar() {
  return (
    <>
      <nav className={styles["navbar"]}>
        <div className={styles["profile"]}>
          <div className={styles["profile-options"]}>
            <div className={styles["profile-btn"]}>My profile</div>
            <div className={styles["profile-btn"]}>S</div>
          </div>
          <div className={styles["profile-info"]}>
            <div className={styles["profile-picture"]}></div>
            <div className={styles["profile-name"]}>Bob</div>
            <div className={styles["progress"]}>40% Completed</div>
            <div className={styles["inspiration-message"]}>Keep smiling, because life is a beautiful thing and there's so much to smile about.</div>
          </div>
        </div>
        <div className={styles["navigation"]}>
          <button className={styles["btn"]}>Home</button>
          <button className={styles["btn"]}>Activities</button>
          <button className={styles["btn"]}>Chatrooms</button>
          <button className={styles["btn"]}>My AIMentor</button>
          <button className={styles["btn"]}>Meditations</button>
          <button className={styles["btn"]}>MindStore</button>
        </div>
      </nav>
      <Outlet />
    </>
  )
}
