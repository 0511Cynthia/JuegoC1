export function createBoard(grid, size = 12800) {
  for (let i = 0; i < size; i++) {
      const div = document.createElement("div");
      grid.appendChild(div);
  }
}

export function colorSquares(grid, squares) {
  squares[GameState.currentPlayerOne[0]].classList.add("playerOne");
  squares[GameState.currentPlayerTwo[0]].classList.add("playerTwo");
}
