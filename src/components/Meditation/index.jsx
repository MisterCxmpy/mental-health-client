/* eslint-disable react/prop-types */
import styles from "./index.module.css";

export default function Meditation({ type, index, select }) {

  return (
    <div className={`${styles["meditation"]} ${styles[`color-${index + 2}`]}`} role="meditation">
      <h2>{type} meditation</h2>

      <button onClick={select} className={styles["play-btn"]} role="play-btn">&#9658;</button>

    </div>
  );
}
