export const GameState = {
  currentPlayerOne: [],
  currentPlayerTwo: [],
  direction: 1,
  directionTwo: -1,
  interval: null,
  playerOneLives: 5,
  playerTwoLives: 5,
  cpuActive: localStorage.getItem("cpuActive") === "true",
};

export function initializeGameState() {
  GameState.currentPlayerOne = [];
  GameState.currentPlayerTwo = [];
  GameState.direction = 1;
  GameState.directionTwo = -1;
  GameState.playerOneScore = 0;
  GameState.playerTwoScore = 0;
  GameState.gameStatus = 'start';
  GameState.playerOneLives = 5;
  GameState.playerTwoLives = 5;

  // Aseguramos que se actualice el estado del CPU
  GameState.cpuActive = localStorage.getItem("cpuActive") === "true" || false;
}