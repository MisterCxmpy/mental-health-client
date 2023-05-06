import styles from "./index.module.css"

export default function Tag({ tag }) {
  return (
    <div className={styles["tag"]} role="tag">
      <p>{tag}</p>
    </div>
  );
}