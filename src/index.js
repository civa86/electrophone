//Inspiration https://github.com/rserota/wad/blob/master/src/wad.js
//Libs
import Synth from './lib/Synth'

const win = window || {};

win.WebSynth = Synth.publish(new Synth());

