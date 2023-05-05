import styles from "./index.module.css";
import { CreateForum, Modal, Tag } from "../../components";
import { useEffect, useState } from "react";
import ForumCard from "../../components/ForumCard/index";
import useSearch from "../../hooks/useSearch";

export default function Discussions() {
  const [open, setOpen] = useState(false);
  const [forums, setForums] = useState([]);
  const { query, setQuery, result, searching } = useSearch(forums);

  useEffect(() => {
    async function fetchForums() {
      const response = await fetch('http://localhost:3000/forums');
      const data = await response.json();
      setForums(data);
    }
    fetchForums();
  }, []);

  useEffect(() => {
  }, [query])

  return (
    <>
      {open ? (
        <Modal setOpen={setOpen} content={<CreateForum setOpen={setOpen} setForums={setForums} />} />
      ) : null}
      <div className="layout">
        <div className={styles["container"]}>
          <div className={styles["search"]}>
            <div className={styles["profile-picture"]}></div>
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
          <div className={styles["tags"]}>
            <Tag tag={"Self Help"} />
          </div>
          <div className={styles["posts"]}>
            {result.length > 0 ? result.map((forum) => (
              <ForumCard key={forum.forum_id} title={forum.title} content={forum.content} user_id={forum.user_id} forum_id={forum.forum_id} />
            )) : null}
          </div>
        </div>
      </div>
    </>
  );
}
