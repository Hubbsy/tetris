document.addEventListener('DOMContentLoaded', () => {


//Function that creates 200 divs for tetris board
    const gridDivs = (function() {
        for (var i = 0; i < 200; i++) {
            let block = document.createElement('div');
            board.appendChild(block); 
        };
    })();

    const takenDivs = (function() {
        for (var i = 0; i < 10; i++) {
            let stopper = document.createElement('div');
            stopper.classList.add('taken');
            board.appendChild(stopper);
        }
    })();

//Function to create mini grid for next up tetromino
    const miniGrid = (function() {
        for (var i = 0; i < 16; i++) {
            let square = document.createElement('div');
            mini.appendChild(square);
        }
    })();

//Game Elements

    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
    ];


//The Tetrominoes and their shapes
    const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
    ];

    const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
    ];

    const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
    ];

    const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
    ];

    const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;


//randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length);
    let current = theTetrominoes[random][currentRotation];

//draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
            squares[currentPosition + index].style.backgroundColor = colors[random]
        })
    };

//undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundColor = ''

        })
    };
    
    // timerId = setInterval(moveDown, 1000);

//Functions to control the tetrominoes

    const control = (e) => {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode ===40) {
            moveDown()
        }
    };

    document.addEventListener('keyup', control);





//move down function
    function moveDown() {
        undraw()
        currentPosition += width
        draw()
        freeze()
    };
    
// Move the tetromino left 
    function moveLeft() {
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isAtLeftEdge) currentPosition -= 1 
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1; 
        }
        draw()
    };

//Move the tetromino Right
    function moveRight() {
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
        if (!isAtRightEdge) currentPosition += 1
        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1; 
        }
        draw();
    };

//Rotate through the tetromino shapes
    function rotate() {
        undraw()
        currentRotation++
        if (currentRotation === current.length) {
            currentRotation = 0; 
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    };

//Function to stop tetrominoes from falling 
    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start a new tetromino falling
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
        }
    };


//Mini grid for next up tetromino
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4; 
    let displayIndex = 0; 
    

    const upNextTetrominoes = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],//lTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],//zTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        [0, 1, displayWidth, displayWidth + 1],
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ];


//Function to display up next tetromino
    function displayShape() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        })
        upNextTetrominoes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })
    };


//add functionality to start stop button
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null; 
        } else {
            draw();
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })


//Function to add score
    function addScore() {
        for (var i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundColor = '';
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => 
                    grid.appendChild(cell)
                )
            }    
        }
    };




});