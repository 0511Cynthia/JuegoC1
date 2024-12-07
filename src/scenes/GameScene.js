// import { GameGrid } from "../components/GameGrid.js";
// import { Scoreboard } from "../components/ScoreBoard.js";

// export class GameScene {
//     constructor(GameState) {
//         this.grid = new GameGrid();
//         this.scoreboard = new Scoreboard();
//         this.GameState = GameState;

//         this.movementWorker = new Worker("../src/infrastructure/workers/movement.worker.js", { type: "module" });
//         this.collisionWorker = new Worker("../src/infrastructure/workers/collision.worker.js", { type: "module" });
//         this.controlsWorker = new Worker("../src/infrastructure/workers/controls.worker.js", { type: "module" }); // Nuevo worker
//     }

//     init() {
//         this.grid.createBoard();
//         this.bindEvents();
//         this.resetGame();
//     }

//     bindEvents() {
//         document.addEventListener("keydown", (event) => {
//             const { direction, directionTwo, xDirection, yDirection } = this.GameState;
    
//             // Enviar las teclas presionadas al worker de controles
//             this.controlsWorker.postMessage({
//                 key: event.key,
//                 direction,
//                 directionTwo,
//                 xDirection,
//                 yDirection,
//             });
    
//             // Escuchar la respuesta del worker
//             this.controlsWorker.onmessage = (e) => {
//                 const { newDirection, newDirectionTwo } = e.data;
    
//                 // Validar que las direcciones sean válidas
//                 if (!isNaN(newDirection)) {
//                     this.GameState.direction = newDirection;
//                 }
//                 if (!isNaN(newDirectionTwo)) {
//                     this.GameState.directionTwo = newDirectionTwo;
//                 }
    
//                 console.log(`Updated directions: P1(${this.GameState.direction}), P2(${this.GameState.directionTwo})`);
//             };
    
//             // Iniciar el juego al presionar la barra espaciadora
//             if (event.code === "Space" && !this.GameState.interval) {
//                 console.log("Starting game...");
//                 this.startGame();
//             }
//         });
//     }
    

//     resetGame() {
//         this.GameState.currentPlayerOne = [800];
//         this.GameState.currentPlayerTwo = [11999];
//         this.GameState.direction = 1;
//         this.GameState.directionTwo = -1;

//         // Inicializar las direcciones horizontales y verticales
//         this.GameState.xDirection = 1;   // Movimiento horizontal: 1 celda
//         this.GameState.yDirection = 12800/80; // Movimiento vertical: Número de columnas (12800 / 80)

//         console.log("Resetting game state:", this.GameState);

//         const overlay = document.getElementById("overlay");
//         overlay.style.display = "block";
//         overlay.innerHTML = "<h1>Press SPACE to Start</h1>";

//         this.scoreboard.update([
//             { lives: this.GameState.playerOneLives, score: 0 },
//             { lives: this.GameState.playerTwoLives, score: 0 },
//         ]);

//         this.grid.updateCell(this.GameState.currentPlayerOne[0], "playerOne");
//         this.grid.updateCell(this.GameState.currentPlayerTwo[0], "playerTwo");
//     }

//     startGame() {
//         const overlay = document.getElementById("overlay");
//         overlay.style.display = "none";

//         this.GameState.interval = setInterval(() => {
//             this.update();
//         }, 100);
//     }

//     update() {
//         console.log("Updating positions with directions:", this.GameState.direction, this.GameState.directionTwo);
    
//         this.movementWorker.postMessage({
//             players: {
//                 playerOne: this.GameState.currentPlayerOne,
//                 playerTwo: this.GameState.currentPlayerTwo,
//             },
//             direction: {
//                 playerOne: this.GameState.direction,
//                 playerTwo: this.GameState.directionTwo,
//             },
//         });
    
//         this.movementWorker.onmessage = (e) => {
//             const { playerOne, playerTwo } = e.data;
    
//             console.log("Received positions from movement worker:", e.data);
    
//             this.GameState.currentPlayerOne = playerOne;
//             this.GameState.currentPlayerTwo = playerTwo;
    
//             // Validar las posiciones antes de actualizar las celdas
//             if (playerOne[0] >= 0 && playerOne[0] < 12800) {
//                 this.grid.updateCell(playerOne[0], "playerOne");
//             }
//             if (playerTwo[0] >= 0 && playerTwo[0] < 12800) {
//                 this.grid.updateCell(playerTwo[0], "playerTwo");
//             }
    
//             this.checkCollisions();
//         };
//     }
    

//     checkCollisions() {
//         this.collisionWorker.postMessage({
//             playerOne: this.GameState.currentPlayerOne,
//             playerTwo: this.GameState.currentPlayerTwo,
//             direction: {
//                 playerOne: this.GameState.direction,
//                 playerTwo: this.GameState.directionTwo,
//             },
//             gridSize: 12800,
//         });

//         this.collisionWorker.onmessage = (e) => {
//             const { playerOne, playerTwo } = e.data;

//             if (playerOne || playerTwo) {
//                 clearInterval(this.GameState.interval);
//                 console.log("Collision detected!");

//                 const winner = playerOne ? "Player Two" : "Player One";
//                 this.grid.displayGameOver(winner);
//             }
//         };
//     }
// }

import { GameGrid } from "../components/GameGrid.js";
import { Scoreboard } from "../components/ScoreBoard.js";

