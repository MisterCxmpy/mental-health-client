import { useState, useEffect } from 'react';
import styles from "./index.module.css"
import { useAuth } from '../../contexts/authContext';

let score = 0

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getInitialGrid() {
  const grid = [];
  for (let i = 0; i < 4; i++) {
    grid.push(Array(4).fill(null));
  }
  addRandomNumber(grid);
  addRandomNumber(grid);
  return grid;
}

function addRandomNumber(grid) {
  const emptyCells = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === null) {
        emptyCells.push([i, j]);
      }
    }
  }
  if (emptyCells.length === 0) {
    return false;
  }
  const [i, j] = emptyCells[getRandomNumber(0, emptyCells.length - 1)];
  grid[i][j] = getRandomNumber(1, 2) * 2;
  return true;
}

function cloneGrid(grid) {
  const newGrid = [];
  for (let i = 0; i < grid.length; i++) {
    newGrid.push([...grid[i]]);
  }
  return newGrid;
}

function moveLeft(grid) {
  const newGrid = cloneGrid(grid);
  let hasChanged = false;
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 1; j < newGrid[i].length; j++) {
      if (newGrid[i][j] !== null) {
        let k = j;
        while (k > 0 && newGrid[i][k - 1] === null) {
          newGrid[i][k - 1] = newGrid[i][k];
          newGrid[i][k] = null;
          k--;
          hasChanged = true;
        }
        if (k > 0 && newGrid[i][k - 1] === newGrid[i][k]) {
          score += (newGrid[i][k - 1] *= 2) / 5
          newGrid[i][k] = null;
          hasChanged = true;
        }
      }
    }
  }
  return [newGrid, hasChanged];
}

function moveRight(grid) {
  const newGrid = cloneGrid(grid);
  let hasChanged = false;
  for (let i = 0; i < newGrid.length; i++) {
    for (let j = newGrid[i].length - 2; j >= 0; j--) {
      if (newGrid[i][j] !== null) {
        let k = j;
        while (k < newGrid[i].length - 1 && newGrid[i][k + 1] === null) {
          newGrid[i][k + 1] = newGrid[i][k];
          newGrid[i][k] = null;
          k++;
          hasChanged = true;
        }
        if (k < newGrid[i].length - 1 && newGrid[i][k + 1] === newGrid[i][k]) {
          score += (newGrid[i][k + 1] *= 2) / 5
          newGrid[i][k] = null;
          hasChanged = true;
        }
      }
    }
  }
  return [newGrid, hasChanged];
}

function moveUp(grid) {
  const newGrid = cloneGrid(grid);
  let hasChanged = false;
  for (let j = 0; j < newGrid.length; j++) {
    for (let i = 1; i < newGrid.length; i++) {
      if (newGrid[i][j] !== null) {
        let k = i;
        while (k > 0 && newGrid[k - 1][j] === null) {
          newGrid[k - 1][j] = newGrid[k][j];
          newGrid[k][j] = null;
          k--;
          hasChanged = true;
        }
        if (k > 0 && newGrid[k - 1][j] === newGrid[k][j]) {
          score += (newGrid[k - 1][j] *= 2) / 5
          newGrid[k][j] = null;
          hasChanged = true;
        }
      }
    }
  }
  return [newGrid, hasChanged];
}

function moveDown(grid) {
  const newGrid = cloneGrid(grid);
  let hasChanged = false;
  for (let j = 0; j < newGrid.length; j++) {
    for (let i = newGrid.length - 2; i >= 0; i--) {
      if (newGrid[i][j] !== null) {
        let k = i;
        while (k < newGrid.length - 1 && newGrid[k + 1][j] === null) {
          newGrid[k + 1][j] = newGrid[k][j];
          newGrid[k][j] = null;
          k++;
          hasChanged = true;
        }
        if (k < newGrid.length - 1 && newGrid[k + 1][j] === newGrid[k][j]) {
          score += (newGrid[k + 1][j] *= 2) / 5
          newGrid[k][j] = null;
          hasChanged = true;
        }
      }
    }
  }
  return [newGrid, hasChanged];
}

export default function GameOne() {
  const [grid, setGrid] = useState(getInitialGrid());
  const [scoreInt, setScoreInt] = useState(score);
  const { updatePoints } = useAuth();

  useEffect(() => {
    setScoreInt(score)
  }, [score])


  const handleStashPoints = async () => { // add fetch request here
    await updatePoints(Math.floor(scoreInt))
    setGrid(getInitialGrid())
    setScoreInt(0)
    score = 0;
  }

  function handleKeyDown(event) {
    let hasChanged = false;
    let newGrid = null;
    switch (event.keyCode) {
      case 37:
        [newGrid, hasChanged] = moveLeft(grid);
        break;
      case 38:
        [newGrid, hasChanged] = moveUp(grid);
        break;
      case 39:
        [newGrid, hasChanged] = moveRight(grid);
        break;
      case 40:
        [newGrid, hasChanged] = moveDown(grid);
        break;
      default:
        return;
    }
    if (hasChanged) {
      addRandomNumber(newGrid);
      setGrid(newGrid);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [grid]);

  return (
    <div className={styles["container"]}>
      <h1>{Math.floor(scoreInt)}</h1>
      <div className={styles["game-container"]}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className={styles["row-container"]}>
            {row.map((cell, colIndex) => (
              <div key={colIndex} className={`${styles["cell"]} ${styles[cell !== null ? `cell-${cell}` : '']}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="btn" onClick={() => handleStashPoints()}>Stash Points</button>
    </div>
  );
}