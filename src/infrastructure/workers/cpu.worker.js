self.onmessage = function (e) {
    const { cpuPosition, playerPosition, direction, gridSize, grid } = e.data;

    const newDirection = decideNextMove(cpuPosition, playerPosition, direction, gridSize, grid);
    self.postMessage({ newDirection });
};

function decideNextMove(cpuPosition, playerPosition, direction, gridSize, grid) {
    console.log("Decidiendo movimiento de CPU...");

    const xDirection = 1;
    const yDirection = gridSize / 80;

    const possibleDirections = [    
        { dir: -yDirection, label: "UP" },    // Arriba
        { dir: yDirection, label: "DOWN" },  // Abajo
        { dir: -xDirection, label: "LEFT" }, // Izquierda
        { dir: xDirection, label: "RIGHT" }  // Derecha
    ];

    const scoredDirections = [];

    // Evaluar cada dirección posible
    for (const { dir, label } of possibleDirections) {
        const newPosition = cpuPosition + dir;

        // Verificar colisiones inmediatas y límites
        const isWithinBounds = newPosition >= 0 && newPosition < gridSize;
        const doesNotCollide =
            isWithinBounds && !grid[newPosition] && grid[newPosition] !== "playerOne" && grid[newPosition] !== "playerTwo";

        if (doesNotCollide) {
            // Calcular el puntaje de la dirección basada en la seguridad futura y el espacio disponible
            const futureSafe = isFutureSafe(newPosition, grid, gridSize);
            const spaceScore = calculateAvailableSpace(newPosition, grid, gridSize);

            // Priorizar direcciones con mayor espacio disponible y seguridad futura
            scoredDirections.push({
                dir,
                label,
                score: futureSafe ? spaceScore + 10 : spaceScore // Bonificación si es seguro a futuro
            });
        }
    }

    // Ordenar las direcciones por puntaje (descendente)
    scoredDirections.sort((a, b) => b.score - a.score);

    // Si hay direcciones con puntaje, elegir la mejor
    if (scoredDirections.length > 0) {
        const bestDirection = scoredDirections[0];
        console.log(`Dirección seleccionada: ${bestDirection.label} (Puntaje: ${bestDirection.score})`);
        return bestDirection.dir;
    }

    // Si no hay direcciones seguras, mantener la dirección actual
    console.log("No hay direcciones seguras. Manteniendo dirección actual.");
    return direction;
}

// Verificar si una posición futura es segura (simula múltiples pasos)
function isFutureSafe(position, grid, gridSize, steps = 2) {
    const xDirection = 1;
    const yDirection = gridSize / 80;

    // Direcciones posibles
    const possibleFutureDirections = [
        -yDirection, // Arriba
        yDirection,  // Abajo
        -xDirection, // Izquierda
        xDirection   // Derecha
    ];

    // Simular `steps` movimientos hacia el futuro
    for (let step = 0; step < steps; step++) {
        const futurePositions = possibleFutureDirections.map((dir) => position + dir);
        if (
            futurePositions.every((futurePos) => {
                const isWithinBounds = futurePos >= 0 && futurePos < gridSize;
                const doesNotCollide = isWithinBounds && !grid[futurePos];
                return doesNotCollide;
            })
        ) {
            return true; // Si todas las direcciones futuras son seguras
        }
    }

    return false; // No es seguro
}

// Calcular el espacio disponible desde una posición
function calculateAvailableSpace(position, grid, gridSize) {
    const xDirection = 1;
    const yDirection = gridSize / 80;
    const visited = new Set();
    const queue = [position];
    let spaceCount = 0;

    // BFS para contar el espacio disponible
    while (queue.length > 0 && spaceCount < 50) { // Limitar a 50 espacios para eficiencia
        const current = queue.shift();

        if (visited.has(current)) continue;
        visited.add(current);

        // Verificar las direcciones adyacentes
        const neighbors = [
            current - yDirection, // Arriba
            current + yDirection, // Abajo
            current - xDirection, // Izquierda
            current + xDirection  // Derecha
        ];

        for (const neighbor of neighbors) {
            const isWithinBounds = neighbor >= 0 && neighbor < gridSize;
            const doesNotCollide = isWithinBounds && !grid[neighbor];

            if (doesNotCollide && !visited.has(neighbor)) {
                queue.push(neighbor);
                spaceCount++;
            }
        }
    }

    return spaceCount;
}