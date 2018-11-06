// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from 'board.js';

class Game {
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
