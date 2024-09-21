
/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function Tile({ marker, tileClicked }) {
    return (
        <button className='tile' onClick={tileClicked} >{marker}</button>
    )
}