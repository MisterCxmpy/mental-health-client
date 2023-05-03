import Meditation from "../Meditation";
import styles from "./index.module.css";

export default function MeditationList() {
  const meditationTypes = [
    "Vipassanna",
    "Yoga",
    "Gratitude",
    "Compassion",
    "Walking",
  ];

  return (
    <div className={styles["meditation-list"]}>
      {meditationTypes.map((type, i) => {
        return <Meditation meditationType={type} index={i} />;
      })}
    </div>
  );
}
