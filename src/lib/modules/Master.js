//Web Audio Context
import AudioContext from '../AudioContext'

class Master {

    constructor (props) {
        this.gain = AudioContext.createGain();
        this.env = {
            attack: 0,
            decay: 0,
            sustain: 1,
            hold: 1,
            release: 0
        };

        this.gain.gain.value = props.level || 1;

        //this.gain.gain.linearRampToValueAtTime(0.0001, AudioContext.currentTime);
        //this.gain.gain.linearRampToValueAtTime(1, AudioContext.currentTime + this.env.attack + 0.00001);
        //this.gain.gain.linearRampToValueAtTime(1 * this.env.sustain, AudioContext.currentTime + this.env.attack + this.env.decay + 0.00002);
        //this.gain.gain.linearRampToValueAtTime(1 * this.env.sustain, AudioContext.currentTime + this.env.attack + this.env.decay + this.env.hold + 0.00003);
        //this.gain.gain.linearRampToValueAtTime(0.0001, AudioContext.currentTime + this.env.attack + this.env.decay + this.env.hold + this.env.release + 0.00004);

        this.lineout = {
            source: this.gain
        };
    }
}

export default Master;
