import { CONST } from './core/Constants';
import Voice from './core/Voice';

/**
 * Synth Class
 * @example
 * const AudioCtx = window.AudioContext || window.webkitAudioContext;
 * const synth = new WebSynth(new AudioCtx(), { spectrum: false });
 */
class Synth {

    /**
     * Create the internal synthesizer instance
     * @param {AudioContext} audioContext - Web Audio Context instance
     * @param {WebSynthProperties} [properties] - synth properties
     */
    constructor (audioContext, props) {
        let properties = props || {};

        this.audioContext = audioContext;
        this.modulesConfig = {};
        this.voices = {};
        this.spectrum = properties.spectrum || false;
        this.updateSpectrum = properties.updateSpectrum || null;
        this.resetSpectrum = properties.resetSpectrum || null;

        this.analyser = null;
        this.javascriptNode = null;

        if (this.audioContext && typeof this.audioContext.createGainNode === 'function') {
            this.audioContext.createGain = this.audioContext.createGainNode;
        }
        if (this.audioContext && typeof this.audioContext.createDelayNode === 'function') {
            this.audioContext.createDelay = this.audioContext.createDelayNode;
        }

        if (this.spectrum === true) {
            this.createSpectrum();
        }

        this.module('Master', CONST.MASTER, {
            level: 100
        });

        this.module('Envelope', CONST.ADSR, {
            link: CONST.MASTER,
            target: 'gain',
            level: 100,
            attack: null,
            decay: 0.1,
            sustain: 100,
            release: 5
        });

    }

    createSpectrum () {
        var SMOOTHING = 0.8,
            FFT_SIZE = 2048;

        if (this.audioContext) {
            this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);
            this.javascriptNode.connect(this.audioContext.destination);

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.smoothingTimeConstant = SMOOTHING;
            this.analyser.fftSize = FFT_SIZE;
            this.analyser.minDecibels = -140;
            this.analyser.maxDecibels = 0;

            this.analyser.connect(this.audioContext.destination);
        }
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
        } else {
            this.updateModule(label, props);
        }
    }

    addModule (type, label, props) {
        this.modulesConfig[label] = {
            type,
            props
        };
    }

    updateModule (label, props) {
        if (this.modulesConfig[label]) {
            Object.keys(props).forEach((e) => {
                if (this.modulesConfig[label].props[e] !== undefined) {
                    this.modulesConfig[label].props[e] = props[e];
                }
            });

            Object.keys(this.voices).forEach((e) => {
                this.voices[e].updateModule(label, props);
            });
        }
    }

    destroyModule (label) {
        if (this.modulesConfig[label]) {
            delete this.modulesConfig[label];
            Object.keys(this.voices).forEach((e) => {
                this.voices[e].removeModule(label);
            });
        }
    }

    play (note) {
        let frequencyData;

        if (!this.voices[note]) {
            this.voices[note] = new Voice(note, this.audioContext, this.modulesConfig, this.analyser);
            this.voices[note].noteOn();
        }
        if (this.spectrum === true && this.javascriptNode) {
            frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

            this.javascriptNode.onaudioprocess = () => {
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
            delete this.voices[note];
        }
        if (
            Object.keys(this.voices).length === 0 &&
            this.spectrum === true &&
            this.javascriptNode
        ) {
            this.javascriptNode.onaudioprocess = null;
            if (
                this.resetSpectrum &&
                typeof this.resetSpectrum === 'function'
            ) {
                this.resetSpectrum();
            }
        }
    }
}

export default Synth;
