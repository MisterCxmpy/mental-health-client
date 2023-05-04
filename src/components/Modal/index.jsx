import styles from "./index.module.css"

export default function Modal({setOpen, content}) {
  return (
    <>
      <div className={styles["overlay"]}></div>
      <div className={styles["modal"]}>
        <button className={styles["close-btn"]} onClick={() => setOpen(false)}>&times;</button>
        {content}
      </div>
    </>
  )
}
