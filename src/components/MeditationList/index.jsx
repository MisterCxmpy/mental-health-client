/* eslint-disable react/prop-types */
import Meditation from "../Meditation";
import styles from "./index.module.css";

export default function MeditationList({ items = [], setMeditation }) {
  return (
    <div className={styles["meditation-list"]} role="meditation-list">
      {items.map((m, i) => <Meditation  {...m} index={i} key={m.type} select={() => setMeditation(m)} />)}
    </div>
  );
}
