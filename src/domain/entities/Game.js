// src/domain/entities/Game.js
export class Game {
    constructor() {
        this.status = "start"; // Options: start, playing, paused, gameOver
        this.players = [];
        this.cpu = null;
    }

    start(players, cpu) {
        this.status = "playing";
        this.players = players;
        this.cpu = cpu;
        players.forEach(player => {
            player.position = 0; // Starting position
            player.direction = 1; // Default direction
        });
    }

    checkCollisions(player1, player2, gridSize) {
        const [p1, p2] = [player1.position, player2.position];
        if (p1 < 0 || p1 >= gridSize || p2 < 0 || p2 >= gridSize) {
            return true; // Collided with boundary
        }
        if (p1 === p2) {
            return true; // Players collided
        }
        return false;
    }

    endGame(winner) {
        this.status = "gameOver";
        console.log(`${winner.name} wins the game!`);
    }
}
