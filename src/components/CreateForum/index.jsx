import { useState } from "react"
import styles from "./index.module.css"

export default function CreateForum() {

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  return (
    <div className={styles["forum"]}>
      <form className={styles["forum-form"]}>
        <div className={styles["input"]}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required role="titleInput"/>
          <span>Title</span>
        </div>
        <div className={styles["input"]}>
          <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} role="bodyTextarea"/>
          <span>{"Text (Optional)"}</span>
        </div>
        <div className={styles["input"]}>
          <button className={`${styles["submit-btn"]}`} type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}
