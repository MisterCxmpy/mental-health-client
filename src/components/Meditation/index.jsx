import styles from "./index.module.css";

export default function Meditation({meditationType}) {
  const meditationTypes = [
    "Vipassanna",
    "Yoga",
    "Gratitude",
    "Compassion",
    "Walking",
  ];

  let count = 2;

  return (
    meditationTypes.map((type, i) => {
      return(
        <div key={i} className={`${styles["meditation"]} ${styles[`color-${i + 2}`]}`}>
          <h2>{type} meditation</h2>
          <button className={styles["play-btn"]}>&#9658;</button>
        </div>
      )
    })
  );
}
