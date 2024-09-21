import { Tile } from './Tile.js';

/**
 * The game board. Creates "noOfRows" rows of with "noOfRows" tiles
 * Each tile is given a number from 0-n
 * @param {*} param0 
 * @returns 
 */
export function Board({ noOfRows, boardClicked, gTiles }) {
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