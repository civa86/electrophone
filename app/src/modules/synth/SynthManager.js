import WebSynth from '../../../../src/WebSynth'

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

    function createModule (type) {
        //TODO implement
        console.log('create synth module...', type)
    }

    function getModuleProperties (type) {
        let allModules = listAllModules(),
            ret,
            additionalProps = null;

        ret = allModules
            .filter((e) => e.type === type)
            .map((e) => {
                let tmp = angular.copy(e.props);
                delete tmp.link;
                return tmp;
            })
            .pop();

        if (type === synth.TYPES.MASTER) {
            additionalProps = allModules
                .filter((e) => e.type === synth.TYPES.ENVELOPE)
                .map((e) => {
                    let tmp = angular.copy(e.props);
                    delete tmp.link;
                    delete tmp.target;
                    delete tmp.level;
                    return tmp;
                })
                .pop();

            ret = Object.assign(additionalProps, ret);
        }

        return ret;
    }

    service.listAllModules = listAllModules;
    service.listModules = listModules;
    service.createModule = createModule;
    service.getModuleProperties = getModuleProperties;

    return service;
}

export default SynthManager
