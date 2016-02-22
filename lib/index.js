//TODO remove lodash and use spread object operator....
import 'stereo-panner-shim';
import WebSynth from './WebSynth';

const win = window || {};

win.WebSynth = WebSynth;

