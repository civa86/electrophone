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

	var _WebSynth = __webpack_require__(6);

	var _WebSynth2 = _interopRequireDefault(_WebSynth);

	var win = window || {};

	win.WebSynth = _WebSynth2['default'];

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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var TYPES = {
	    MASTER: 'Master',
	    OSCILLATOR: 'Oscillator',
	    MODULATOR: 'Modulator',
	    FILTER: 'Filter',
	    NOISE: 'Noise',
	    REVERB: 'Reverb',
	    CHORUS: 'Chorus',
	    DELAY: 'Delay',
	    ENVELOPE: 'Envelope'
	};

	exports.TYPES = TYPES;
	var CONST = {
	    MASTER: 'master',
	    ADSR: 'adsr',

	    NOISE_WHITE: 'white',
	    NOISE_PINK: 'pink',
	    NOISE_BROWN: 'brown',

	    WAVE_SINE: 'sine',
	    WAVE_SQUARE: 'square',
	    WAVE_SAWTOOTH: 'sawtooth',
	    WAVE_TRIANLGE: 'triangle',
	    WAVE_CUSTOM: 'custom',

	    FILTER_LOWPASS: 'lowpass',
	    FILTER_HIGHPASS: 'highpass',
	    FILTER_BANDPASS: 'bandpass',
	    FILTER_LOWSHELF: 'lowshelf',
	    FILTER_HIGHSHELF: 'highshelf',
	    FILTER_PEAKING: 'peaking',
	    FILTER_NOTCH: 'notch',
	    FILTER_ALLPASS: 'allpass'
	};
	exports.CONST = CONST;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var SoundSource = (function (_Module) {
	    _inherits(SoundSource, _Module);

	    function SoundSource(props) {
	        _classCallCheck(this, SoundSource);

	        _get(Object.getPrototypeOf(SoundSource.prototype), 'constructor', this).call(this, props);
	    }

	    _createClass(SoundSource, [{
	        key: 'noteOn',
	        value: function noteOn() {
	            this.main.start(0);
	        }
	    }, {
	        key: 'noteOff',
	        value: function noteOff(release) {
	            this.main.stop(release);
	        }
	    }]);

	    return SoundSource;
	})(_coreModule2['default']);

	exports['default'] = SoundSource;
	module.exports = exports['default'];

/***/ },
/* 4 */
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

	var Module = (function () {
	    function Module(props) {
	        _classCallCheck(this, Module);

	        this.gain = null;
	        this.link = props.link || null;
	        this.level = +props.level;

	        this.createGain(this.level);
	    }

	    _createClass(Module, [{
	        key: 'createGain',
	        value: function createGain(level) {
	            var l = level >= 0 ? level % 101 : 100;
	            this.gain = _AudioContext2['default'].createGain();
	            this.gain.gain.value = l / 100;
	        }
	    }, {
	        key: 'disconnect',
	        value: function disconnect() {
	            this.gain.disconnect();
	        }
	    }, {
	        key: 'getLineIn',
	        value: function getLineIn() {
	            return this.main;
	        }
	    }, {
	        key: 'getLineOut',
	        value: function getLineOut() {
	            return this.gain;
	        }
	    }]);

	    return Module;
	})();

	exports['default'] = Module;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Oscillator = __webpack_require__(13);

	exports.Oscillator = _interopRequire(_Oscillator);

	var _Modulator = __webpack_require__(11);

	exports.Modulator = _interopRequire(_Modulator);

	var _Noise = __webpack_require__(12);

	exports.Noise = _interopRequire(_Noise);

	var _Filter = __webpack_require__(9);

	exports.Filter = _interopRequire(_Filter);

	var _Envelope = __webpack_require__(14);

	exports.Envelope = _interopRequire(_Envelope);

	var _Master = __webpack_require__(10);

	exports.Master = _interopRequire(_Master);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libModules = __webpack_require__(5);

	var Modules = _interopRequireWildcard(_libModules);

	var _libCoreConstants = __webpack_require__(2);

	var _libSynth = __webpack_require__(7);

	var _libSynth2 = _interopRequireDefault(_libSynth);

	var WebSynth = function WebSynth() {
	    var _this = this;

	    _classCallCheck(this, WebSynth);

	    var synth = new _libSynth2['default'](),
	        methods = Object.keys(Modules),
	        fx = undefined;

	    this.VARS = _libCoreConstants.CONST;

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
	};

	exports['default'] = WebSynth;
	module.exports = exports['default'];

