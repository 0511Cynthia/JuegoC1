class Score{
    constructor(scene){
        this.scene = scene;
        this.scoreText = this.scene.add.text(20, 20, 'Score: 0', { fontSize: '32px', fill: '#000' })
    }
    
    updateScore(score){
        this.scoreText.setText(`Score: ${score}`)
    }
}

export default Score;