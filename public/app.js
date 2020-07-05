document.addEventListener('DOMContentLoaded', () => {


//Function that creates 200 divs for tetris board
    const gridDivs = (function() {
        for (var i = 0; i < 200; i++) {
            let block = document.createElement('div');
            board.appendChild(block); 
        };
    })();

//Function that creates ten divs at bottom of grid to stop tetrominos
    const takenDivs = (function() {
        for (var i = 0; i < 10; i++) {
            let stopper = document.createElement('div');
            stopper.setAttribute("class", "base-block");
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
    const startBtn = document.querySelector('.start-button');
    const currentLevel = document.querySelector('#level');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;
    let level = 1;
    const audio = new Audio("./assets/MACINTOSH PLUS - リサフランク420 _ 現代のコンピュー.mp3");
    const colors = [
        'url(./assets/green_block.png)',
        'url(./assets/pink_block.png)',
        'url(./assets/purple_block.png)',
        'url(./assets/peach_block.png)',
        'url(./assets/yellow_block.png)'
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
            squares[currentPosition + index].style.backgroundImage = colors[random]
        })
    };

//undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
            squares[currentPosition + index].style.backgroundImage = 'none'

        })
    };
    


//Functions to control the tetrominoes

    const control = (e) => {
        if (e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 38) {
            rotate()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
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
        checkRotatedPosition()
        draw()
    };

//Functions to correct rotation at edge

    function isAtRight() {
        return current.some(index => (currentPosition + index + 1) % width === 0)
    };

    function isAtLeft() {
        return current.some(index => (currentPosition + index ) % width === 0)
    };

    function checkRotatedPosition(P) {
        P = P || currentPosition;
        if ((P + 1) % width < 4) {
            if (isAtRight()) {
                currentPosition += 1
                checkRotatedPosition(P)
            }
        } else if (P % width > 5) {
            if (isAtLeft()) {
                currentPosition -= 1
                checkRotatedPosition(P)
            }
        }
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
            gameOver()
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

//Function to play audio
    function myPlay(){ 
        audio.play()
    }

    function myPause(){
        audio.pause()
    }

//event listener to start and stop the game
    startBtn.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            myPause() 
        } else {
            myPlay()
            draw();
            checkSpeed()
            nextRandom = Math.floor(Math.random() * theTetrominoes.length) 
            displayShape() 
        } 
    });

   



//Function to add score
    function addScore() {
        for (var i = 0; i < 199; i += width) {
            const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                checkSpeed()
                addLevel()
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                    squares[index].style.backgroundImage = 'none';
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => 
                    grid.appendChild(cell)
                )
            }    
        }
    };


//Function for game over

    function gameOver() {
        if(current.some(index =>
            squares[currentPosition + index].classList.contains('taken'))) {
            scoreDisplay.innerHTML = 'Loser!';
            clearInterval(timerId);
            alert("Does Not Compute! Err0r!!")
        }
    };


//Function to increase tetromino speed 
    const checkSpeed = () => {
        if (score === 0) {
            clearInterval(timerId);
            timerId = setInterval(moveDown, 1000);
        } else if (score === 20) {
            clearInterval(timerId);
            timerId = setInterval(moveDown, 600);      
        } else if (score === 50) {
            clearInterval(timerId);
            timerId = setInterval(moveDown, 400);
        } else if (score >= 70) {
            clearInterval(timerId);
            timerId = setInterval(moveDown, 200);
        };
    }


    function addLevel() {
            if (score === 20) {
                level += 1;
                currentLevel.innerHTML = level;
            };
            if (score === 50) {
                level += 1;
                currentLevel.innerHTML = level;
            };
            if (score === 70) {
                level += 1;
                currentLevel.innerHTML = level;
            };
        }

});