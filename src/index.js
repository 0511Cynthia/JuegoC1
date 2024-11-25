//import Phaser from 'phaser';

import TronScene from './scenes/tronScenes.js';
console.log("hola mundo");


const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    backgroundColor: '#010020',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: new TronScene,
};

const game = new Phaser.Game(config);
