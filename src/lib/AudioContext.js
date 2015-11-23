let ctx = window.AudioContext || window.webkitAudioContext;

let deprecatedFn = {
    createGainNode: 'createGain',
    createDelayNode: 'createDelay',
    noteOn: 'start',
    noteOff: 'stop'
};

for (let f in deprecatedFn) {
    if (typeof ctx[f] === 'function') {
        ctx[deprecatedFn[f]] = ctx[f];
    }
}

export default new ctx();
