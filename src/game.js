import {Board} from './board.js';



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
