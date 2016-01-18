'use strict';

//ES6 BABEL POLYFILL
import 'babel-polyfill';

import WebSynth from './WebSynth';

const win = window || {};

win.WebSynth = WebSynth;

