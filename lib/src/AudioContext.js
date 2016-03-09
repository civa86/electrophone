'use strict';
//TODO remove window and audio context depedency!!
let AudioCtx = window.AudioContext || window.webkitAudioContext,
    ctx = new AudioCtx(),
    deprecatedFn = {
        createGainNode: 'createGain',
        createDelayNode: 'createDelay'
    };

for (let f in deprecatedFn) {
    if (typeof ctx[f] === 'function') {
        ctx[deprecatedFn[f]] = ctx[f];
    }
}

export default ctx;
