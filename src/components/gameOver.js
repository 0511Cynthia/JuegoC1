// src/components/gameOver.js

export function displayGameOver(winner, GameState) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "block";
    overlay.innerHTML = `<h1>${winner} Wins!</h1>`;
}
