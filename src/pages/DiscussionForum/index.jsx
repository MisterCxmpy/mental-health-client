import { VscComment } from "react-icons/vsc"
import styles from "./index.module.css"
import { AiOutlineStar } from "react-icons/ai"

export default function DiscussionForum() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["post"]}>
          <div className={styles["content"]}>
            <h1>This is a test discussion</h1>
            <p className={styles["post-op"]}>Username</p>
            <p>In this section we'll have text pertaining to the actual discussion at hand, maybe the first question posted but cut...</p>
          </div>
          <div className={styles["options"]}>
            <p><VscComment />81 Comments</p>
            <p><AiOutlineStar />Favourite</p>
          </div>
        </div>
        <div className={styles["create-comment"]}>
          <form className={styles["create-form"]}>
            <textarea maxLength={500} placeholder="What are your thoughts?"></textarea>
            <button className={`${styles["submit-btn"]} btn`}>Comment</button>
          </form>
        </div>
        <div className={styles["comment-section"]}>
          <CreateComment username={"Username"} comment={"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae porro ea molestiae architecto omnis autem accusantium, similique odit, voluptatem, dicta dolor. Incidunt sed provident non, officiis ut necessitatibus totam aspernatur. Exercitationem rerum nulla error, cum soluta ipsa neque facilis aperiam esse! Enim, modi dolorem. Sed earum quae, iusto inventore laborum adipisci ipsam reiciendis, sunt perspiciatis perferendis modi? Culpa, quaerat soluta?"} />
        </div>
      </div>
    </div>
  )
}


function CreateComment({username, comment}) {
  return (
    <div className={styles["comment"]}>
      <div className={styles["profile-picture"]}></div>
      <div className={styles["content"]}>
        <p className={styles["username"]}>{username}</p>
        <p>{comment}</p>
      </div>
    </div>
  )
}
