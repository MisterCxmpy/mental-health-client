import { VscComment } from "react-icons/vsc";
import styles from "./index.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DiscussionForum() {
  const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");

  const { id } = useParams();

  async function getForum() {
    const response = await fetch(`http://localhost:3000/forums/forum/${id}`);

    const data = await response.json();

    if (response.ok) {
      setForum(data);
    } else {
      console.log("Failed to fetch forum data");
    }

    getUsername(data);
    getComments();
  }

  async function getUsername({ user_id }) {
    const response = await fetch(`http://localhost:3000/user/${user_id}`);

    const { username } = await response.json();

    if (response.ok) {
      setUsername(username);
    } else {
      console.log("Failed to fetch username");
    }
  }

  async function getComments() {
    const response = await fetch(`http://localhost:3000/comments/${id}`);

    const data = await response.json();

    if (response.ok) {
      setComments(data);
    } else {
      console.log("Failed to fetch username");
    }
  }

  useEffect(() => {
    getForum();
  }, []);

  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["post"]}>
          <div className={styles["content"]}>
            <h1>{forum.title}</h1>
            <p className={styles["post-op"]}>{username}</p>
            <p>{forum.content}</p>
          </div>
          <div className={styles["options"]}>
            <p>
              <VscComment />
              81 Comments
            </p>
            <p>
              <AiOutlineStar />
              Favourite
            </p>
          </div>
        </div>
        <div className={styles["create-comment"]}>
          <form className={styles["create-form"]}>
            <textarea
              maxLength={500}
              placeholder="What are your thoughts?"
            ></textarea>
            <button className={`${styles["submit-btn"]} btn`}>Comment</button>
          </form>
        </div>
        <div className={styles["comment-section"]}>
          {comments.length > 0
            ? comments.map((c, i) => (
                <CreateComment
                  username={c.username}
                  comment={c.comment}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

function CreateComment({ username, comment }) {
  return (
    <div className={styles["comment"]}>
      <div className={styles["profile-picture"]}></div>
      <div className={styles["content"]}>
        <p className={styles["username"]}>{username}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
}
