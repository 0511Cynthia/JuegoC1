export function handleKeyPress(event, GameState) {
    const { direction, directionTwo, xDirection, yDirection } = GameState;

    switch (event.key) {
        case 'a':
            if (Math.abs(direction) !== xDirection) GameState.direction = -xDirection;
            break;
        case 'd':
            if (Math.abs(direction) !== xDirection) GameState.direction = xDirection;
            break;
        case 'w':
            if (Math.abs(direction) !== yDirection) GameState.direction = -yDirection;
            break;
        case 's':
            if (Math.abs(direction) !== yDirection) GameState.direction = yDirection;
            break;
        case 'ArrowLeft':
            if (Math.abs(directionTwo) !== xDirection) GameState.directionTwo = -xDirection;
            break;
        case 'ArrowRight':
            if (Math.abs(directionTwo) !== xDirection) GameState.directionTwo = xDirection;
            break;
        case 'ArrowUp':
            if (Math.abs(directionTwo) !== yDirection) GameState.directionTwo = -yDirection;
            break;
        case 'ArrowDown':
            if (Math.abs(directionTwo) !== yDirection) GameState.directionTwo = yDirection;
            break;
    }
}