export class GameGrid {
    constructor() {
        this.cells = [];
        this.gridElement = document.querySelector(".grid");
    }

    createBoard() {
        for (let i = 0; i < 12800; i++) {
            const div = document.createElement("div");
            this.gridElement.appendChild(div);
            this.cells.push(div);
        }
    }

    updateCell(index, className) {
        this.cells[index].classList.add(className);
    }

    displayGameOver(winner) {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        overlay.innerHTML = `<h1>${winner} Wins!</h1>`;
    }
}