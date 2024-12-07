self.onmessage = (e) => {
    const { key, direction, directionTwo, xDirection, yDirection } = e.data;

    console.log("OLD DIRECTIONS", {direction, directionTwo, xDirection, yDirection})

    let newDirection = direction;
    let newDirectionTwo = directionTwo;

    switch (key) {
        // Player 1 Controls
        case 'a': // Left
            if (Math.abs(direction) !== xDirection) newDirection = -xDirection;
            break;
        case 'd': // Right
            if (Math.abs(direction) !== xDirection) newDirection = xDirection;
            break;
        case 'w': // Up
            if (Math.abs(direction) !== yDirection) newDirection = -yDirection;
            break;
        case 's': // Down
            if (Math.abs(direction) !== yDirection) newDirection = yDirection;
            break;

        // Player 2 Controls
        case 'ArrowLeft': // Left
            if (Math.abs(directionTwo) !== xDirection) newDirectionTwo = -xDirection;
            break;
        case 'ArrowRight': // Right
            if (Math.abs(directionTwo) !== xDirection) newDirectionTwo = xDirection;
            break;
        case 'ArrowUp': // Up
            if (Math.abs(directionTwo) !== yDirection) newDirectionTwo = -yDirection;
            break;
        case 'ArrowDown': // Down
            if (Math.abs(directionTwo) !== yDirection) newDirectionTwo = yDirection;
            break;
    }

    console.log("NEW POSITIONS", {newDirection, newDirectionTwo})

    // Fallback: If no valid change, return the current directions
    self.postMessage({
        newDirection: newDirection ?? direction,
        newDirectionTwo: newDirectionTwo ?? directionTwo,
    });
};