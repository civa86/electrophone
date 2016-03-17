import SoundSource from '../../core/SoundSource';

class Modulator extends SoundSource {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);
        //TODO separate in a method to call on update...like setMainProperties of Effect!!
        this.main = this.audioContext.createOscillator();
        this.main.type = this.wave;
        this.main.connect(this.envelope);
    }

    setNote () {
        let f =  this.freq % 11;
        this.main.frequency.value = f;
    }
}

export default Modulator;
