import { useState, useEffect } from "react"
import styles from "./index.module.css"
import { useAuth } from "../../contexts/authContext"

export default function CreateForum({ setOpen }) {

  const [title, setTitle] = useState()
  const [body, setBody] = useState()
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
    console.log(user)
    console.log(user.user_id)
    const data = await response.json()
    console.log(data, "data")
    setOpen(false);
  }
  

  return (
    <div className={styles["forum"]}>
      <form className={styles["forum-form"]} onSubmit={handleSubmit}>
        <div className={styles["input"]}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <span>Title</span>
        </div>
        <div className={styles["input"]}>
          <textarea type="text" value={body} onChange={(e) => setBody(e.target.value)} />
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
