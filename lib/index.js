import 'stereo-panner-shim';
import WebSynth from './WebSynth';

const win = window || {};
win.WebSynth = WebSynth;

export default WebSynth;

