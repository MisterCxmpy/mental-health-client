import styles from "./index.module.css";
import { CreateForum, Modal } from "../../components";
import { useEffect, useState } from "react";
import ForumCard from "../../components/ForumCard/index";
import useSearch from "../../hooks/useSearch";
import Avatar from "boring-avatars";


export default function Discussions() {
  const [open, setOpen] = useState(false);
  const [forums, setForums] = useState([]);
  const { setQuery, result } = useSearch(forums);

  function detectURLs(message) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    return message.match(urlRegex);
  }

  function parseUrl(comment) {
    let urls = detectURLs(comment);
    if (urls?.length) {
      if (urls[0].slice(-3) == "mp4") {
        return {
          comment: comment.replace(/(https?:\/\/[^\s]+)/g, ""),
          url: urls[0],
          video: true,
        };
      }
      return {
        comment: comment.replace(/(https?:\/\/[^\s]+)/g, ""),
        url: urls[0],
      };
    } else {
      return {
        comment
      };
    }
  }
  

  useEffect(() => {
    async function fetchForums() {
      const response = await fetch('https://mental-health-server-w9lq.onrender.com/forums');
      const data = await response.json();

      if (response.ok) {
        setForums(data);
      } else {
        console.log(data)
      }

    }
    fetchForums();
  }, []);

  return (
    <>
      {open ? (
        <Modal setOpen={setOpen} content={<CreateForum setOpen={setOpen} setForums={setForums} />} />
      ) : null}
      <div className="layout">
        <div className={styles["container"]}>
          <div className={styles["search"]}>
            <div className={styles["profile-picture"]}>
            <Avatar
                size={54}
                variant="marble"
                colors={["#9A9FDD", "#DEEFFE", "#E2FFFF"]}
              />
            </div>
            <form className={styles["search-form"]}>
              <div className={styles["input"]}>
                <input
                  className={styles["search-bar"]}
                  type="text"
                  placeholder="Search Discussion"
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className={`${styles["create-btn"]} btn`}
                onClick={() => setOpen(true)}
              >
                Create
              </button>
            </form>
          </div>
          <div className={styles["posts"]}>
            {result.length > 0 ? result.map((forum) => (
              <ForumCard key={forum.forum_id} title={forum.title} content={forum.content} user_id={forum.user_id} forum_id={forum.forum_id} urls={parseUrl(forum.content)}/>
            )) : null}
          </div>
        </div>
      </div>
    </>
  );
}
