import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import TypeDef from './TypeDefinition';
import Synth from './src/Synth';

const
    notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    methods = Object.keys(Modules);

/**
 * WebSynth Library
 * @example
 * const synth = new WebSynth();
 */
class WebSynth {
    /**
     * Create a playable synthesizer instance
     * @param {WebSynthProperties} [properties]
     */
    constructor (props) {
        const properties = props || {};
        this.synth = new Synth(properties);
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

    getModules () {
        return {
            ...this.synth.modulesConfig
        };
    }

    static describeModules () {
        return [...methods]
            .filter(e => e !== '__esModule')
            .reduce((result, e) => {
                const moduleProps = Props[e + 'Props'] || {};
                return [
                    ...result,
                    {
                        name: e,
                        properties: {
                            ...moduleProps,
                            ...Props.DefaultProps
                        }
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
