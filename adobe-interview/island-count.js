function islandCountImplementation() {

    return {
        dfs: (grid) => {


            function dfsHelper(grid, i, j) {

                if(i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 0) return;
                grid[i][j] = 0;


                dfsHelper(grid, i + 1, j)
                dfsHelper(grid, i - 1, j)
                dfsHelper(grid, i, j + 1)
                dfsHelper(grid, i, j - 1)
            }
            let count = 0;

            for(let i = 0; i < grid.length; i++) {
                for(let j = 0; j < grid[0].length; j++) {
                    if(grid[i][j] == 1) {
                        dfsHelper(grid, i, j)
                        count++
                    }
                }
            }

            return count;
        },
        dfsStack: (grid) => {
            let ROWS = grid.length;
            let COLS = grid[0].length;

            let stack = [];
            let count = 0;

            for(let i = 0; i < ROWS; i++) {
                for(let j = 0; j < COLS; j++) {
                    if(grid[i][j] == 1) {
                        stack.push([i, j])

                        while(stack.length > 0) {
                            let [row, col] = stack.pop();

                            if (
                              row < 0 ||
                              row >= ROWS ||
                              col < 0 ||
                              col >= COLS ||
                              grid[row][col] == 0
                            ) {
                                continue;
                            } else {
                                grid[row][col] = 0;
                                stack.push([row+1, col],[row-1, col], [row, col+1], [row, col-1])
                            }
                        }

                        count++
                    }
                }
            }

            return count;
        },
        bfs: (grid) => {
            let ROWS = grid.length;
            let COLS = grid[0].length;

            let count = 0;
            let queue = [];

            for(let i = 0; i < ROWS; i++) {
                for(let j = 0; j < COLS; j++) {
                    if(grid[i][j] == '1') {
                        queue.push([i, j]);

                        while(queue.length > 0) {
                            let [row, col] = queue.shift();

                            if(row < 0 || row >= ROWS || col < 0 || col >= COLS || grid[row][col] === '0') {
                                continue;
                            } else {
                                grid[row][col] = '0';
                                queue.push([row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1])

                            }
                        }

                        count++
                    }
                }
            }

            return count;
        },

    }
}
