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
        let allModules = listAllModules();

        //TODO manage master and adsr in the same module
        return allModules
            .filter((e) => e.type === type)
            .map((e) => {
                let tmp = e.props;
                delete tmp.link;
                return tmp;
            })
            .pop();
    }

    service.listAllModules = listAllModules;
    service.listModules = listModules;
    service.createModule = createModule;
    service.getModuleProperties = getModuleProperties;

    return service;
}

export default SynthManager
