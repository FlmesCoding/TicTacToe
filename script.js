document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.tic-tac-toe-cell');
    let currentPlayer = 'x';
    let gameEnded = false;
    
    function handleCellClick() {
        if (gameEnded || this.textContent !== '') {
            return;
        }
    
        this.textContent = currentPlayer;
        this.classList.add(currentPlayer);
    
        if (checkWin()) {
            endGame();
            return;
        }
    
        if (checkTie()) {
            endGame(true);
            return;
        }
    
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
    
    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
    
            if (
                cells[a].textContent !== '' &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                cells[a].classList.add('winner');
                cells[b].classList.add('winner');
                cells[c].classList.add('winner');
    
                return true;
            }
        }
    
        return false;
    }
    
    function checkTie() {
        return [...cells].every(cell => cell.textContent !== '');
    }
    
    function endGame(isTie = false) {
        gameEnded = true;
    
        if (isTie) {
            setTimeout(() => {
                alert("It's a tie!");
                resetGame();
            }, 100);
        } else {
            setTimeout(() => {
                alert(`${currentPlayer.toUpperCase()} wins!`);
                resetGame();
            }, 100);
        }
    }
    
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
            currentPlayer = 'x';
            gameEnded = false;
        });
    }
    
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
