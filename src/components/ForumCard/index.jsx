import { VscComment } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ForumCard({ title, content, user_id, forum_id}) {

  const [username, setUsername] = useState("")

  async function getUser() {
    const response = await fetch(`http://localhost:3000/user/${user_id}`)

    const { username } = await response.json()

    if (response.ok) {
      setUsername(username)
    } else {
      console.log("Failed to fetch username")
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Link to={`/discussions/${forum_id}`}>
      <div className={styles["post"]}>
        <div className={styles["content"]}>
          <h1>{title}</h1>
          <p className={styles["post-op"]}>{username}</p>
          <p>{content}</p>
        </div>
        <div className={styles["options"]}>
          <p>
            <VscComment />
            0 Comments
          </p>
          <p>
            <AiOutlineStar />
            Favourite
          </p>
        </div>
      </div>
    </Link>
  );
}
