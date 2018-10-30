/*
creates playerboard with rows and columns, adding (' ').
 */
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    const board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        const row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

/*
Dynamically generating bomb board.

The bomb board is essentially the same as a player board.
The only difference is that it is meant to contain only bombs.
The function should:
 - Create the game board of the specified size
 - Add bombs to random squares on the game board

For example, generateBombBoard(5, 9, 14) would result in a 5 x 9 game board (45 total squares)
with 14 bombs placed randomly on the board.
 */
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    const board = [];

    //generates and fills the row and columns with specified size.
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
        const row = [];
        for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
            row.push(null);
        }
        board.push(row);
    }

    //Adds bomb to bomb board, numberOfBombsPlaces is bomb counter
    let numberOfBombsPlaced = 0;

    /*
    Continue adding bombs to the board until our bomb counter reaches the
    specified number of bombs to the function (numberOfBombs).

    The Math.floor() function returns the largest integer less than or equal to a given number.
    The Math.random() function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1)
    with approximately uniform distribution over that range — which you can then scale to your desired range.

    Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security.
    Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.
     */
    while (numberOfBombsPlaced < numberOfBombs) {
        const randomRowIndex = Math.floor(Math.random() * numberOfRows);
        const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        //If no bombs in randomRowIndex and randomColumnIndex, place bombs there.
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
        }
    }
    return board;
};

/*
Displaying the number of bombs adjacent to the flipped tile.
 - The function will determine the size of the game board
 - The function will use the location of the flipped tile
 - Using an array index offset system (more on this later), the function will check all adjacent tiles for bombs
 - If a bomb exists at an adjacent tile, you'll record it by incrementing a bomb counter
 - The number of bombs adjacent to the flipped tile will be returned by the function
 */
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    /*
    To get the offset of bomb placed.
    Each element is at most 1 row and 1 column away from the flipped tile, +.
    For example, f is 1 row after and 1 column before the flipped tile.
    We have to add 1 to the row and subtract 1 from the column. This would be [1,- 1]
    neighborOffsets will help us check adjacent tiles for bombs later.
     */
    const neighborOffsets = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ];
    /*
    Retrieving the dimensions of the game board. Create a constant called numberOfRows.
    Set it equal to the length of the bombBoard that is passed into the function as a parameter.
    Checking the length of the bomb board would return the number of rows (i.e. the number of nested arrays).
    Gets numbers of columns. The first element is a row, and the number of entries in a row represents the total number of columns
     */
    const numberOfRows = bombBoard.length; //gets numbers of row.
    const numberOfColumns = bombBoard[0].length;

    let numberOfBombs = 0; //stores the number of bombs adjacent to flipped tile.

    /*
 - Grab the row and column indices of the tile that a user specifies (say they input 0, 2, we'll have to use that to check for bombs
   around the tile in the first row and third column)
 - Check all possible neighboring tiles around the indicated tile
 - If a neighboring tile has a bomb, increment the bomb counter
   The forEach() method executes a provided function once for each array element.
     */
    neighborOffsets.forEach(offset => {
        const neighborRowIndex = rowIndex + offset[0];
        const neighborColumnIndex = columnIndex + offset[1];

        /*
        checks for neighboring tiles if valid and not offgrid.
        checks if the tile at those indices (on the bombBoard) already contains a bomb 'B'
         */
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
            neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                numberOfBombs++;
            }
        }
    });
    return numberOfBombs;
};

/*
Goal of flipTile:
 - If the specified tile has already been flipped.
 - If the specified tile has a bomb in it.
 - Otherwise, that tile should be updated with the number of neighboring bombs.
 */
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('Already flipped that tile!');
        return;
    } else if (bombBoard[rowIndex][columnIndex] === 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

/*
print our board, regardless of size, join together each element in each row with ' | '
to create a well-formated row and then join together each row with '\n' (the new line character)
to print each row on its own line.
 */
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);
printBoard(playerBoard);
printBoard(bombBoard);
flipTile(playerBoard, bombBoard, 0, 0); // Flipping coordinates [0,0]. Flip different tiles based on bombBoard to see if neighbors work.
printBoard(playerBoard);