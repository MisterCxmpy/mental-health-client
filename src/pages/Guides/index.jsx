import styles from "./index.module.css"

export default function Guides() {

  const calcColourIndex = index => ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

  return (
    <div className="layout">
      <div className={styles["container"]}>
        <h1>General Wellbeing</h1>
        <div className={styles["section"]}>
          <div className={`${styles["card"]} ${styles[`color-2`]}`}>
            <div className={styles["card-image"]}></div>
            <div className={styles["content"]}>
              <p>The importance of a consistent sleeping schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
