import styles from "./index.module.css"

export default function Modal({ setOpen, content, overlayOff=false }) {
  return (
    <>
      {!overlayOff? <div className={styles["overlay"]} role="overlay"></div> : ''}
      <div className={styles["modal"]} role="modal">
        <button className={styles["close-btn"]} onClick={() => setOpen(false)}>&times;</button>
        {content}
      </div>
    </>
  )
}
