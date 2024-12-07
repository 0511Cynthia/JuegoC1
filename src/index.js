// src/index.js
import { GameScene } from "./scenes/GameScene.js";
import { GameState, initializeGameState } from "./app/game.service.js";

document.addEventListener("DOMContentLoaded", () => {
    const cpuActive = localStorage.getItem("cpuActive") === "true" || false;
    GameState.cpuActive = cpuActive;

    // Check if we're on the game page
    const grid = document.getElementById("game-grid");
    if (grid) {
        initializeGameState();
        const gameScene = new GameScene(GameState);
        gameScene.init();
    } else {
        // Handle menu logic
        const onePlayerButton = document.getElementById("menu-item-0");
        const twoPlayersButton = document.getElementById("menu-item-1");

        onePlayerButton?.addEventListener("click", () => {
            localStorage.setItem("cpuActive", true);
            location.href = "./game.html";
        });

        twoPlayersButton?.addEventListener("click", () => {
            localStorage.setItem("cpuActive", false);
            location.href = "./game.html";
        });
    }
});