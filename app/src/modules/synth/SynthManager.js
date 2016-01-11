'use strict';

import WebSynth from '../../../../src/WebSynth';

function SynthManager () {
    let synth = new WebSynth(),
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
        //TODO implement
        if (module.type && module.type !== synth.TYPES.MASTER) {
            console.log('SYNTH::create module...', module);
        }
    }

    function updateModule (module) {
        console.log('SYNTH::update module...', module);
    }

    function getModuleProperties (type) {
        let allModules = listAllModules(),
            filtered = allModules.filter((e) => e.type === type),
            tmp = null,
            ret = {};

        if (filtered && filtered.length === 1) {
            tmp = JSON.parse(JSON.stringify(filtered[0]));
            delete tmp.props.link;
            Object.keys(tmp.props).forEach((e) => tmp.props[e].currentValue = tmp.props[e].defaultValue);
            ret = tmp.props;
        }

        return ret;
    }

    service.listAllModules = listAllModules;
    service.listModules = listModules;
    service.createModule = createModule;
    service.updateModule = updateModule;
    service.getModuleProperties = getModuleProperties;

    return service;
}

export default SynthManager;
