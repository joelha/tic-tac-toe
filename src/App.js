import React from 'react';
import { useState } from 'react';

export function App(props) {
  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <Game noOfRows="3"></Game>
    </div>
  );
}

function Game({ noOfRows }) {
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [gameTiles, setGameTiles] = useState(Array(noOfRows * noOfRows).fill(null));

  /**
   * Checks for winners, occupied tiles and updates game state and current player
   * @param {*} idx
   * @returns 
   */
  function handleClick(idx) {
    if (checkWinner(gameTiles) || gameTiles[idx] !== null) {
      //ensure that the same tile can't be clicked again and that game is over if someone wins
      return
    }
    let newGameTiles = gameTiles.slice()
    //update marker in clicked tile
    newGameTiles[idx] = isPlayerX ? "X" : "O"
    //update all tiles
    setGameTiles(newGameTiles)

    //change player
    setIsPlayerX(!isPlayerX)
  }

  /**
   * Resets the game board and player
   */
  function resetGame() {
    setGameTiles(Array(noOfRows * noOfRows).fill(null))
    setIsPlayerX(true)
  }

  let msg = "Make a move player X"
  let p = isPlayerX ? "X" : "O"
  let winner = checkWinner(gameTiles)
  if (winner) {
    msg = "Player " + winner + " won!"
  } else {
    msg = "Make a move player " + p + "!"
  }
  let status = msg

  return (
    <div className='game'>
      <h2>{status}</h2>
      <Board noOfRows={noOfRows} boardClicked={handleClick} gTiles={gameTiles}></Board>
      <button onClick={resetGame}>Reset</button>
    </div>
  )

  /**
   * Check if someone won given updated tiles
   * @param {*} newTiles 
   * @returns 
   */
  function checkWinner(newTiles) {
    const lines = generateLines(noOfRows, noOfRows)
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (newTiles[a] && newTiles[a] === newTiles[b] && newTiles[a] === newTiles[c]) {
        return newTiles[a];
      }
    }
    return false;
  }

  /**
   * Generates game winning matrix
   * @param {*} rows 
   * @param {*} cols 
   * @returns 
   */
  function generateLines(rows, cols) {
    const lines = [];

    // Horizontal lines
    for (let i = 0; i < rows; i++) {
      const line = [];
      for (let j = 0; j < cols; j++) {
        line.push(i * cols + j);
      }
      lines.push(line);
    }

    // Vertical lines
    for (let j = 0; j < cols; j++) {
      const line = [];
      for (let i = 0; i < rows; i++) {
        line.push(i * cols + j);
      }
      lines.push(line);
    }

    // Diagonal (top-left to bottom-right)
    if (rows === cols) {  // Diagonals only exist in square grids
      const diagonal1 = [];
      const diagonal2 = [];
      for (let i = 0; i < rows; i++) {
        diagonal1.push(i * cols + i);        // Top-left to bottom-right
        diagonal2.push(i * cols + (cols - 1 - i));  // Top-right to bottom-left
      }
      lines.push(diagonal1);
      lines.push(diagonal2);
    }

    return lines;
  }

}

/**
 * The game board, creates rows and columns based on noOfRows param
 * @param {*} param0 
 * @returns 
 */
function Board({ noOfRows, boardClicked, gTiles }) {
  const tiles = Array.from({ length: noOfRows }).map((_, rowIndex) => (
    <div className='row' key={rowIndex}>
      {
        Array.from({ length: noOfRows }).map((_, tileIndex) => {
          const uniqueIndex = rowIndex * noOfRows + tileIndex
          return <Tile key={uniqueIndex} marker={gTiles[uniqueIndex]} tileClicked={() => boardClicked(uniqueIndex)}></Tile>
        })
      }
    </div>
  ))

  return (
    <div className='board'>
      {tiles}
    </div>
  )
}

function Tile({ marker, tileClicked }) {
  return (
    <button className='tile' onClick={tileClicked} >{marker}</button>
  )
}

export default App