import SoundSource from '../../core/SoundSource';

class Oscillator extends SoundSource {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);
        //TODO separate in a method to call on update...like setMainProperties of Effect!!
        this.main = this.audioContext.createOscillator();
        this.main.type = this.wave;
        this.main.connect(this.envelope);

        this.setDetune();
    }

    setNote (note) {
        this.main.frequency.value = note;
    }
}

export default Oscillator;
