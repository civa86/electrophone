import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import Synth from './src/Synth';

const
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    methods = Object.keys(Modules);
let synth;

/**
 * ElectroPhone Library.
 * @example
 * const AudioCtx = window.AudioContext || window.webkitAudioContext;
 * const synth = new ElectroPhone(new AudioCtx(), { spectrum: false });
 */
class ElectroPhone {
    /**
     * Create a playable web synthesizer instance.
     * @param {AudioContext} audioContext - Web Audio Context instance.
     * @param {ElectroPhoneProperties} [properties] - synth properties.
     */
    constructor (audioContext, props) {
        const properties = props || {};
        synth = new Synth(audioContext, properties);
        this.isPlaying = false;
    }

    /**
     * Returns current synth modules configuration object.
     * @return {Object} current synth modules configuration.
     * @property {Object} master - the master ModuleProperties.
     * @property {Object} adsr - the adsr ModuleProperties.
     * @property {ModuleProperties} <module_id> - one ModuleProperties for each created module.
     */
    getModules () {
        return {
            ...synth.modulesConfig
        };
    }

    /**
     * Create a new synth module.
     * @param {String} id - the module identifier.
     * @param {String} type - the type of module.
     * @param {Object} properties - module properties.
     * @return {ElectroPhone}
     * @throws {Error} throw error when module with id is already created.
     */
    create (id, type, properties) {
        const currentModule = this.getModules()[id];
        if (currentModule) {
            throw new Error('Module ' + id + ' already created. Use update method instead.');
        }
        synth.module(type, id, properties);
        return this;
    }

    /**
     * Update the synth module by id.
     * @param {String} id - the module identifier.
     * @param {Object} properties - module properties.
     * @return {ElectroPhone}
     * @throws {Error} throw error when module with id is not found.
     */
    update (id, properties) {
        const currentModule = this.getModules()[id];
        if (!currentModule) {
            throw new Error('Module ' + id + ' not found. Use create method instead.');
        }
        synth.module(currentModule.type, id, properties);
        return this;
    }

    /**
     * Update the master module.
     * @param {Object} properties - master properties.
     * @return {ElectroPhone}
     */
    master (properties) {
        synth.module(TYPES.MASTER, CONST.MASTER, properties);
        return this;
    }

    /**
     * Update the ADSR module.
     * @param {Object} properties - ADSR (Envelope) properties
     * @return {ElectroPhone}
     */
    adsr (properties) {
        synth.module(TYPES.ENVELOPE, CONST.ADSR, properties);
        return this;
    }

    /**
     * Destroy the synth module by id.
     * @param {String} id - the module identifier.
     * @return {ElectroPhone}
     * @throws {Error} throw error when module with id is not found.
     */
    destroy (id) {
        const currentModule = this.getModules()[id];
        if (!currentModule) {
            throw new Error('Module ' + id + ' not found.');
        }
        synth.destroyModule(id);
        return this;
    }

    /**
     * Start playing the input frequency.
     * @param {Number} frequency - the frequency value.
     * @return {ElectroPhone}
     */
    play (frequency) {
        if (+frequency >= 0) {
            synth.play(frequency);
            this.isPlaying = true;
        }
        return this;
    }

    /**
     * Stop playing the input frequency.
     * @param {Number} frequency - the frequency value.
     * @return {ElectroPhone}
     */
    stop (frequency) {
        if (+frequency >= 0) {
            synth.stop(frequency);
            this.isPlaying = false;
        }
        return this;
    }

    /**
     * Link two modules, connect source module to target module.
     * @param {String} source - the source module id.
     * @param {String} target - the target module id.
     * @return {ElectroPhone}
     * @throws {Error} throw error when source is master.
     * @throws {Error} throw error when source module is not found.
     * @throws {Error} throw error when target module is not found.
     */
    link (source, target) {
        if (source === CONST.MASTER) {
            throw new Error('Module master can\'t be linked to any modules.');
        }
        if (!synth.modulesConfig[source]) {
            throw new Error('Source module ' + source + ' not found.');
        }

        if (!synth.modulesConfig[target]) {
            throw new Error('Target module ' + target + ' not found.');
        }
        synth.modulesConfig[source].props.link = target;
        return this;
    }

    /**
     * Get module properties by type.
     * @param {String} moduleType - module='' type, taken from ElectroPhone.TYPES.
     * @return {Array}
     */
    static getModuleProperties (moduleType = '') {
        const moduleProps = Props[moduleType + 'Props'] || {};

        return [
            ...Object.keys(moduleProps).map(prop => ({ ...moduleProps[prop], name: prop })),
            ...Object.keys(Props.DefaultProps).map(prop => ({ ...Props.DefaultProps[prop], name: prop }))
        ];
    }

    /**
     * Describe all ElectroPhone modules with parameters configuration.
     * @return {Array}
     */
    static describeModules () {
        return [...methods]
            .filter(e => e !== '__esModule')
            .reduce((result, e) => {
                return [
                    ...result,
                    {
                        type: e,
                        properties: ElectroPhone.getModuleProperties(e)
                    }
                ];
            }, []);
    }

    /**
     * Get frequency float value calculated from given note and octave.
     * @param {String} note - note char indicator. sharp char for semi-tones.
     * @param {Number} octave - octave number.
     * @return {Number}
     */
    static getFrequency (note, octave) {
        const
            octaveD = parseInt(octave, 10) - 4,
            noteD = notes.indexOf(note) - notes.indexOf('A'),
            delta = 12 * octaveD,
            exp = (noteD + delta),
            freq = 440 * Math.pow(1.059463, exp);
        return parseFloat(freq.toFixed(3)) || 0;
    }

    /**
     * Get complete notes list.
     * @return {Array}
     */
    static getNotes () {
        return notes;
    }
}

ElectroPhone.CONST = CONST;
ElectroPhone.TYPES = TYPES;

export default ElectroPhone;
