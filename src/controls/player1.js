export function checkControls(scene) {
    const currentAnimKey = scene.Player.anims.currentAnim ? scene.Player.anims.currentAnim.key : null;
    
    
    scene.Player.setVelocityX(0);
    

    if (scene.keys.left.isDown) {
        scene.Player.setVelocityX(-300); 
        if (scene.Player.body.onFloor() && currentAnimKey !== 'player-run') {
            scene.Player.anims.play('player-run', true); 
        }
        scene.Player.flipX = true; 
    }
  
    else if (scene.keys.right.isDown) {
        scene.Player.setVelocityX(300); 
        if (scene.Player.body.onFloor() && currentAnimKey !== 'player-run') {
            scene.Player.anims.play('player-run', true); 
        }
        scene.Player.flipX = false; 
    }
    
    else if (scene.Player.body.onFloor()) {
        if (currentAnimKey !== 'player-idle') {
            scene.Player.anims.play('player-idle', true); 
        }
    }   
    

    if (scene.keys.up.isDown && scene.Player.body.onFloor()) {
        scene.Player.setVelocityY(-420); 
        scene.Player.anims.play('player-jump', true); 
    }
}
