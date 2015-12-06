import AudioContext from '../AudioContext'
import Module from '../core/Module'

class Master extends Module {

    constructor (props) {
        super(props);

        this.main = AudioContext.createGain();
        this.link = null;
    }

    getLineIn () {
        return this.main;
    }

    lineOut () {
        this.main.connect(this.gain);
        return this.gain;
        //if (spectrum) {
        //    this.javascriptNode = AudioContext.createScriptProcessor(2048, 1, 1);
        //    this.javascriptNode.connect(AudioContext.destination);
        //
        //    this.analyser = AudioContext.createAnalyser();
        //    this.analyser.fftSize = 1024;
        //
        //    this.gain.connect(this.analyser);
        //    this.analyser.connect(AudioContext.destination);
        //
        //    this.javascriptNode.onaudioprocess = function () {
        //        console.log('asd');
        //    };
        //
        //} else {

        //}
    }
}

export default Master;
