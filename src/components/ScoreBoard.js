// src/components/Scoreboard.js
export class Scoreboard {
    constructor() {
        this.playerOneLives = document.querySelector("#player-one-lives");
        this.playerTwoLives = document.querySelector("#player-two-lives");
        this.playerOneScore = document.querySelector("#player-one-score");
        this.playerTwoScore = document.querySelector("#player-two-score");
    }

    update(players) {
        this.playerOneLives.innerHTML = this.renderLives(players[0].lives, "blue-disc.png");
        this.playerTwoLives.innerHTML = this.renderLives(players[1].lives, "red-disc.png");
        this.playerOneScore.textContent = players[0].score || 0;
        this.playerTwoScore.textContent = players[1].score || 0;
    }

    renderLives(lives, icon) {
        return Array.from({ length: lives }, () =>
            `<img class="image-lives" src="assets/images/${icon}" />`
        ).join("");
    }
}