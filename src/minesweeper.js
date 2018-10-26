/*
Steps: 1-11
creates playerboard with rows and columns, adding (' ').
 */
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = []; //overall gameboard
    for (let i = 0; i < numberOfRows; i++) {
        let row = []; //represent single row to be added to the gameboard
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(' ');
        };
        board.push(row);
    };
    return board;
};
/* TEST of Steps: 1-11
console.log(generatePlayerBoard(6, 6));
*/

/*
Steps: 12-26
Dynamically generating bomb board.

The bomb board is essentially the same as a player board. The only difference is that it is meant to contain only bombs.
The function should:
 - Create the game board of the specified size
 - Add bombs to random squares on the game board

For example, generateBombBoard(5, 9, 14) would result in a 5 x 9 game board (45 total squares)
with 14 bombs placed randomly on the board.
 */
let generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null);
        };
        board.push(row);
    };

    //Adds bomb to bomb board
    let numberOfBombsPlaced = 0; //bomb counter
    /*
    Continue adding bombs to the board until our bomb counter reaches the
    specified number of bombs to the function (numberOfBombs).

    The Math.floor() function returns the largest integer less than or equal to a given number.
    The Math.random() function returns a floating-point, pseudo-random number in the range 0–1 (inclusive of 0, but not 1)
    with approximately uniform distribution over that range — which you can then scale to your desired range.

    Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security.
    Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.

    An important note: The code in your while loop has the potential to place bombs on top of already existing bombs.
    This will be fixed when you learn about control flow. Add this note as a comment inside of the while loop.
     */
    while (numberOfBombsPlaced < numberOfBombs ) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
    }
    return board;
}

/*
Steps 27-40
To print our board, regardless of size, we will join together each element in each row with ' | '
to create a well-formated row and then join together each row with '\n' (the new line character)
to print each row on its own line.
 */
const printBoard = board => {
    console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard)

/*
A few of things to note:
 - Remember that the bomb board is randomly generated, so your output may not be an exact replica of the output depicted
in the example above. Run your code a couple of more times and notice how the bombs rearrange themselves randomly.

- Your bomb board may sometimes have fewer bombs on it than what was specified in the function call.
This is due to the missing control flow code mentioned in Step 26.

- Your bomb board will not appear as neatly formatted as the player board.
This is because you are adding null to its board. This is fine, as this is a board that is intended to only hold
information, and not to be printed. We are printing here to demonstrate the utility of the generateBombBoard() function.
 */