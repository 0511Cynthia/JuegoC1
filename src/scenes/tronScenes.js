import GameService from '../app/game.service.js';

class TronScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TronScene' });
        this.gameService = new GameService();
    }

    preload() {
        console.log("Preload called");
        this.load.spritesheet(
            'player1', 
            'assets/cycle1.png',
            { frameWidth: 61, frameHeight: 122 }
        );
        this.load.spritesheet(
            'player2', 
            'assets/cycle2.png',
            { frameWidth: 61, frameHeight: 120 }
        );
        this.load.image('background', 'assets/background.png');
    }
    
    create() {
        // Configurar las teclas del teclado
        this.keys = this.input.keyboard.createCursorKeys(); // Para el jugador 1
        this.cursors = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        }); // Para el jugador 2

        // Crear el jugador 1
        this.player1 = this.add.sprite(400, 300, 'player1')
            .setOrigin(0.5, 0.5)
            .setScale(0.5);

        // Crear el jugador 2
        this.player2 = this.add.sprite(600, 300, 'player2') // Asegúrate de que este sprite se cargue correctamente
            .setOrigin(0.5, 0.5)
            .setScale(0.25);
            console.log("Player2 created:", this.player2);


        // Crear el fondo
        this.background1 = this.add.tileSprite(
            250, 
            this.sys.game.config.height - 10, 
            this.sys.game.config.width, 
            1, 
            'background'
        );

        // Definir las animaciones
        this.anims.create({
            key: 'cycle1Position',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'cycle2Position',
            frames: this.anims.generateFrameNumbers('player2', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.gameService.createPlayers(this);
    }

    update() {
        console.log('update');
        this.gameService.updatePlayers();
    }

    gameOver() {
        this.scene.start('GameOverScene');
        this.scene.stop('TronScene');
        console.log("Game over");
    }
}

export default TronScene;