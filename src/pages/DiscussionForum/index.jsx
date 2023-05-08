/* eslint-disable react/prop-types */
import { VscComment } from "react-icons/vsc";
import styles from "./index.module.css";
import { AiOutlineStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { BsFillShieldFill } from "react-icons/bs";
import Avatar from "boring-avatars";

const owners = [1, 2];

function detectURLs(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.match(urlRegex);
}

function parseUrl(data) {
  let urls = detectURLs(data.comment);
  if (urls?.length) {
    if (urls[0].slice(-3) == "mp4") {
      return {
        ...data,
        comment: data.comment.replace(/(https?:\/\/[^\s]+)/g, ""),
        url: urls[0],
        video: true,
      };
    }
    return {
      ...data,
      comment: data.comment.replace(/(https?:\/\/[^\s]+)/g, ""),
      url: urls[0],
    };
  } else {
    return data;
  }
}

export default function DiscussionForum() {
  const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const { id } = useParams();

  async function getForum() {
    const response = await fetch(
      `http://localhost:3000/forums/forum/${id}`
    );

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
    const response = await fetch(
      `http://localhost:3000/user/${user_id}`
    );

    const { username } = await response.json();

    if (response.ok) {
      setUsername(username);
    } else {
      console.log("Failed to fetch username");
    }
  }

  async function getComments() {
    const response = await fetch(
      `http://localhost:3000/comments/${id}`
    );

    const data = await response.json();

    if (response.ok) {
      let parsed = data.map((c) => parseUrl(c));
      setComments(parsed);
    } else {
      console.log("Failed to fetch username");
    }
  }

  async function createComment(e) {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: comment,
        user_id: user.user_id,
        forum_id: id,
      }),
    };

    const response = await fetch(
      `http://localhost:3000/comments/${id}`,
      options
    );

    const data = await response.json();

    if (response.ok) {
      const parsed = parseUrl(data.comment);
      setComments((prev) => [...prev, parsed]);
    } else {
      console.log("Failed to create comment!");
    }

    setComment("");
    e.target.reset();
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
            <p className={styles["post-op"]}>
              {username}{" "}
              <span className="admin-icon">
                {owners.includes(forum.user_id) ? <BsFillShieldFill /> : null}
              </span>
            </p>
            <p>{forum.content}</p>
          </div>
          <div className={styles["options"]}>
            <p className={styles["options-list"]}>
              <VscComment />
              &nbsp;
              {comments.length} Comments
            </p>
          </div>
        </div>
        <div className={styles["create-comment"]}>
          <form onSubmit={createComment} className={styles["create-form"]}>
            <textarea
              maxLength={500}
              value={comment}
              placeholder="What are your thoughts?"
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
            <button type="submit" className={`${styles["submit-btn"]} btn`}>
              Comment
            </button>
          </form>
        </div>
        {comments.length > 0 ? (
          <div className={styles["comment-section"]}>
            {comments.map((c, i) => (
              <CreateComment
                key={i}
                forum_id={forum.user_id}
                user_id={c.user_id}
                username={c.username}
                comment={c.comment}
                url={c.url || null}
                video={c.video}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CreateComment({ forum_id, user_id, username, comment, url, video }) {
  const messageRef = useRef();
  const [isCollapse, setIsCollapse] = useState(false);

  function collapseMessage(state) {
    messageRef.current.style.display = state ? "none" : "block";
    setIsCollapse(!isCollapse);
  }

  return (
    <div className={styles["comment"]}>
      <div className={styles["profile"]}>
        <div className={styles["profile-picture"]}>
          <button
            onClick={() => collapseMessage(!isCollapse)}
            className={styles["toggle-collapse"]}
          >
            <Avatar
              size={54}
              variant="marble"
              colors={["#9A9FDD", "#DEEFFE", "#E2FFFF"]}
            />
          </button>
        </div>
        <div
          className={`${styles["divider"]} ${styles["divider-not-last"]}`}
        ></div>
      </div>
      <div className={styles["content"]}>
        <p
          className={`${styles.username} ${
            forum_id === user_id ? styles.op : ""
          }`}
        >
          {username}{" "}
          <span className="admin-icon">
            {owners.includes(user_id) ? <BsFillShieldFill /> : null}
          </span>{" "}
          {isCollapse && (
            <span className={styles["collapse-message"]}>(collapsed)</span>
          )}
        </p>
        <div ref={messageRef} className={styles.message}>
          <p>{comment}</p>
          {url ? (
            !video ? (
              <img
                className={styles.url}
                draggable={false}
                src={url}
                alt="Image Error"
              />
            ) : (
              <video
                controls={true}
                className={styles.url}
                draggable={false}
                src={url}
                alt="Image Error"
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
