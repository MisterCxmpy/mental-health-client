import styles from "./index.module.css";
import { VscComment } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import { Tag } from "../../components";

export default function Discussions() {
  return (
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
          </form>
        </div>
        <div className={styles["tags"]}>
          <Tag tag={"Self Help"}/>
        </div>
        <div className={styles["posts"]}>
          <CreatePostEl
            title={"This is a test discussion"}
            summary={
              "In this section we’ll have text pertaining to the actual discussion at hand, maybe the first question posted but cut..."
            }
            comments={81}
          />
        </div>
      </div>
    </div>
  );
}

function CreatePostEl({ title, summary, comments }) {
  return (
    <div className={styles["post"]}>
      <div className={styles["content"]}>
        <h1>{title}</h1>
        <p className={styles["post-op"]}>Username</p>
        <p>{summary}</p>
      </div>
      <div className={styles["options"]}>
        <p><VscComment />{`${comments} Comments`}</p>
        <p><AiOutlineStar />Favourite</p>
      </div>
    </div>
  );
}


