// src/domain/entities/CPU.js
export class CPU {
  constructor(level = 1, speed = 1) {
      this.level = level;
      this.speed = speed;
      this.direction = null;
      this.position = null;
  }

  decideNextMove(grid, playerPosition) {
      // Simple AI logic to move towards the player
      if (playerPosition > this.position) {
          this.direction = 1; // Move right
      } else if (playerPosition < this.position) {
          this.direction = -1; // Move left
      }
  }

  move() {
      this.position += this.direction;
  }

  increaseDifficulty() {
      this.level += 1;
      this.speed *= 0.9;
  }
}
