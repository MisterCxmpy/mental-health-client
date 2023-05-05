import { VscComment } from "react-icons/vsc";
import { AiOutlineStar } from "react-icons/ai";
import styles from "./index.module.css";


export default function ForumCard({ title, content }) {
  return (
    <div className={styles["post"]}>
      <div className={styles["content"]}>
        <h1>{title}</h1>
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
  );
}
