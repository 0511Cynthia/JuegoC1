// src/components/Overlay.js
export class Overlay {
    constructor() {
        this.overlayElement = document.getElementById("overlay");
        this.overlayContent = document.getElementById("overlay-content");
    }

    show(message) {
        this.overlayElement.style.display = "block";
        this.overlayContent.innerHTML = message;
    }

    hide() {
        this.overlayElement.style.display = "none";
    }

    static getOverlayMessage(status) {
        switch (status) {
            case 'start':
                return '<div>Press SPACE to Start the Game!</div>';
            case 'gameOver':
                return '<div>Game Over!</div>';
            default:
                return '<div>Paused</div>';
        }
    }
}
