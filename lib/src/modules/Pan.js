import Module from '../core/Module';

class Pan extends Module {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);
        //TODO check for method to call on update...like setMainProperties of Effect!!
        this.main = this.audioContext.createStereoPanner();
        this.main.pan.value = this.value;
        this.main.connect(this.envelope);
    }
}

export default Pan;
