// src/rules.js
export function checkCollision(position, direction, GameState, squares) {
  const { yDirection, xDirection } = GameState;
  const collisions = [
      position + yDirection >= yDirection * 80 && direction === yDirection, // Bottom wall
      position % yDirection === yDirection - 1 && direction === xDirection, // Right wall
      position % yDirection === 0 && direction === -xDirection, // Left wall
      position - yDirection <= 0 && direction === -yDirection, // Top wall
  ];

  return collisions.some(c => c) || squares[position]?.classList.contains("playerOne") ||
        squares[position]?.classList.contains("playerTwo");
}