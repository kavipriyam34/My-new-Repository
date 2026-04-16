const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.querySelector('.restart-button');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const WIN_COMBINATIONS = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

function handleCellClick(e) {
    const idx = Array.from(cells).indexOf(e.target);
    if (board[idx] !== '' || !gameActive) return;

    board[idx] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());

    if (checkWin(currentPlayer)) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin(player) {
    return WIN_COMBINATIONS.some(comb =>
        comb.every(idx => board[idx] === player)
    );
}

function restartGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

// Initialize status message
statusMessage.textContent = `Player ${currentPlayer}'s turn`;