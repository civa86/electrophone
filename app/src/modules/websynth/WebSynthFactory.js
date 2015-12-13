import WebSynth from '../../../../src/WebSynth'

function WebSynthFactory () {
    let synth = new WebSynth(),
        service = {};

    function getSynth () {
        return synth;
    }

    service.getSynth = getSynth;

    return service;
}

export default WebSynthFactory
