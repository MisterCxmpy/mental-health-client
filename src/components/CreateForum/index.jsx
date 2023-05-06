import { useState, useEffect } from "react"
import styles from "./index.module.css"
import { useAuth } from "../../contexts/authContext"

export default function CreateForum({ setOpen, setForums }) {

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/forums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify({
        user_id: user.user_id,
        title: title,
        content: body,
      })
    })
    const data = await response.json()
    
    setForums(prev => [...prev, data])
    setOpen(false);
  }
  

  return (
    <div className={styles["forum"]}>
      <form className={styles["forum-form"]} onSubmit={handleSubmit}>
        <div className={styles["input"]}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required role="titleInput"/>
        </div>
        <div className={`${styles["input"]} ${styles["textarea"]}`}>
          <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body (Optional)" role="bodyTextarea"/>
        </div>
        <div className={styles["input"]}>
          <button className={`${styles["submit-btn"]} btn`} type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  )
}
