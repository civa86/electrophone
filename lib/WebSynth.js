import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import Synth from './src/Synth';

const
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    methods = Object.keys(Modules);

/**
 * WebSynth Library
 * @example
 * const AudioCtx = window.AudioContext || window.webkitAudioContext;
 * const synth = new WebSynth(new AudioCtx(), { spectrum: false });
 */
class WebSynth {
    /**
     * Create a playable synthesizer instance
     * @param {AudioContext} audioContext - Web Audio Context instance
     * @param {WebSynthProperties} [properties] - synth properties
     */
    constructor (audioContext, props) {
        const properties = props || {};
        this.synth = new Synth(audioContext, properties);
    }

    /**
     * Create a new synth module
     * @param {string} id - the module identifier
     * @param {string} type - the type of module
     * @param {object} props - module properties
     */
    create (id, type, props) {
        //TODO check if already created....
        this.synth.module(type, id, props);
        return this;
    }

    /**
     * Update a synth module
     * @param {string} id - the module identifier
     * @param {object} props - module properties
     */
    update (id, props) {
        const currentModule = this.getModules()[id];
        if (currentModule) {
            this.synth.module(currentModule.type, id, props);
        } else {
            //TODO creation?? error??
        }

        return this;
    }

    /**
     * Update the MASTER module
     * @param {object} props - MASTER properties
     */
    master (props) {
        this.synth.module(TYPES.MASTER, CONST.MASTER, props);
        return this;
    }

    /**
     * Update the ADSR module
     * @param {object} props - ADSR (Envelope) properties
     */
    adsr (props) {
        this.synth.module(TYPES.ENVELOPE, CONST.ADSR, props);
        return this;
    }

    /**
     * Start playing the input frequency
     * @param {number} frequency=0 - the number of frequency
     */
    play (frequency = 0) {
        this.synth.play(frequency);
    }

    /**
     * Stop playing the input frequency
     * @param {number} frequency=0 - the number of frequency
     */
    stop (frequency = 0) {
        this.synth.stop(frequency);
    }

    /**
     * Returns current synth modules
     * @returns {{}}
     */
    getModules () {
        return {
            ...this.synth.modulesConfig
        };
    }

    linkModules (source, target) {
        if (source === CONST.MASTER) {
            throw new Error('ERROR :: master can\'t be linked to any modules');
        }

        if (this.synth.modulesConfig[source] && this.synth.modulesConfig[target]) {
            this.synth.modulesConfig[source].props.link = target;
        }
        return this;
    }

    static getModuleProperties (moduleType) {
        const moduleProps = Props[moduleType + 'Props'] || {};

        return [
            ...Object.keys(moduleProps).map(prop => ({ name: prop, ...moduleProps[prop]})),
            ...Object.keys(Props.DefaultProps).map(prop => ({ name: prop, ...Props.DefaultProps[prop]}))
        ];
    }

    static describeModules () {
        return [...methods]
            .filter(e => e !== '__esModule')
            .reduce((result, e) => {
                return [
                    ...result,
                    {
                        type: e,
                        properties: WebSynth.getModuleProperties(e)
                    }
                ];
            }, []);
    }

    static getFrequency (note, octave) {
        const
            octaveD = parseInt(octave, 10) - 4,
            noteD = notes.indexOf(note) - notes.indexOf('A'),
            delta = 12 * octaveD,
            exp = (noteD + delta),
            freq = 440 * Math.pow(1.059463, exp);
        return parseFloat(freq.toFixed(3));
    }
}

WebSynth.CONST = CONST;
WebSynth.TYPES = TYPES;

export default WebSynth;

//export default (props) => {
//    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
//
//    let factory = {
//            VARS: CONST,
//            TYPES: TYPES
//        },
//        properties = props || {},
//        synth = new Synth(properties);
//
//    function callModule (type) {
//        return (label, props) => {
//            synth.module(type, label, props);
//            return factory;
//        };
//    }
//
//    function init () {
//        let fx;
//        methods
//            .filter(e => e !== TYPES.MASTER)
//            .forEach(type => {
//                fx = type.toLowerCase();
//                factory[fx] = callModule(type);
//            });
//    }
//
//    function module (type, label, props) {
//        synth.module(type, label, props);
//        return factory;
//    }
//
//    function master (level) {
//        if (+level >= 0) {
//            synth.module(TYPES.MASTER, CONST.MASTER, {
//                level: level
//            });
//        }
//    }
//
//    function adsr (props) {
//        synth.module(TYPES.ENVELOPE, CONST.ADSR, props);
//    }
//
//    function destroyModule (id) {
//        //TODO check on deletion of voices...you can remove sounds runtime
//        //TODO run deletion on synth....
//        delete synth.modulesConfig[id];
//        return factory;
//    }
//
//    function linkModules (source, target) {
//        if (source === CONST.MASTER) {
//            throw new Error('ERROR :: master can\'t be linked to any modules');
//        }
//
//        if (synth.modulesConfig[source] && synth.modulesConfig[target]) {
//            synth.modulesConfig[source].props.link = target;
//        }
//        return factory;
//    }
//
//    function listAllModules () {
//        return methods;
//    }
//
//    function listModules () {
//        return synth.modulesConfig;
//    }
//
//    function getModulePropertiesSet (type) {
//        const p = Props[type + 'Props'] || {};
//        return _.assign({}, p, Props.DefaultProps);
//    }
//
//    function play (note) {
//        synth.play(note);
//    }
//
//    function stop (note) {
//        synth.stop(note);
//    }
//
//    function getFrequency (note, octave) {
//        const octaveD = parseInt(octave, 10) - 4,
//            noteD = notes.indexOf(note) - notes.indexOf('A'),
//            delta = 12 * octaveD,
//            exp = (noteD + delta),
//            freq = 440 * Math.pow(1.059463, exp);
//        return parseFloat(freq.toFixed(3));
//    }
//
//    init();
//
//    factory.module = module;
//    factory.master = master;
//    factory.adsr = adsr;
//    factory.destroyModule = destroyModule;
//    factory.linkModules = linkModules;
//
//    factory.listAllModules = listAllModules;
//    factory.listModules = listModules;
//    factory.getModulePropertiesSet = getModulePropertiesSet;
//
//    factory.play = play;
//    factory.stop = stop;
//
//    factory.getFrequency = getFrequency;
//
//    return factory;
//};
