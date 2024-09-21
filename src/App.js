import React from 'react';
import { useState } from 'react';
import { Board } from './Board.js';
import { generateLines } from './Helper.js';


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

}

export default App