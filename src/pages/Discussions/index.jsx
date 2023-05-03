import styles from "./index.module.css"

export default function Discussions() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["search"]}>
          <div className={styles["profile-picture"]}></div>
          <form className={styles["search-form"]}>
            <div className={styles["input"]}>
              <input className={styles["search-bar"]} type="text" placeholder="Search Discussion" required/>
            </div>
          </form>
        </div>
        <div className={styles["tags"]}>
          <div className={styles["tag"]}>
            <p>Self Help</p>
          </div>
          <div className={styles["tag"]}>
            <p>Stoicism</p>
          </div>
          <div className={styles["tag"]}>
            <p>Fitness</p>
          </div>
          <div className={styles["tag"]}>
            <p>DietBros</p>
          </div>
        </div>
        <div className={styles["posts"]}>
          <div className={styles["post"]}>
            <div className={styles["content"]}>
              <h1>This is a test discussion</h1>
              <p className={styles["post-op"]}>Username</p>
              <p>In this section we’ll have text pertaining to the actual discussion at hand, maybe the first question posted but cut...</p>
            </div>
            <div className={styles["options"]}>
              <p>81 Comments</p>
              <p>Favourite</p>
            </div>
          </div>
          <div className={styles["post"]}>
            <div className={styles["content"]}>
              <h1>This is a test discussion</h1>
              <p className={styles["post-op"]}>Username</p>
              <p>In this section we’ll have text pertaining to the actual discussion at hand, maybe the first question posted but cut...</p>
            </div>
            <div className={styles["options"]}>
              <p>81 Comments</p>
              <p>Favourite</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
