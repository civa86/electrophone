/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _DecoratedSynth = __webpack_require__(4);

	var _DecoratedSynth2 = _interopRequireDefault(_DecoratedSynth);

	var win = window || {};

	win.WebSynth = _DecoratedSynth2['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var AudioCtx = window.AudioContext || window.webkitAudioContext,
	    ctx = new AudioCtx(),
	    deprecatedFn = {
	    createGainNode: 'createGain',
	    createDelayNode: 'createDelay'
	};

	for (var f in deprecatedFn) {
	    if (typeof ctx[f] === 'function') {
	        ctx[deprecatedFn[f]] = ctx[f];
	    }
	}

	exports['default'] = ctx;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	var _modules = __webpack_require__(3);

	var Modules = _interopRequireWildcard(_modules);

	var moduleTypes = {},
	    methods = Object.keys(Modules),
	    key = undefined;

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
	    for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var type = _step.value;

	        key = type.toUpperCase();
	        moduleTypes[key] = type;
	    }
	} catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	} finally {
	    try {
	        if (!_iteratorNormalCompletion && _iterator['return']) {
	            _iterator['return']();
	        }
	    } finally {
	        if (_didIteratorError) {
	            throw _iteratorError;
	        }
	    }
	}

	var TYPES = moduleTypes;
	exports.TYPES = TYPES;
	var CONST = {
	    MASTER: 'master',

	    NOISE_WHITE: 'white',
	    NOISE_PINK: 'pink',
	    NOISE_BROWN: 'brown',

	    WAVE_SINE: 'sine',
	    WAVE_SQUARE: 'square'
	};
	exports.CONST = CONST;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Oscillator = __webpack_require__(10);

	exports.Oscillator = _interopRequire(_Oscillator);

	var _Noise = __webpack_require__(9);

	exports.Noise = _interopRequire(_Noise);

	var _Filter = __webpack_require__(7);

	exports.Filter = _interopRequire(_Filter);

	var _Master = __webpack_require__(8);

	exports.Master = _interopRequire(_Master);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libModules = __webpack_require__(3);

	var Modules = _interopRequireWildcard(_libModules);

	var _libConstants = __webpack_require__(2);

	var _libSynth = __webpack_require__(5);

	var _libSynth2 = _interopRequireDefault(_libSynth);

	var DecoratedSynth = function DecoratedSynth() {
	    var _this = this;

	    _classCallCheck(this, DecoratedSynth);

	    var synth = new _libSynth2['default'](),
	        methods = Object.keys(Modules),
	        fx = undefined;

	    //Synth Module Creators
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        var _loop = function () {
	            var type = _step.value;

	            fx = type.toLowerCase();
	            _this[fx] = function (label, props) {
	                synth.module(type, label, props);
	                return _this;
	            };
	        };

	        for (var _iterator = methods[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            _loop();
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator['return']) {
	                _iterator['return']();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }

	    this.play = function (note) {
	        return synth.play(note);
	    };
	    this.stop = function (note) {
	        return synth.stop(note);
	    };
	    this.VARS = _libConstants.CONST;
	};

	exports['default'] = DecoratedSynth;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _Constants = __webpack_require__(2);

	var _Voice = __webpack_require__(6);

	var _Voice2 = _interopRequireDefault(_Voice);

	var Synth = (function () {
	    function Synth() {
	        _classCallCheck(this, Synth);

	        this.modules = {};
	        this.voices = {};

	        this.module('Master', _Constants.CONST.MASTER, {
	            level: 1,
	            envelope: {
	                attack: 1,
	                decay: 50,
	                sustain: 100,
	                release: 10
	            }
	        });
	    }

	    _createClass(Synth, [{
	        key: 'module',
	        value: function module(type, label, props) {
	            if (!type || type.constructor !== String) {
	                throw new Error('Synth Module :: missing type');
	            }

	            if (!label || label.constructor !== String) {
	                throw new Error('Synth Module :: missing label');
	            }

	            if (!props || props.constructor !== Object) {
	                throw new Error('Synth Module :: missing properties');
	            }

	            if (!this.modules[label]) {
	                this.addModule(type, label, props);
	            }
	        }
	    }, {
	        key: 'addModule',
	        value: function addModule(type, label, props) {
	            this.modules[label] = {
	                type: type,
	                props: props
	            };
	        }
	    }, {
	        key: 'play',
	        value: function play(note) {
	            if (!this.voices[note]) {
	                this.voices[note] = new _Voice2['default'](note, this.modules);
	                this.voices[note].noteOn();
	            }
	        }
	    }, {
	        key: 'stop',
	        value: function stop(note) {
	            if (this.voices[note]) {
	                this.voices[note].noteOff();
	                this.voices[note] = undefined;
	            }
	        }
	    }]);

	    return Synth;
	})();

	exports['default'] = Synth;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _modules = __webpack_require__(3);

	var Modules = _interopRequireWildcard(_modules);

	var _Constants = __webpack_require__(2);

	var Voice = (function () {
	    function Voice(note, modules) {
	        _classCallCheck(this, Voice);

	        this.note = note;
	        this.modules = modules;
	        this.soundSources = [];
	        this.master = null;

	        this.setupModules();
	        this.linkModules();
	    }

	    _createClass(Voice, [{
	        key: 'setupModules',
	        value: function setupModules() {
	            var m = undefined;

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = Object.keys(this.modules)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var mod = _step.value;

	                    m = this.modules[mod];
	                    if (m.type && m.props) {
	                        m.instance = new Modules[m.type](m.props);
	                        if (m.type === _Constants.TYPES.OSCILLATOR || m.type === _Constants.TYPES.NOISE) {
	                            this.soundSources.push(m.instance);
	                        } else if (m.type === _Constants.TYPES.MASTER) {
	                            this.master = m.instance;
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator['return']) {
	                        _iterator['return']();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'linkModules',
	        value: function linkModules() {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = Object.keys(this.modules)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var mod = _step2.value;

	                    var instance = undefined,
	                        lineout = undefined,
	                        source = undefined,
	                        dest = undefined,
	                        out = undefined;

	                    instance = this.modules[mod].instance;
	                    lineout = instance.lineout;
	                    source = lineout.source;
	                    dest = lineout.dest;

	                    source.disconnect();

	                    if (this.modules[dest]) {
	                        out = this.modules[dest].instance.lineout.source;
	                        source.connect(out);
	                    } else if (mod === _Constants.CONST.MASTER) {
	                        source.connect(instance.gain);
	                        instance.gain.connect(_AudioContext2['default'].destination);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
	                        _iterator2['return']();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'noteOn',
	        value: function noteOn() {
	            this.master.setEnvelope();

	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;

	            try {
	                for (var _iterator3 = this.soundSources[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var source = _step3.value;

	                    source.setNote(this.note);
	                    source.noteOn();
	                }
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
	                        _iterator3['return']();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'noteOff',
	        value: function noteOff() {
	            var release = this.master.releaseEnvelope();

	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.soundSources[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var source = _step4.value;

	                    source.noteOff(release);
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
	                        _iterator4['return']();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	        }
	    }]);

	    return Voice;
	})();

	exports['default'] = Voice;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//Web Audio Context
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var Filter = function Filter(props) {
	    _classCallCheck(this, Filter);

	    this.filter = _AudioContext2['default'].createBiquadFilter();

	    this.filter.type = props.type || 'lowpass';
	    this.filter.frequency.value = props.frequency || 440;

	    this.lineout = {
	        source: this.filter,
	        dest: props.link
	    };
	};

	exports['default'] = Filter;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//Web Audio Context
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var Master = (function () {
	    function Master(props) {
	        _classCallCheck(this, Master);

	        this.gain = _AudioContext2['default'].createGain();
	        this.envelope = _AudioContext2['default'].createGain();
	        this.env = props.envelope || null;

	        this.gain.gain.value = props.level && props.level >= 0 ? props.level : 1;

	        this.lineout = {
	            source: this.envelope
	        };
	    }

	    _createClass(Master, [{
	        key: 'setEnvelope',
	        value: function setEnvelope() {
	            var now = _AudioContext2['default'].currentTime,
	                envAttackEnd = undefined;

	            this.envelope.gain.value = 0.0;

	            if (this.env) {
	                envAttackEnd = now + this.env.attack / 20.0;
	                this.envelope.gain.setValueAtTime(0.0, now);
	                this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
	                this.envelope.gain.setTargetAtTime(this.env.sustain / 100.0, envAttackEnd, this.env.decay / 100.0 + 0.001);
	            } else {
	                this.envelope.gain.setValueAtTime(0.0, now);
	                this.envelope.gain.linearRampToValueAtTime(1.0, now + 0.02);
	                this.envelope.gain.setTargetAtTime(1, now + 0.02, 0 + 0.001);
	                this.envelope.gain.value = 1;
	            }
	        }
	    }, {
	        key: 'releaseEnvelope',
	        value: function releaseEnvelope() {
	            var now = _AudioContext2['default'].currentTime,
	                release = undefined;
	            if (this.env) {
	                this.envelope.gain.cancelScheduledValues(now);
	                this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
	                this.envelope.gain.setTargetAtTime(0.0, now, this.env.release / 100);
	                release = now + this.env.release / 10.0;
	            } else {
	                this.envelope.gain.cancelScheduledValues(now);
	                this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
	                this.envelope.gain.setTargetAtTime(0.0, now, 0.05);
	                release = now + 0.2;
	            }

	            return release;
	        }
	    }]);

	    return Master;
	})();

	exports['default'] = Master;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//Web Audio Context
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var Noise = (function () {
	    function Noise(props) {
	        _classCallCheck(this, Noise);

	        this.gain = _AudioContext2['default'].createGain();

	        this.noise = _AudioContext2['default'].createBufferSource();
	        this.noise.connect(this.gain);

	        this.gain.gain.value = props.level >= 0 ? props.level : 1;

	        this.color = props.color || 'white';

	        this.lineout = {
	            source: this.gain,
	            dest: props.link
	        };

	        this.setColor();
	    }

	    _createClass(Noise, [{
	        key: 'setColor',
	        value: function setColor() {
	            switch (this.color) {
	                case 'white':
	                    this.noise.buffer = this.white();
	                    break;
	                case 'pink':
	                    this.noise.buffer = this.pink();
	                    break;
	                case 'brown':
	                    this.noise.buffer = this.brown();
	                    break;
	                default:
	                    throw new Error('Invalid Noise color: ' + this.color);
	            }
	        }
	    }, {
	        key: 'white',
	        value: function white() {
	            var noiseBuffer = this.getNoiseBuffer(),
	                bufferSize = this.getBufferSize(),
	                output = noiseBuffer.getChannelData(0);

	            for (var i = 0; i < bufferSize; i++) {
	                output[i] = Math.random() * 2 - 1;
	            }

	            return noiseBuffer;
	        }
	    }, {
	        key: 'pink',
	        value: function pink() {
	            var b0 = undefined,
	                b1 = undefined,
	                b2 = undefined,
	                b3 = undefined,
	                b4 = undefined,
	                b5 = undefined,
	                b6 = undefined,
	                noiseBuffer = this.getNoiseBuffer(),
	                bufferSize = this.getBufferSize(),
	                output = noiseBuffer.getChannelData(0),
	                white = undefined;

	            b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;

	            for (var i = 0; i < bufferSize; i++) {
	                white = Math.random() * 2 - 1;

	                b0 = 0.99886 * b0 + white * 0.0555179;
	                b1 = 0.99332 * b1 + white * 0.0750759;
	                b2 = 0.96900 * b2 + white * 0.1538520;
	                b3 = 0.86650 * b3 + white * 0.3104856;
	                b4 = 0.55000 * b4 + white * 0.5329522;
	                b5 = -0.7616 * b5 - white * 0.0168980;

	                output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
	                output[i] *= 0.11;
	                b6 = white * 0.115926;
	            }

	            return noiseBuffer;
	        }
	    }, {
	        key: 'brown',
	        value: function brown() {
	            var noiseBuffer = this.getNoiseBuffer(),
	                bufferSize = this.getBufferSize(),
	                output = noiseBuffer.getChannelData(0),
	                lastOut = 0.0,
	                white = undefined;

	            for (var i = 0; i < bufferSize; i++) {
	                white = white = Math.random() * 2 - 1;

	                output[i] = (lastOut + 0.02 * white) / 1.02;
	                lastOut = output[i];
	                output[i] *= 3.5;
	            }

	            return noiseBuffer;
	        }
	    }, {
	        key: 'setNote',
	        value: function setNote() {
	            this.noise.loop = true;
	        }
	    }, {
	        key: 'getBufferSize',
	        value: function getBufferSize() {
	            return 2 * _AudioContext2['default'].sampleRate;
	        }
	    }, {
	        key: 'getNoiseBuffer',
	        value: function getNoiseBuffer() {
	            var bufferSize = this.getBufferSize(),
	                noiseBuffer = _AudioContext2['default'].createBuffer(1, bufferSize, _AudioContext2['default'].sampleRate);
	            return noiseBuffer;
	        }
	    }, {
	        key: 'noteOn',
	        value: function noteOn() {
	            this.noise.start(0);
	        }
	    }, {
	        key: 'noteOff',
	        value: function noteOff(release) {
	            this.noise.stop(release);
	        }
	    }]);

	    return Noise;
	})();

	exports['default'] = Noise;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//Web Audio Context
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var Oscillator = (function () {
	    function Oscillator(props) {
	        _classCallCheck(this, Oscillator);

	        this.osc = _AudioContext2['default'].createOscillator();
	        this.gain = _AudioContext2['default'].createGain();

	        this.osc.type = props.type || 'sine';
	        this.osc.detune.value = props.detune || 0;
	        this.osc.connect(this.gain);

	        this.gain.gain.value = props.level >= 0 ? props.level : 1;

	        this.lineout = {
	            source: this.gain,
	            dest: props.link
	        };
	    }

	    _createClass(Oscillator, [{
	        key: 'setNote',
	        value: function setNote(note) {
	            this.osc.frequency.value = note;
	        }
	    }, {
	        key: 'noteOn',
	        value: function noteOn() {
	            this.osc.start(0);
	        }
	    }, {
	        key: 'noteOff',
	        value: function noteOff(release) {
	            this.osc.stop(release);
	        }
	    }]);

	    return Oscillator;
	})();

	exports['default'] = Oscillator;
	module.exports = exports['default'];

/***/ }
/******/ ]);