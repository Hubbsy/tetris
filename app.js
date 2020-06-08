document.addEventListener('DOMContentLoaded', () => {


//for loop that creates 200 divs for tetris board

    for (var i = 0; i < 200; i++) {
        let block = document.createElement('div');
        board.appendChild(block); 
    
    };

//tetrominos

    const grid = document.querySelector('.grid'); 
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;

 

})