/*
Add a Game and Board class
Create an instance of a game and play a move
 */

//Minesweeper main class
class Game{
    constructor(numberOfRows, numberOfColumns, numberOfBombs) {
        //creates an instance of board
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    // 28.
    playMove(rowIndex, columnIndex) {
        this._board.flipTile(rowIndex, columnIndex);

        if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
            console.log('BOYAKA! YOU JUST PLAYED YOURSELF! GAME OVER!');
            this._board.print();
        } else if (!this._board.hasSafeTile()) {
            console.log('WELL PLAYED! YOU WON!');
        } else {
            console.log('Current Board:')
            this._board.print();
        }
    }
}

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
        if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
            console.log('Already flipped that tile!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
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
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;

        let numberOfBombs = 0;

        neighborOffsets.forEach(offset => {
            const neighborRowIndex = rowIndex + offset[0];
            const neighborColumnIndex = columnIndex + offset[1];
            if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows &&
                neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                    numberOfBombs++;
                }
            }
        });
        return numberOfBombs;
    };

    hasSafeTile() {
        return this._numberOfTiles !== this._numberOfBombs;
    }

    print()
    {
        console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
    };

    //call it directly from the class, but not from an instance of the class
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

    //call it directly from the class, but not from an instance of the class
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

const g = new Game(10,10,9);
g.playMove(5,5)