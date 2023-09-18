// Constants
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('reset');
const gameOverDisplay = document.getElementById('game-over');

let score = 0;
let timeLeft = 20;
let gameInterval;

function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomHole() {
    const index = Math.floor(Math.random() * holes.length);
    return holes[index];
}

function peep() {
    const time = randomTime(500, 1500);
    const hole = randomHole();
    hole.classList.add('mole');
    setTimeout(() => {
        hole.classList.remove('mole');
        if (timeLeft > 0) {
            peep();
        }
    }, time);
}

function startGame() {
    score = 0;
    timeLeft = 20;
    scoreDisplay.textContent = ` ${score}`;
    timerDisplay.textContent = ` ${timeLeft}`;
    gameOverDisplay.style.display = 'none';

    // Start the timer countdown
    gameInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = ` ${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(gameInterval);
            gameOverDisplay.style.display = 'block';
        }
    }, 1000);

    peep();
}

function bonk(e) {
    if (!e.isTrusted) return; // Prevent fake clicks
    if (e.target.classList.contains('mole')) {
        e.target.classList.remove('mole');
        score++;
        scoreDisplay.textContent = `${score}`;
    }
}

resetButton.addEventListener('click', startGame);
holes.forEach(hole => hole.addEventListener('click', bonk));

// Start the game initially
startGame();