import styles from "./index.module.css"

export default function AIMentor() {
  return (
    <div className="layout">
      <div className={styles["container"]}>
        <div className={styles["messages-container"]}>
          <Message isYou={true} message={"Hello, I am not doing too good day :("}/>
          <Message isYou={false} message={"Don't worry pal, I am here to help!"}/>
        </div>
        <div className={styles["input-box"]}>
          <div className={styles["options"]}></div>
          <form className={styles["input-form"]}>
            <div className={styles["input"]}>
              <input
                className={styles["input-bar"]}
                type="text"
                placeholder="Enter your message here"
                required
              />
              <button className={`${styles["submit"]} btn`}>Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function Message({isYou, message}) {
  return (
    <div className={`${styles[isYou ? "user-message" : "ai-message"]} ${styles["message"]}`}>
      <div className={styles["profile-picture"]}></div>
      <p>{message}</p>
    </div>
  )
}