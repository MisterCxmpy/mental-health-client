import { VscComment } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsFillShieldFill } from "react-icons/bs"

const owners = [1, 2]

export default function ForumCard({ title, content, user_id, forum_id, urls}) {

  const [username, setUsername] = useState("")
  const [comments, setComments] = useState([])

  async function getUser() {
    const response = await fetch(`https://mental-health-server-w9lq.onrender.com/user/${user_id}`)

    const { username } = await response.json()

    if (response.ok) {
      setUsername(username)
    } else {
      console.log("Failed to fetch username")
    }
  }

  async function getComments() {
    const response = await fetch(`https://mental-health-server-w9lq.onrender.com/comments/${forum_id}`);

    const data = await response.json();

    if (response.ok) {
      setComments(data);
    } else {
      console.log("Failed to fetch username");
    }
  }

  useEffect(() => {
    getUser()
    getComments()
  }, [])

  console.log(urls)

  return (
    <Link to={`/discussions/${forum_id}`}>
      <div className={styles["post"]}>
        <div className={styles["content"]}>
          <h1>{title}</h1>
          <p className={styles["post-op"]}>{username} <span className="admin-icon">{owners.includes(user_id) ? <BsFillShieldFill /> : null}</span></p>
          <div className={styles["inner-content"]}>
            <p>{urls.comment || content ? urls.comment : "No body specified for this post"}</p>
            {urls.url ? (
              !urls.video ? (
                <img
                  className={styles.url}
                  draggable={false}
                  src={urls.url}
                  alt="Image Error"
                />
              ) : (
                <video
                  controls={true}
                  className={styles.url}
                  draggable={false}
                  src={urls.url}
                  alt="Image Error"
                />
              )
            ) : null}
          </div>
        </div>
        <div className={styles["options"]}>
          <p className={styles["options-list"]}>
            <VscComment />&nbsp;
            {comments.length} Comments
          </p>
        </div>
      </div>
    </Link>
  );
}
