import WebSynth from '../../../../src/WebSynth'

function WebSynthManager () {
    let synth = new WebSynth(),
        service = {};

    function listModules () {
        return synth.listModules().filter((e) => e.name !== 'Master');
    }

    service.listModules = listModules;

    return service;
}

export default WebSynthManager
