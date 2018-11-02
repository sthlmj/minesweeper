/*
TODO: Add a Game and Board class
TODO: Create an instance of a game and play a move
 */

class Game{
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);
        if (playerBoard == 'B' && rowIndex && columnIndex) {
            console.log('Game Overrrr!')
            this._board.print()
        } else if (this._board.hasSafeTiles()) {
            console.log('You won!')
        } else {
            console.log('Current Board: ')
            print()
        }
    }
};



class Board{
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfRows * numberOfColumns;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard() {
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('Already flipped that tile!');
            return;
        } else if (bombBoard[rowIndex][columnIndex] === 'B') {
            playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
        }

        this._rowIndex = rowIndex;
        this._columnIndex = columnIndex;
        this.getNumberOfNeighborBombs;
        this._numberOfTiles--;
    };

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
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
        const numberOfRows = bombBoard.length;
        const numberOfColumns = bombBoard[0].length;

        let numberOfBombs = 0;

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
                neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
        this._rowIndex;
        this._columnIndex;
    };

    hasSafeTiles() {
        return numberOfTiles != numberOfBombs;
        this._numberOfTiles;
        this._numberOfBombs;
    };

    print() {
        this._playerBoard;
        console.log(board.map(row => row.join(' | ')).join('\n'));
    };

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
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

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        const board = [];

        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            const row = [];
            for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
                row.push(null);
            }
            board.push(row);
        }

        let numberOfBombsPlaced = 0;

        while (numberOfBombsPlaced < numberOfBombs) {
            const randomRowIndex = Math.floor(Math.random() * numberOfRows);
            const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
            if (board[randomRowIndex][randomColumnIndex] !== 'B') {
                board[randomRowIndex][randomColumnIndex] = 'B';
                numberOfBombsPlaced++;
            }
        }

        return board;
    };
}

// let playerBoard = generatePlayerBoard(3, 3);
// let bombBoard = generateBombBoard(3, 3, 3);
// printBoard(playerBoard);
// printBoard(bombBoard);
// flipTile(playerBoard, bombBoard, 0, 0); // Flip different tiles based on bombBoard to see if neighbors work.
// printBoard(playerBoard);
const g = new Game(3, 3, 3);
g.playMove(0,0);