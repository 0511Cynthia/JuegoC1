export class AudioManager {
    constructor() {
        this.sounds = {
            extraLife: new Audio("assets/audio/extra-life.wav"),
            crash: new Audio("assets/audio/short-explosion-2.wav"),
            winner: new Audio("assets/audio/achievement-1.wav"),
            loser: new Audio("assets/audio/lose-1.wav"),
        };
    }

    play(soundName) {
        const sound = this.sounds[soundName];
        if (sound) sound.play();
    }

    toggleSound(state) {
        for (let key in this.sounds) {
            this.sounds[key].muted = !state;
        }
    }
}