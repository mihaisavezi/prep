/**
 * 
 * 
 * 
 * Core Requirements
Click inside a shape → Fill that specific shape

Click outside shapes → Fill the entire grid except the shapes

Implement pseudocode only (as mentioned in the interview feedback)


Grid Example:
[0,0,0,1,1,1,0,0]
[0,1,0,1,0,1,0,0]  
[0,1,0,1,1,1,0,0]
[0,1,0,0,0,0,0,0]
[0,1,1,1,1,0,0,0]
[0,0,0,0,0,0,0,0]

Where:
• 0 = empty space
• 1 = shape outline




 */


/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {

    let originalColor = image[sr][sc];

    // edge case
    if(originalColor === color) return image


    let ROWS = image.length;
    let COLS = image[0].length;

    let stack = [[sr, sc]];

    let DIRECTIONS = [[1, 0 ], [-1, 0], [0, 1], [0, -1]]

    while (stack.length > 0 ) {
        let [r, c] = stack.pop();


        if(image[r][c] === originalColor) {
            image[r][c] = color;


            DIRECTIONS.forEach(([dirR, dirC]) => {
                let newRow = r + dirR;
                let newCol = c + dirC
    
                if(newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
                    stack.push([newRow, newCol])
                }
            })
        }

    }

    return image;
    
};


function floodFillBFS(image, sr, sc, color) {
    let originalColor = image[sr][sc];

    // edge case
    if (originalColor === color) return image;

    let ROWS = image.length;
    let COLS = image[0].length;

    let queue = [[sr, sc]];

    let DIRECTIONS = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    while (queue.length > 0) {
        let [r, c] = queue.shift();

        if(image[r][c] === originalColor) {
            image[r][c] = color

            DIRECTIONS.forEach(([dirRow, dirCol]) => {
                let newRow = r + dirRow;
                let newCol = c + dirCol

                if (
                  newRow >= 0 &&
                  newRow < ROWS &&
                  newCol >= 0 &&
                  newCol < COLS
                ) {
                  queue.push([newRow, newCol]);
                }
            })
        }
    }

    return image
}


export {
    floodFill,
    floodFillBFS
}
