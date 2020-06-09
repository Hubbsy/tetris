document.addEventListener('DOMContentLoaded', () => {


//for loop that creates 200 divs for tetris board

    for (var i = 0; i < 200; i++) {
        let block = document.createElement('div');
        board.appendChild(block); 
    };

//Tetris Grid

    const grid = document.querySelector('.grid'); 
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;

//Tetrominos

    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2], 
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]


    let currentPosition = 3;
    let currentRotation = 0; 

//Randomly select a tetromino and starting position
    let random = Math.floor(Math.random() * theTetrominos.length)
    let current = theTetrominos[random][currentRotation];

//draw the tetromino
    const draw = () => {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetrominos')
        })
    }
draw()
//undraw the teromino
    const undraw = () => {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetrominos')
        })
    }

   

});