'use strict';

import WebSynth from '../../../../lib/WebSynth';

function SynthManager () {
    let synth = new WebSynth(),
        octave = 4,
        service = {};

    function listAllModules (withoutMaster) {
        let ret = synth.listAllModules();
        if (withoutMaster === true) {
            ret = ret.filter((e) => e.type !== synth.TYPES.MASTER);
        }
        return ret;
    }

    function listModules () {
        return synth.listModules();
    }

    function createModule (module) {
        var props = {};
        if (module.type && module.type !== synth.TYPES.MASTER) {
            Object.keys(module.props).forEach(e => props[e] = module.props[e].currentValue);
            props.link = null;
            synth.module(module.type, module.id, props);
        }
    }

    function updateModule (module) {
        console.log('SYNTH::update module...', module);
    }

    function linkModules (source, target) {
        synth.linkModules(source, target);
    }

    function getModuleDefaultProperties (type) {
        let moduleProps = _.cloneDeep(synth.getModulePropertiesSet(type));
        delete moduleProps.link;
        _.mapValues(moduleProps, e => {
            e.currentValue = e.defaultValue;
            return e;
        });
        return moduleProps;
    }

    function play (note) {
        //TODO calculate freq
        let freq = 440;
        synth.play(freq);
    }

    function stop (note) {
        //TODO calculate freq
        let freq = 440;
        synth.stop(freq);
    }

    service.listAllModules = listAllModules;
    service.listModules = listModules;
    service.createModule = createModule;
    service.updateModule = updateModule;
    service.linkModules = linkModules;
    service.getModuleDefaultProperties = getModuleDefaultProperties;
    service.play = play;
    service.stop = stop;

    return service;
}

export default SynthManager;
