import styles from "./index.module.css";

export default function Meditation({meditationType, index}) {

  return (
    <div className={`${styles["meditation"]} ${styles[`color-${index + 2}`]}`}>
      <h2>{meditationType} meditation</h2>
      <button className={styles["play-btn"]}>&#9658;</button>
    </div>
  );
}
