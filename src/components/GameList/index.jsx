import styles from "./index.module.css";

const gameTypes = ["Game", "Game", "Game", "Game", "Game", "Game", "Game", "Game", "Game", "Game"];
const calcColourIndex = index => ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

export default function GameList() {

  return (
    <div className={styles["game-list"]} role="game-list">
      {gameTypes.map((type, i) => <Game gameType={type} colorIndex={calcColourIndex(i)} key={type + i} /> )}
    </div>
  );
}

function Game({ gameType, colorIndex }) {

  return (
    <div className={`${styles["game"]} ${styles[`color-${colorIndex}`]}`}>
      <h2>{gameType} meditation</h2>
      <button className={styles["play-btn"]}>&#9658;</button>
    </div>
  );
}