/***/ },
/* 7 */
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

	var _coreConstants = __webpack_require__(2);

	var _coreVoice = __webpack_require__(8);

	var _coreVoice2 = _interopRequireDefault(_coreVoice);

	var Synth = (function () {
	    function Synth() {
	        _classCallCheck(this, Synth);

	        this.modulesConfig = {};
	        this.voices = {};

	        this.module('Master', _coreConstants.CONST.MASTER, {
	            level: 100
	        });

	        //TODO put default value as if no envelope....copy from master commetend fallback cases
	        //TODO let update values from props....
	        this.module('Envelope', _coreConstants.CONST.ADSR, {
	            link: _coreConstants.CONST.MASTER,
	            target: 'gain',
	            level: 100,
	            attack: 10,
	            decay: 1,
	            sustain: 100,
	            release: 10
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

	            if (!this.modulesConfig[label]) {
	                this.addModule(type, label, props);
	            }
	        }
	    }, {
	        key: 'addModule',
	        value: function addModule(type, label, props) {
	            this.modulesConfig[label] = {
	                type: type,
	                props: props
	            };
	        }
	    }, {
	        key: 'play',
	        value: function play(note) {
	            if (!this.voices[note]) {
	                this.voices[note] = new _coreVoice2['default'](note, this.modulesConfig);
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
/* 8 */
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

	var _modules = __webpack_require__(5);

	var Modules = _interopRequireWildcard(_modules);

	var _SoundSource = __webpack_require__(3);

	var _SoundSource2 = _interopRequireDefault(_SoundSource);

	var _Constants = __webpack_require__(2);

	var Voice = (function () {
	    function Voice(note, modulesConfig) {
	        _classCallCheck(this, Voice);

	        this.note = note;
	        this.modulesConfig = modulesConfig;
	        this.modules = {};
	        this.soundSources = [];
	        this.master = null;

	        this.setupModules();
	        this.linkModules();
	    }

	    _createClass(Voice, [{
	        key: 'setupModules',
	        value: function setupModules() {
	            var _this = this;

	            var modConf = undefined,
	                m = undefined;

	            Object.keys(this.modulesConfig).forEach(function (mod) {
	                modConf = _this.modulesConfig[mod];
	                if (modConf.type && modConf.props) {
	                    m = new Modules[modConf.type](modConf.props);
	                    _this.modules[mod] = {
	                        type: modConf.type,
	                        instance: m
	                    };

	                    if (m.instance instanceof _SoundSource2['default']) {
	                        _this.soundSources.push(m);
	                    } else if (modConf.type === _Constants.TYPES.MASTER) {
	                        _this.master = m;
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'linkModules',
	        value: function linkModules() {
	            var _this2 = this;

	            Object.keys(this.modules).forEach(function (mod) {
	                var currentModule = _this2.modules[mod].instance,
	                    currentModuleType = _this2.modules[mod].type,
	                    destinationModule = undefined,
	                    source = undefined,
	                    dest = undefined;

	                if (currentModule.link) {
	                    destinationModule = _this2.modules[currentModule.link];
	                    if (destinationModule && destinationModule.instance) {
	                        source = currentModule.getLineOut();
	                        dest = destinationModule.instance.getLineIn(currentModuleType);
	                        //console.log(mod, source, currentModule.link, dest);
	                        if (source && dest) {
	                            source.connect(dest);
	                        }
	                    }
	                }
	            });

	            this.master.lineOut();
	        }
	    }, {
	        key: 'noteOn',
	        value: function noteOn() {
	            var _this3 = this;

	            var m = undefined,
	                dest = undefined;

	            Object.keys(this.modules).forEach(function (e) {
	                m = _this3.modules[e].instance;

	                if (typeof m.setEnvelope === 'function') {
	                    dest = _this3.modules[m.link] ? _this3.modules[m.link].instance : null;
	                    m.setEnvelope(dest);
	                }
	                if (typeof m.setNote === 'function') {
	                    m.setNote(+_this3.note);
	                }
	            });
	            Object.keys(this.modules).forEach(function (e) {
	                m = _this3.modules[e].instance;
	                if (typeof m.noteOn === 'function') {
	                    m.noteOn();
	                }
	            });
	        }
	    }, {
	        key: 'noteOff',
	        value: function noteOff() {
	            var _this4 = this;

	            var release = 0,
	                adsr = this.modules.adsr.instance,
	                m = undefined,
	                dest = undefined;

	            release = adsr.getReleaseTime();

	            Object.keys(this.modules).forEach(function (e) {
	                m = _this4.modules[e].instance;
	                if (typeof m.resetEnvelope === 'function') {
	                    dest = _this4.modules[m.link] ? _this4.modules[m.link].instance : null;
	                    m.resetEnvelope(dest);
	                }
	            });
	            Object.keys(this.modules).forEach(function (e) {
	                m = _this4.modules[e].instance;
	                if (typeof m.noteOff === 'function') {
	                    m.noteOff(release);
	                }
	            });
	        }
	    }]);

	    return Voice;
	})();

	exports['default'] = Voice;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(2);

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var Filter = (function (_Module) {
	    _inherits(Filter, _Module);

	    function Filter(props) {
	        _classCallCheck(this, Filter);

	        _get(Object.getPrototypeOf(Filter.prototype), 'constructor', this).call(this, props);

	        this.freq = +props.freq || 11000;
	        this.q = +props.q || 10;

	        this.main = _AudioContext2['default'].createBiquadFilter();
	        this.main.type = props.type || _coreConstants.CONST.FILTER_LOWPASS;

	        this.setCutOff();
	        this.setQ();
	    }

	    _createClass(Filter, [{
	        key: 'createGain',
	        value: function createGain() {
	            return false;
	        }
	    }, {
	        key: 'setCutOff',
	        value: function setCutOff() {
	            var cutOff = (this.freq - 20) / (20000 - 20) * (14.287712379549449 - 0) + 0;
	            this.main.frequency.value = Math.pow(2, cutOff);
	        }
	    }, {
	        key: 'setQ',
	        value: function setQ() {
	            var q = this.q % 21;
	            this.main.Q.value = q;
	        }
	    }, {
	        key: 'getLineIn',
	        value: function getLineIn(source) {
	            if (source === _coreConstants.TYPES.MODULATOR) {
	                //TODO let main parameter detune | frequency... configurable
	                return this.main.detune;
	            } else {
	                return this.main;
	            }
	        }
	    }, {
	        key: 'getLineOut',
	        value: function getLineOut() {
	            return this.main;
	        }
	    }]);

	    return Filter;
	})(_coreModule2['default']);

	exports['default'] = Filter;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(2);

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var Master = (function (_Module) {
	    _inherits(Master, _Module);

	    function Master(props) {
	        _classCallCheck(this, Master);

	        _get(Object.getPrototypeOf(Master.prototype), 'constructor', this).call(this, props);

	        this.main = _AudioContext2['default'].createGain();
	        this.env = props.envelope || null;
	        this.link = null;
	    }

	    //setEnvelope () {
	    //    let now = AudioContext.currentTime,
	    //        envAttackEnd;
	    //
	    //    this.envelope.gain.value = 0.0;
	    //
	    //    if (this.env) {
	    //        envAttackEnd = now + (this.env.attack / 20.0);
	    //        this.envelope.gain.setValueAtTime(0.0, now);
	    //        this.envelope.gain.linearRampToValueAtTime(1.0, envAttackEnd);
	    //        this.envelope.gain.setTargetAtTime(
	    //            (this.env.sustain / 100.0),
	    //            envAttackEnd,
	    //            (this.env.decay / 100.0) + 0.001
	    //        );
	    //    } else {
	    //        this.envelope.gain.setValueAtTime(0.0, now);
	    //        this.envelope.gain.linearRampToValueAtTime(1.0, now + 0.02);
	    //        this.envelope.gain.setTargetAtTime(1, now + 0.02, 0 + 0.001);
	    //        this.envelope.gain.value = 1;
	    //    }
	    //}
	    //
	    //resetEnvelope () {
	    //    let now = AudioContext.currentTime;
	    //
	    //    if (this.env) {
	    //        this.envelope.gain.cancelScheduledValues(now);
	    //        this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
	    //        this.envelope.gain.setTargetAtTime(0.0, now, (this.env.release / 100));
	    //    } else {
	    //        this.envelope.gain.cancelScheduledValues(now);
	    //        this.envelope.gain.setValueAtTime(this.envelope.gain.value, now);
	    //        this.envelope.gain.setTargetAtTime(0.0, now, 0.05);
	    //    }
	    //}

	    _createClass(Master, [{
	        key: 'getLineIn',
	        value: function getLineIn() {
	            return this.main;
	        }
	    }, {
	        key: 'lineOut',
	        value: function lineOut() {
	            this.main.connect(this.gain);
	            this.gain.connect(_AudioContext2['default'].destination);
	        }
	    }]);

	    return Master;
	})(_coreModule2['default']);

	exports['default'] = Master;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(2);

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreSoundSource = __webpack_require__(3);

	var _coreSoundSource2 = _interopRequireDefault(_coreSoundSource);

	var Modulator = (function (_SoundSource) {
	    _inherits(Modulator, _SoundSource);

	    function Modulator(props) {
	        _classCallCheck(this, Modulator);

	        _get(Object.getPrototypeOf(Modulator.prototype), 'constructor', this).call(this, props);

	        this.freq = +props.freq || 440;

	        this.main = _AudioContext2['default'].createOscillator();
	        this.main.type = props.type || _coreConstants.CONST.WAVE_SINE;
	        this.main.connect(this.gain);
	    }

	    _createClass(Modulator, [{
	        key: 'setNote',
	        value: function setNote() {
	            var f = this.freq % 11;
	            this.main.frequency.value = f;
	        }
	    }, {
	        key: 'getLineIn',
	        value: function getLineIn() {
	            return this.main.frequency;
	        }
	    }]);

	    return Modulator;
	})(_coreSoundSource2['default']);

	exports['default'] = Modulator;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(2);

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreSoundSource = __webpack_require__(3);

	var _coreSoundSource2 = _interopRequireDefault(_coreSoundSource);

	var Noise = (function (_SoundSource) {
	    _inherits(Noise, _SoundSource);

	    function Noise(props) {
	        _classCallCheck(this, Noise);

	        _get(Object.getPrototypeOf(Noise.prototype), 'constructor', this).call(this, props);

	        this.main = _AudioContext2['default'].createBufferSource();
	        this.main.connect(this.gain);

	        this.color = props.color || 'white';
	        this.setColor();
	    }

	    _createClass(Noise, [{
	        key: 'setColor',
	        value: function setColor() {
	            switch (this.color) {
	                case 'white':
	                    this.main.buffer = this.white();
	                    break;
	                case 'pink':
	                    this.main.buffer = this.pink();
	                    break;
	                case 'brown':
	                    this.main.buffer = this.brown();
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
	        key: 'setNote',
	        value: function setNote() {
	            this.main.loop = true;
	        }
	    }]);

	    return Noise;
	})(_coreSoundSource2['default']);

	exports['default'] = Noise;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(2);

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreSoundSource = __webpack_require__(3);

	var _coreSoundSource2 = _interopRequireDefault(_coreSoundSource);

	var Oscillator = (function (_SoundSource) {
	    _inherits(Oscillator, _SoundSource);

	    function Oscillator(props) {
	        _classCallCheck(this, Oscillator);

	        _get(Object.getPrototypeOf(Oscillator.prototype), 'constructor', this).call(this, props);

	        this.detune = +props.detune || 0;

	        this.main = _AudioContext2['default'].createOscillator();
	        this.main.type = props.type || _coreConstants.CONST.WAVE_SINE;
	        this.main.connect(this.gain);

	        this.setDetune();
	    }

	    _createClass(Oscillator, [{
	        key: 'setDetune',
	        value: function setDetune() {
	            if (this.detune > 1200) {
	                this.detune = 1200;
	            } else if (this.detune < -1200) {
	                this.detune = -1200;
	            }

	            this.main.detune.value = this.detune;
	        }
	    }, {
	        key: 'setNote',
	        value: function setNote(note) {
	            this.main.frequency.value = note;
	        }
	    }, {
	        key: 'getLineIn',
	        value: function getLineIn() {
	            return this.main.frequency;
	        }
	    }]);

	    return Oscillator;
	})(_coreSoundSource2['default']);

	exports['default'] = Oscillator;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(2);

	var _AudioContext = __webpack_require__(1);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var Envelope = (function (_Module) {
	    _inherits(Envelope, _Module);

	    function Envelope(props) {
	        _classCallCheck(this, Envelope);

	        _get(Object.getPrototypeOf(Envelope.prototype), 'constructor', this).call(this, props);

	        this.target = props.target || null;

	        this.attack = props.attack;
	        this.decay = props.decay;
	        this.sustain = props.sustain;
	        this.release = props.release;
	    }

	    _createClass(Envelope, [{
	        key: 'createGain',
	        value: function createGain() {
	            return false;
	        }
	    }, {
	        key: 'getReleaseTime',
	        value: function getReleaseTime() {
	            var now = _AudioContext2['default'].currentTime,
	                release = undefined;

	            if (this.release) {
	                release = now + this.release / 10.0;
	            } else {
	                release = now + 0.2;
	            }

	            return release;
	        }
	    }, {
	        key: 'setEnvelope',
	        value: function setEnvelope(dest) {
	            var now = _AudioContext2['default'].currentTime,
	                envelope = this.level % 101,
	                attackLevel = undefined,
	                sustainLevel = undefined,
	                attackEnd = this.attack / 20.0,
	                t = undefined;

	            if (this.target === 'gain') {
	                attackLevel = envelope / 100;
	                sustainLevel = this.sustain / 100.0;
	            } else {
	                attackLevel = envelope * 72; // Range: 0-7200: 6-octave range
	                sustainLevel = attackLevel * this.sustain / 100.0; // range: 0-7200
	            }

	            if (!attackEnd) {
	                attackEnd = 0.05; // tweak to get target decay to work properly
	            }

	            if (dest && dest.main) {
	                if (dest.main[this.target]) {
	                    t = dest.main[this.target];
	                } else if (this.target === 'gain' && dest.gain) {
	                    t = dest.gain.gain;
	                    t.value = 0.0;
	                }

	                if (t) {
	                    t.setValueAtTime(0, now);
	                    t.linearRampToValueAtTime(attackLevel, now + attackEnd);
	                    t.setTargetAtTime(sustainLevel, now + attackEnd, this.decay / 100.0);
	                }
	            }
	        }
	    }, {
	        key: 'resetEnvelope',
	        value: function resetEnvelope(dest) {
	            var now = _AudioContext2['default'].currentTime,
	                t = undefined;

	            if (dest && dest.main) {
	                if (dest.main[this.target]) {
	                    t = dest.main[this.target];
	                } else if (this.target === 'gain' && dest.gain) {
	                    t = dest.gain.gain;
	                }

	                if (t) {
	                    t.cancelScheduledValues(now);
	                    if (this.target === 'gain') {
	                        t.setValueAtTime(t.value, now);
	                    }
	                    t.setTargetAtTime(0, now, this.release / 100.0);
	                }
	            }
	        }
	    }, {
	        key: 'getLineOut',
	        value: function getLineOut() {
	            return false;
	        }
	    }]);

	    return Envelope;
	})(_coreModule2['default']);

	exports['default'] = Envelope;
	module.exports = exports['default'];

/***/ }
/******/ ]);