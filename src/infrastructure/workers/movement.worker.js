self.onmessage = (e) => {
    const { players, direction } = e.data;

    console.log("Movement worker received:", e.data);

    const updatedPositions = {
        playerOne: [players.playerOne[0] + direction.playerOne, ...players.playerOne],
        playerTwo: [players.playerTwo[0] + direction.playerTwo, ...players.playerTwo],
    };

    // Eliminar duplicados (solo mantener las posiciones únicas recientes)
    updatedPositions.playerOne = [...new Set(updatedPositions.playerOne)];
    updatedPositions.playerTwo = [...new Set(updatedPositions.playerTwo)];

    console.log("Updated positions:", updatedPositions);

    self.postMessage(updatedPositions);
};
