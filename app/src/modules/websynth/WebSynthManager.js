import WebSynth from '../../../../src/WebSynth'

function WebSynthManager () {
    let synth = new WebSynth(),
        service = {};

    function getSynth () {
        return synth;
    }

    service.getSynth = getSynth;

    return service;
}

export default WebSynthManager
