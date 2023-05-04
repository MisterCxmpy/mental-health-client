import styles from "./index.module.css";
import { CreateForum, Modal, Tag } from "../../components";
import { useEffect, useState } from "react";
import ForumCard from "../../components/ForumCard/index";

export default function Discussions() {
  const [open, setOpen] = useState(false);
  const [forums, setForums] = useState([]);

  useEffect(() => {
    async function fetchForums() {
      const response = await fetch('http://localhost:3000/forums');
      const data = await response.json();
      console.log(data)
      setForums(data);
    }
    fetchForums();
  }, []);

  return (
    <>
      {open ? (
        <Modal setOpen={setOpen} content={<CreateForum />} />
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
            {forums.map((forum) => (
              <ForumCard key={forum.id} title={forum.title} content={forum.content} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
