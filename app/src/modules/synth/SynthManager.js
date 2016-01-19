'use strict';

import WebSynth from '../../../../lib/WebSynth';

function SynthManager () {
    let synth = new WebSynth(),
        octave = 4,
        service = {};

    function getModulePropsMapping (module, propName) {
        let ret = {};
        const modulePropsMapping = {
            master: {
                attack: synth.VARS.ADSR,
                decay: synth.VARS.ADSR,
                sustain: synth.VARS.ADSR,
                release: synth.VARS.ADSR
            }
        };

        if (module && module.type) {
            ret.id = (modulePropsMapping[module.id] && modulePropsMapping[module.id][propName]) ?
                modulePropsMapping[module.id][propName] : module.id;

            ret.type = (ret.id === synth.VARS.ADSR) ? synth.TYPES.ENVELOPE : module.type;
        }

        return ret;
    }

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
        let props = {};
        if (module && module.type && module.type !== synth.TYPES.MASTER) {
            Object.keys(module.props).forEach(e => props[e] = module.props[e].currentValue);
            props.link = null;
            synth.module(module.type, module.id, props);
        }
    }

    function destroyModule (id) {
        synth.destroyModule(id);
    }

    function updateModule (module, params) {
        const prop = {
            [params.prop]: params.value
        };
        let synthModule = getModulePropsMapping(module, params.prop);

        synth.module(synthModule.type, synthModule.id, prop);
    }

    function linkModules (source, target) {
        synth.linkModules(source, target);
    }

    function getMasterProperties () {
        let moduleProps;
        moduleProps = _.cloneDeep(synth.getModulePropertiesSet(synth.TYPES.ENVELOPE));
        delete moduleProps.target;
        return moduleProps;
    }

    function getModuleProperties (type) {
        let moduleProps;
        moduleProps = _.cloneDeep(synth.getModulePropertiesSet(type));
        return moduleProps;
    }

    function getModuleDefaultProperties (type) {
        let moduleProps;

        if (type === synth.TYPES.MASTER) {
            moduleProps = getMasterProperties();
        } else {
            moduleProps = getModuleProperties(type);
        }

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
    service.destroyModule = destroyModule;
    service.updateModule = updateModule;
    service.linkModules = linkModules;
    service.getModuleDefaultProperties = getModuleDefaultProperties;
    service.getMasterType = () => synth.TYPES.MASTER;
    service.play = play;
    service.stop = stop;

    return service;
}

export default SynthManager;
