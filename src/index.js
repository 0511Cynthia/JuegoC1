//import Phaser from 'phaser';

import TronScene from './scenes/tronScenes.js';
console.log("hola mundo");


const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 500,
    backgroundColor: '#010020',
    scene: new TronScene,
};

const game = new Phaser.Game(config);
