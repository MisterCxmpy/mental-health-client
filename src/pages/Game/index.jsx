import { useParams } from "react-router-dom";
import { Game2048, BlotChart } from "../../components";
import styles from "./index.module.css"

const GameMapping = {1: <Game2048 />, 2: <BlotChart />}

export default function Game() {
  
  const { id } = useParams()

  return (
    <div className="layout">
      <div className={styles["container"]}>
        {GameMapping[id]}
      </div>
    </div>
  )
}
