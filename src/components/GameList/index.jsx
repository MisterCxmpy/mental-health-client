import { Link } from "react-router-dom";
import styles from "./index.module.css";

const gameTypes = [{id: 1, name: "2048"},  {id:2, name:"Blot Chart"}];
const calcColourIndex = index => ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

export default function GameList() {

  return (
    <div className={styles["game-list"]} role="game-list">
      {gameTypes.map((type, i) => <Game gameType={type.name} colorIndex={calcColourIndex(i)} id={type.id} key={type + i} /> )}
    </div>
  );
}

function Game({ gameType, colorIndex, id}) {

  return (
    <div className={`${styles["game"]} ${styles[`color-${colorIndex}`]}`}>
      <h2>{gameType}</h2>
      <Link to={`/activities/${id}`} ><button className={styles["play-btn"]}>&#9658;</button></Link>
    </div>
  );
}

