/**
  * Generates game winning matrix, thanks ChatGPT
  * @param {*} rows 
  * @param {*} cols 
  * @returns 
  */
export function generateLines(rows, cols) {
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