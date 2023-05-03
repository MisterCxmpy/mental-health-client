import Meditation from "../Meditation";
import styles from "./index.module.css";

export default function MeditationList() {
  return (
    <div className={styles["meditation-list"]}>
      <Meditation />
    </div>
  );
}
