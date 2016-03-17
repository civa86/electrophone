import { CONST } from '../../core/Constants';
import SoundSource from '../../core/SoundSource';

class Noise extends SoundSource {

    constructor (audioContext, props, name) {
        super(audioContext, props, name);

        //TODO separate in a method to call on update...like setMainProperties of Effect!!
        this.defaultLineInProperty = 'detune';
        this.main = this.audioContext.createBufferSource();
        this.main.connect(this.envelope);

        this.setDetune();
        this.setColor();
    }

    setColor () {
        switch (this.color) {
            case CONST.NOISE_WHITE :
                this.main.buffer = this.white();
                break;
            case CONST.NOISE_PINK :
                this.main.buffer = this.pink();
                break;
            case CONST.NOISE_BROWN :
                this.main.buffer = this.brown();
                break;
            default :
                throw new Error('Invalid Noise color: ' + this.color);
        }
    }

    white () {
        let noiseBuffer = this.getNoiseBuffer(),
            bufferSize = this.getBufferSize(),
            output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }

        return noiseBuffer;
    }

    pink () {
        let b0, b1, b2, b3, b4, b5, b6,
            noiseBuffer = this.getNoiseBuffer(),
            bufferSize = this.getBufferSize(),
            output = noiseBuffer.getChannelData(0),
            white;

        b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            white = Math.random() * 2 - 1;

            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;

            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11;
            b6 = white * 0.115926;
        }

        return noiseBuffer;
    }

    brown () {
        let noiseBuffer = this.getNoiseBuffer(),
            bufferSize = this.getBufferSize(),
            output = noiseBuffer.getChannelData(0),
            lastOut = 0.0,
            white;

        for (let i = 0; i < bufferSize; i++) {
            white = white = Math.random() * 2 - 1;

            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        return noiseBuffer;
    }

    getBufferSize () {
        return 2 * this.audioContext.sampleRate;
    }

    getNoiseBuffer () {
        let bufferSize = this.getBufferSize(),
            noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        return noiseBuffer;
    }

    setNote () {
        this.main.loop = true;
    }
}

export default Noise;
