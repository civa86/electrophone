'use strict';

import * as Modules from './src/modules';
import * as Props from './src/properties';
import { CONST, TYPES } from './src/core/Constants';
import Synth from './src/Synth';

const methods = Object.keys(Modules);

export default (props) => {
    let factory = {
            VARS: CONST,
            TYPES: TYPES
        },
        properties = props || {},
        synth = new Synth(properties),
        fx;

    function callModule (type) {
        return (label, props) => {
            synth.module(type, label, props);
            return factory;
        };
    }

    function init () {
        methods.forEach((type) => {
            const fx = type.toLowerCase();
            factory[fx] = callModule(type);
        });
    }

    //TODO create an adsr method to manage the adsr params...

    //TODO creae a master level volume method..

    function module (type, label, props) {
        synth.module(type, label, props);
        return factory;
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

    init();

    factory.module = module;
    factory.destroyModule = destroyModule;
    factory.linkModules = linkModules;

    factory.listAllModules = listAllModules;
    factory.listModules = listModules;
    factory.getModulePropertiesSet = getModulePropertiesSet;

    factory.play = play;
    factory.stop = stop;

    return factory;
};
