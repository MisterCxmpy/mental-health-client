import Meditation from "../Meditation";
import styles from "./index.module.css";

const meditationTypes = [
    "Vipassanna",
    "Yoga",
    "Gratitude",
    "Compassion",
    "Walking",
  ];

export default function MeditationList() {
  return (
    <div className={styles["meditation-list"]} role="meditation-list">
      {meditationTypes.map((type, i) => <Meditation meditationType={type} index={i} key={type} />)}
    </div>
  );
}