export class GameScene {
    constructor(GameState) {
        this.grid = new GameGrid();
        this.scoreboard = new Scoreboard();
        this.GameState = GameState;

        this.movementWorker = new Worker("../src/infrastructure/workers/movement.worker.js", { type: "module" });
        this.collisionWorker = new Worker("../src/infrastructure/workers/collision.worker.js", { type: "module" });
        this.controlsWorker = new Worker("../src/infrastructure/workers/controls.worker.js", { type: "module" });
        this.cpuWorker = new Worker("../src/infrastructure/workers/cpu.worker.js", { type: "module" }); // Worker para la CPU
    }

    init() {
        this.grid.createBoard();
        this.bindEvents();
        this.resetGame();
    }

    bindEvents() {
        document.addEventListener("keydown", (event) => {
            const { direction, directionTwo, xDirection, yDirection, cpuActive } = this.GameState;

            // Si la CPU está activa, desactivar los controles del jugador 2
            if (cpuActive && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
                return;
            }

            // Enviar las teclas presionadas al worker de controles
            this.controlsWorker.postMessage({
                key: event.key,
                direction,
                directionTwo,
                xDirection,
                yDirection,
            });

            // Escuchar la respuesta del worker
            this.controlsWorker.onmessage = (e) => {
                const { newDirection, newDirectionTwo } = e.data;

                // Actualizar las direcciones en el estado del juego
                if (!isNaN(newDirection)) {
                    this.GameState.direction = newDirection;
                }
                if (!isNaN(newDirectionTwo) && !cpuActive) {
                    this.GameState.directionTwo = newDirectionTwo;
                }

                console.log(`Updated directions: P1(${this.GameState.direction}), P2(${this.GameState.directionTwo})`);
            };

            // Iniciar el juego al presionar la barra espaciadora
            if (event.code === "Space" && !this.GameState.interval) {
                console.log("Starting game...");
                this.startGame();
            }
        });
    }

    resetGame() {
        this.GameState.currentPlayerOne = [800];
        this.GameState.currentPlayerTwo = [11999];
        this.GameState.direction = 1;
        this.GameState.directionTwo = -1;

        // Inicializar las direcciones horizontales y verticales
        this.GameState.xDirection = 1;       // Movimiento horizontal: 1 celda
        this.GameState.yDirection = 160;    // Movimiento vertical: Número de columnas (12800 / 80)

        console.log("Resetting game state:", this.GameState);

        const overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        overlay.innerHTML = "<h1>Press SPACE to Start</h1>";

        this.scoreboard.update([
            { lives: this.GameState.playerOneLives, score: 0 },
            { lives: this.GameState.playerTwoLives, score: 0 },
        ]);

        this.grid.updateCell(this.GameState.currentPlayerOne[0], "playerOne");
        this.grid.updateCell(this.GameState.currentPlayerTwo[0], "playerTwo");
    }

    startGame() {
        const overlay = document.getElementById("overlay");
        overlay.style.display = "none";

        this.GameState.interval = setInterval(() => {
            this.update();
        }, 100);
    }

    update() {
        console.log("Updating positions with directions:", this.GameState.direction, this.GameState.directionTwo);
    
        // Serializar el estado del grid para enviarlo al worker
        const serializedGrid = this.grid.cells.map((cell) => {
            if (cell.classList.contains("playerOne")) return "playerOne";
            if (cell.classList.contains("playerTwo")) return "playerTwo";
            return null;
        });
    
        // Si la CPU está activa, calcular la dirección del jugador 2
        if (this.GameState.cpuActive) {
            this.cpuWorker.postMessage({
                cpuPosition: this.GameState.currentPlayerTwo[0],
                playerPosition: this.GameState.currentPlayerOne[0],
                direction: this.GameState.directionTwo,
                gridSize: 12800,
                grid: serializedGrid,
            });
    
            this.cpuWorker.onmessage = (e) => {
                const { newDirection } = e.data;
                if (!isNaN(newDirection)) {
                    this.GameState.directionTwo = newDirection;
                }
            };
        }
    
        // Actualizar las posiciones con el worker de movimiento
        this.movementWorker.postMessage({
            players: {
                playerOne: this.GameState.currentPlayerOne,
                playerTwo: this.GameState.currentPlayerTwo,
            },
            direction: {
                playerOne: this.GameState.direction,
                playerTwo: this.GameState.directionTwo,
            },
        });
    
        this.movementWorker.onmessage = (e) => {
            const { playerOne, playerTwo } = e.data;
    
            console.log("Received positions from movement worker:", e.data);
    
            this.GameState.currentPlayerOne = playerOne;
            this.GameState.currentPlayerTwo = playerTwo;
    
            // Actualizar las celdas en el grid
            if (playerOne[0] >= 0 && playerOne[0] < 12800) {
                this.grid.updateCell(playerOne[0], "playerOne");
            }
            if (playerTwo[0] >= 0 && playerTwo[0] < 12800) {
                this.grid.updateCell(playerTwo[0], "playerTwo");
            }
    
            this.checkCollisions();
        };
    }

    checkCollisions() {
        this.collisionWorker.postMessage({
            playerOne: this.GameState.currentPlayerOne,
            playerTwo: this.GameState.currentPlayerTwo,
            direction: {
                playerOne: this.GameState.direction,
                playerTwo: this.GameState.directionTwo,
            },
            gridSize: 12800,
        });

        this.collisionWorker.onmessage = (e) => {
            const { playerOne, playerTwo } = e.data;

            if (playerOne || playerTwo) {
                clearInterval(this.GameState.interval);
                console.log("Collision detected!");

                const winner = playerOne ? "Player Two" : "Player One";
                this.grid.displayGameOver(winner);
            }
        };
    }
}