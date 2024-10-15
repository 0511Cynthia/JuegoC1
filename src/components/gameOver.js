class gameOver {
    constructor(scene) {
        this.scene = scene;
        this.gameOverText = this.scene.add.text(400, 300, 'Game Over',{fontSize: '64px',  fill: '#ff0000'}).setOrigin(0.5)
        this.gameOverText.setVisibility(false)
    }
    
    showGameOver(){
        this.gameOverText.setVisible(true)
    }

    hideGameOver(){
        this.gameOverText.setVisible(false)
    }
}

export default gameOver;