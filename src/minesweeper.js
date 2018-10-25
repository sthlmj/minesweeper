const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = []; //overall gameboard
    for (let i = 0; i < numberOfRows.length; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns[i].length; j++) {
            row.push(' ');
        };
        board.push(row);
    };
    return board;
};

//console.log(generatePlayerBoard(2, 3));

let generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = []; //overall gameboard
    for (let i = 0; i < numberOfRows.length; i++) {
        let row = [];
        for (let j = 0; j < numberOfColumns[i].length; j++) {
            row.push(null);
        };
        board.push(row);
    };

    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs ) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColIndex = Math.floor(Math.random() * numberOfRows);
        board[randomRowIndex][randomColIndex] = 'B';
        numberOfBombsPlaced++;
    }
    return board;
}

const printBoard = (board) => {
    //TODO
}