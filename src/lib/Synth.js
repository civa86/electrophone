import { CONST } from './core/Constants'
import AudioContext from './AudioContext'
import Voice from './core/Voice'

class Synth {

    constructor (props) {
        let properties = props || {};
        this.modulesConfig = {};
        this.voices = {};
        this.spectrum = properties.spectrum || false;
        this.updateSpectrum = properties.updateSpectrum || null;

        this.analyser = null;
        this.javascriptNode = null;

        if (this.spectrum === true) {
            this.createSpectrum();
        }

        this.module('Master', CONST.MASTER, {
            level: 100
        });

        this.module('Envelope', CONST.ADSR, {
            link:    CONST.MASTER,
            target:  'gain',
            level:   100,
            attack:  null,
            decay:   0.1,
            sustain: 100,
            release: 5
        });

    }

    createSpectrum () {
        this.javascriptNode = AudioContext.createScriptProcessor(2048, 1, 1);
        this.javascriptNode.connect(AudioContext.destination);

        this.analyser = AudioContext.createAnalyser();
        this.analyser.fftSize = 1024;

        this.analyser.connect(AudioContext.destination);
    }

    module (type, label, props) {
        if (!type || type.constructor !== String) {
            throw new Error('Synth Module :: missing type');
        }

        if (!label || label.constructor !== String) {
            throw new Error('Synth Module :: missing label');
        }

        if (!props || props.constructor !== Object) {
            throw new Error('Synth Module :: missing properties');
        }

        if (!this.modulesConfig[label]) {
            this.addModule(type, label, props);
        }
    }

    addModule (type, label, props) {
        this.modulesConfig[label] = {
            type,
            props
        };
    }

    play (note) {
        let frequencyData;

        if (!this.voices[note]) {
            this.voices[note] = new Voice(note, this.modulesConfig, this.analyser);
            this.voices[note].noteOn();
        }
        if (this.spectrum === true && this.javascriptNode) {
            frequencyData =  new Uint8Array(this.analyser.frequencyBinCount);

            this.javascriptNode.onaudioprocess =  () => {
                this.analyser.getByteFrequencyData(frequencyData);
                if (this.updateSpectrum && typeof this.updateSpectrum === 'function') {
                    this.updateSpectrum(frequencyData);
                }
            };
        }
    }

    stop (note) {
        if (this.voices[note]) {
            this.voices[note].noteOff();
            this.voices[note] = undefined;
        }
        if (this.spectrum === true && this.javascriptNode) {
            this.javascriptNode.onaudioprocess = null;
        }
    }
}

export default Synth;
