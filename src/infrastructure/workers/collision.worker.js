self.onmessage = function (e) {
    const { playerOne, playerTwo, direction, gridSize } = e.data;

    const collisions = {
        playerOne: checkCollision(playerOne, playerTwo, direction.playerOne, gridSize),
        playerTwo: checkCollision(playerTwo, playerOne, direction.playerTwo, gridSize),
    };

    self.postMessage(collisions);
};

// function checkCollision(playerPositions, opponentPositions, direction, gridSize) {
//     const currentPosition = playerPositions[0]; // Posición actual del jugador
//     const xDirection = 1;
//     const yDirection = gridSize / 80;

//     // Verificar si choca contra sí mismo
//     const selfCollision = playerPositions.slice(1).includes(currentPosition);

//     // Verificar si choca contra el oponente
//     const opponentCollision = opponentPositions.includes(currentPosition);

//     // Verificar si choca contra los límites del tablero
//     const wallCollision =
//         currentPosition < 0 || // Límite superior
//         currentPosition >= gridSize || // Límite inferior
//         currentPosition % yDirection === 0 || // Límite izquierdo
//         currentPosition % yDirection === yDirection - 1; // Límite derecho

//     // Retornar si hay colisión
//     return selfCollision || opponentCollision || wallCollision;
// }

function checkCollision(playerPositions, opponentPositions, direction, gridSize) {
    const currentPosition = playerPositions[0];
    const xDirection = 1;
    const yDirection = gridSize / 80;

    // Verificar si choca contra sí mismo (ignorar la posición más reciente)
    const selfCollision = playerPositions.slice(2).includes(currentPosition);

    // Verificar si choca contra el oponente
    const opponentCollision = opponentPositions.includes(currentPosition);

    // Verificar si choca contra los límites del tablero
    const wallCollision =
        currentPosition < 0 || // Límite superior
        currentPosition >= gridSize || // Límite inferior
        currentPosition % yDirection === 0 || // Límite izquierdo
        currentPosition % yDirection === yDirection - 1; // Límite derecho

    // Retornar si hay colisión
    return selfCollision || opponentCollision || wallCollision;
}