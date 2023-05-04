import styles from "./index.module.css"

export default function Tag({ tag }) {
  return (
    <div className={styles["tag"]}>
      <p>{tag}</p>
    </div>
  );
}