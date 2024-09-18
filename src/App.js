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

/**
 * 
 * @param {*} noOfRows 
 * @returns 
 */
function Game({ noOfRows }) {
  //keep count of whos turn it is
  const [isPlayerX, setIsPlayerX] = useState(true);
  //keeps track of the game so far
  const [gameTiles, setGameTiles] = useState(Array(noOfRows * noOfRows).fill(null));

  /**
   * Checks for winners, occupied tiles and updates game state and current player
   * @param {*} idx
   * @returns 
   */
  function handleClick(idx) {
    //ensure that the same tile can't be clicked again and that game is over if someone wins
    if (checkWinner(gameTiles) || gameTiles[idx] !== null) {
      return
    }
    //copy the current game state so far
    let newGameTiles = gameTiles.slice()
    //update the clicked tile in the new state
    newGameTiles[idx] = isPlayerX ? "X" : "O"
    //update state
    setGameTiles(newGameTiles)

    //change player
    setIsPlayerX(!isPlayerX)
  }

  /**
   * Resets the game board and player turn
   */
  function resetGame() {
    setGameTiles(Array(noOfRows * noOfRows).fill(null))
    setIsPlayerX(true)
  }

  //create status string and change it in case someone one or made a move
  let status = "Make a move player X"
  let p = isPlayerX ? "X" : "O"
  let winner = checkWinner(gameTiles)
  if (winner) {
    status = "Player " + winner + " won!"
  } else {
    status = "Make a move player " + p + "!"
  }

  return (
    <div className='game'>
      <h2>{status}</h2>
      <Board noOfRows={noOfRows} boardClicked={handleClick} gTiles={gameTiles}></Board>
      <button onClick={resetGame}>Reset</button>
    </div>
  )

  /**
   * Check if someone won given updated tiles, only works for 3x3 grids now
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
   * Generates game winning matrix, thanks ChatGPT
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
 * The game board. Creates "noOfRows" rows of with "noOfRows" tiles
 * Each tile is given a number from 0-n
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

/**
 * 
 * @param {*} param0 
 * @returns 
 */
function Tile({ marker, tileClicked }) {
  return (
    <button className='tile' onClick={tileClicked} >{marker}</button>
  )
}

export default App