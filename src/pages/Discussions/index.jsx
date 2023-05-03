import styles from "./index.module.css"

export default function Discussions() {
  return (
    <div className="layout">
      <div className={styles["search"]}>
        <div className={styles["profile-picture"]}></div>
        <form className={styles["search-form"]}>
          <div className={styles["input"]}>
            <input className={styles["search-bar"]} type="text" placeholder="Search Discussion" required/>
          </div>
        </form>
      </div>
    </div>
  )
}
