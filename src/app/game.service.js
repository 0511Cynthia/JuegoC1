import CollisionService from '../domain/collision.service.js';

class GameService {
    constructor() {
        this.player1 = { x: 400, y: 300 }; // Cambia a la posición inicial
        this.player2 = { x: 800, y: 600 };
        this.gameOver = false;
        this.collisionService = new CollisionService();
    }

    createPlayers(scene) {
        this.scene = scene; // Referencia a la escena
    }

    updatePlayers() {
        // Movimiento para el jugador 1 (teclas de flecha)
        if (this.scene.keys.left.isDown) {
            this.player1.x -= 5;
            this.scene.player1.anims.play('cycle1PositionL', true);
            this.scene.player1.flipX = false; // Voltea la imagen horizontalmente
        } 
        else if (this.scene.keys.right.isDown) {
            this.player1.x += 5; 
            this.scene.player1.anims.play('cycle1PositionR', true);
            this.scene.player1.flipX = true; // Asegúrate de que la imagen no esté volteada
        } 
        else if (this.scene.keys.up.isDown) {
            this.player1.y -= 5; 
            this.scene.player1.anims.play('cycle1PositionUp', true);
        } 
        else if (this.scene.keys.down.isDown) {
            this.player1.y += 5; 
            this.scene.player1.anims.play('cycle1PositionDown', true);
        }
        // Detener la animación si no hay teclas presionadas
        else {
            this.scene.player1.anims.stop();
        }

    // Movimiento para el jugador 2 (teclas WASD)
        if (this.scene.cursors.left.isDown) {
            this.player2.x -= 5;
            this.scene.player2.anims.play('cycle2PositionL', true);
            this.scene.player2.flipX = false;

        }
        if (this.scene.cursors.right.isDown) {
            this.player2.x += 5; 
            this.scene.player2.anims.play('cycle2PositionR', true);
            this.scene.player2.flipX = true; 
        }
        if (this.scene.cursors.up.isDown) {
            this.player2.y -= 5; 
            this.scene.player2.anims.play('cycle2PositionUp', true);
        }
        if (this.scene.cursors.down.isDown) {
            this.player2.y += 5; 
            this.scene.player2.anims.play('cycle2PositionDown', true);
        }
        // Detener la animación si no hay teclas presionadas
        else{
            this.scene.player2.anims.stop();
        }

        // Actualizar las posiciones de los jugadores
        this.scene.player1.setPosition(this.player1.x, this.player1.y);
        this.scene.player2.setPosition(this.player2.x, this.player2.y);

        // Llama a la animación del jugador 1 a través de la escena
        // this.scene.player2.anims.play('cycle2Position', true);

        
    }

    verifyCollision() {
        var collision = this.collisionService.detectCollision(this.player1, this.player2);
        if (collision) {
            console.log("Collision!");
            this.end();
        }
    }
    
    end() {
        this.gameOver = true;
        console.log("Game Over!");
        this.scene.gameOver();
        this.scene.physics.pause();
    }
}

export default GameService;