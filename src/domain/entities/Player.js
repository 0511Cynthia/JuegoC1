// src/domain/entities/Player.js
export class Player {
    constructor(name, color, lives) {
        this.name = name;
        this.color = color;
        this.lives = lives;
        this.score = 0;
        this.position = null;
        this.direction = null;
    }

    move(direction) {
        this.position += direction;
    }

    loseLife() {
        this.lives -= 1;
    }

    increaseScore() {
        this.score += 1;
    }
}
