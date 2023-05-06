import styles from "./index.module.css"

export default function Tag({ tag, activeCategory, select }) {
  return (
    <div onClick={select} className={activeCategory == tag ? `${styles["tag"]} ${styles["active"]}` : `${styles["tag"]}`} role="tag">
      <p>{tag}</p>
    </div>
  );
}