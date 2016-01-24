'use strict';

import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import Synth from './src/Synth';

const methods = Object.keys(Modules);

export default (props) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    let factory = {
            VARS: CONST,
            TYPES: TYPES
        },
        properties = props || {},
        synth = new Synth(properties);

    function callModule (type) {
        return (label, props) => {
            synth.module(type, label, props);
            return factory;
        };
    }

    function init () {
        let fx;
        methods
            .filter(e => e !== TYPES.MASTER)
            .forEach(type => {
                fx = type.toLowerCase();
                factory[fx] = callModule(type);
            });
    }

    function module (type, label, props) {
        synth.module(type, label, props);
        return factory;
    }

    function master (level) {
        if (+level >= 0) {
            synth.module(TYPES.MASTER, CONST.MASTER, {
                level: level
            });
        }
    }

    function adsr (props) {
        synth.module(TYPES.ENVELOPE, CONST.ADSR, props);
    }

    function destroyModule (id) {
        //TODO check on deletion of voices...you can remove sounds runtime
        delete synth.modulesConfig[id];
        return factory;
    }

    function linkModules (source, target) {
        if (source === CONST.MASTER) {
            throw new Error('ERROR :: master can\'t be linked to any modules');
        }

        if (synth.modulesConfig[source] && synth.modulesConfig[target]) {
            synth.modulesConfig[source].props.link = target;
        }
        return factory;
    }

    function listAllModules () {
        return methods;
    }

    function listModules () {
        return synth.modulesConfig;
    }

    function getModulePropertiesSet (type) {
        const p = Props[type + 'Props'] || {};
        return Object.assign({}, p, Props.DefaultProps);
    }

    function play (note) {
        synth.play(note);
    }

    function stop (note) {
        synth.stop(note);
    }

    function getFrequency (note, octave) {
        const octaveD = parseInt(octave, 10) - 4,
            noteD = notes.indexOf(note) - notes.indexOf('A'),
            delta = 12 * octaveD,
            exp = (noteD + delta),
            freq = 440 * Math.pow(1.059463, exp);
        return parseFloat(freq.toFixed(3));
    }

    init();

    factory.module = module;
    factory.master = master;
    factory.adsr = adsr;
    factory.destroyModule = destroyModule;
    factory.linkModules = linkModules;

    factory.listAllModules = listAllModules;
    factory.listModules = listModules;
    factory.getModulePropertiesSet = getModulePropertiesSet;

    factory.play = play;
    factory.stop = stop;

    factory.getFrequency = getFrequency;

    return factory;
};
