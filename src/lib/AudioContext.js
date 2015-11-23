let AudioCtx = window.AudioContext || window.webkitAudioContext,
    deprecatedFn = {
        createGainNode: 'createGain',
        createDelayNode: 'createDelay',
        noteOn: 'start',
        noteOff: 'stop'
    };

for (let f in deprecatedFn) {
    if (typeof AudioCtx[f] === 'function') {
        AudioCtx[deprecatedFn[f]] = AudioCtx[f];
    }
}

export default new AudioCtx();
