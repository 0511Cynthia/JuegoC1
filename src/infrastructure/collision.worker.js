self.onmessage = function(event){
    const{player1, player2} = event.data
    const collisionDetected = detectedCollision (player1, player2)
    self.postMessage ({ collisionDetected })
}

function detectedCollision (player1, player2){
    const dx = player2.x - player1.x
    const dy = player2.y - player1.y
    const distance = Math.sqrt(dx ** 2 + dy ** 2)
    return distance < player1.radius + player2.radius     
}