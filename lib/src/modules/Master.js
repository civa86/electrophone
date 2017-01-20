import Module from '../core/Module';

class Master extends Module {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        this.main = this.audioContext.createGain();
        this.link = null;
    }

    getLineIn () {
        return this.main;
    }

    lineOut (analyser) {
        this.main.connect(this.envelope);
        if (analyser) {
            this.gain.connect(analyser);
        } else {
            this.gain.connect(this.audioContext.destination);
        }
    }
}

export default Master;
