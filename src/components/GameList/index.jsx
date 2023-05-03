import styles from "./index.module.css";

export default function GameList() {
  const gameTypes = [
    "Game",
    "Game",
    "Game",
    "Game",
    "Game",
    "Game",
    "Game",
    "Game",
    "Game",
    "Game",
  ];

  return (
    <div className={styles["game-list"]}>
      {gameTypes.map((type, i) => {
        return <Game gameType={type} index={i} />;
      })}
    </div>
  );
}

function Game({gameType, index}) {
  const colorIndex = ((index % 5) + Math.floor(index / 6) * 6 + 2) % 6 || 2;

  return (
    <div className={`${styles["game"]} ${styles[`color-${colorIndex}`]}`}>
      <h2>{gameType} meditation</h2>
      <button className={styles["play-btn"]}>&#9658;</button>
    </div>
  );
}

