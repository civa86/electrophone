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

	var _WebSynth = __webpack_require__(8);

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
/* 2 */
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

	var _coreConstants = __webpack_require__(1);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var _EffectManager = __webpack_require__(10);

	var _EffectManager2 = _interopRequireDefault(_EffectManager);

	var Effect = (function (_Module) {
	    _inherits(Effect, _Module);

	    function Effect(props, name) {
	        _classCallCheck(this, Effect);

	        _get(Object.getPrototypeOf(Effect.prototype), 'constructor', this).call(this, props, name);
	        this.main = null;
	        this.mainEffect = null;
	    }

	    _createClass(Effect, [{
	        key: 'setMainEffect',
	        value: function setMainEffect(type, mainEffect, props) {
	            //TODO set an array of main effects??
	            this.main = new _EffectManager2['default'][type](props);
	            this.mainEffect = this.main[mainEffect];
	        }
	    }, {
	        key: 'setMainProperties',
	        value: function setMainProperties(props) {
	            var _this = this;

	            Object.keys(props).forEach(function (e) {
	                if (_this.main[e]) {
	                    _this.main[e] = props[e];
	                }
	            });
	        }
	    }, {
	        key: 'createGain',
	        value: function createGain() {
	            return false;
	        }
	    }, {
	        key: 'getLineIn',
	        value: function getLineIn(sourceType, source) {
	            if (sourceType === _coreConstants.TYPES.MODULATOR) {
	                return this.mainEffect[source.target];
	            } else {
	                return this.main.input;
	            }
	        }
	    }, {
	        key: 'getLineOut',
	        value: function getLineOut() {
	            return this.main.output;
	        }
	    }, {
	        key: 'getEnvelopeTarget',
	        value: function getEnvelopeTarget(target) {
	            var ret = null;

	            if (target === 'gain') {
	                ret = this.main.output.gain;
	            } else if (this.main && this.mainEffect && this.mainEffect[target]) {
	                ret = this.main.filter[target];
	            }

	            return ret;
	        }
	    }]);

	    return Effect;
	})(_coreModule2['default']);

	exports['default'] = Effect;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _properties = __webpack_require__(7);

	var Props = _interopRequireWildcard(_properties);

	var Module = (function () {
	    function Module(props, name) {
	        _classCallCheck(this, Module);

	        this.name = name;
	        this.gain = null;
	        this.envelope = null;
	        this.main = null;

	        this.setupProperties(props);

	        this.createGain(this.level);
	    }

	    _createClass(Module, [{
	        key: 'toString',
	        value: function toString() {
	            return this.name;
	        }
	    }, {
	        key: 'setupProperties',
	        value: function setupProperties(props) {
	            var _this = this;

	            var properties = props || {},
	                defaultProperties = {
	                link: {
	                    type: 'string',
	                    defaultValue: ''
	                },
	                level: {
	                    type: 'number',
	                    bounds: [0, 100],
	                    defaultValue: 100
	                }
	            },
	                propsHandler = this.toString() + 'Props',
	                customProps = Props[propsHandler] || {};

	            defaultProperties = Object.assign(defaultProperties, customProps);

	            Object.keys(defaultProperties).forEach(function (e) {
	                _this.setProperty(e, properties[e], defaultProperties[e]);
	            });
	        }
	    }, {
	        key: 'setProperty',
	        value: function setProperty(propKey, propVal, propConfig) {
	            this[propKey] = null;
	            if (propConfig.type && typeof propVal === propConfig.type) {
	                //TODO check propval && bounds....set a value...
	                this[propKey] = propVal;
	            } else if (propConfig.defaultValue !== undefined) {
	                this[propKey] = propConfig.defaultValue;
	            }
	        }
	    }, {
	        key: 'createGain',
	        value: function createGain(level) {
	            var l = level >= 0 ? level % 101 : 100;
	            this.gain = _AudioContext2['default'].createGain();
	            this.envelope = _AudioContext2['default'].createGain();
	            this.gain.gain.value = l / 100;
	            this.envelope.gain.value = 1;

	            this.envelope.connect(this.gain);
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
	    }, {
	        key: 'getEnvelopeTarget',
	        value: function getEnvelopeTarget(target) {
	            var ret = null;

	            if (this.main && this.main[target]) {
	                ret = this.main[target];
	            } else if (target === 'gain' && this.gain) {
	                ret = this.envelope.gain;
	            }

	            return ret;
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var SoundSource = (function (_Module) {
	    _inherits(SoundSource, _Module);

	    function SoundSource(props, name) {
	        _classCallCheck(this, SoundSource);

	        _get(Object.getPrototypeOf(SoundSource.prototype), 'constructor', this).call(this, props, name);

	        this.defaultLineInProperty = 'frequency';
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
	    }, {
	        key: 'getLineIn',
	        value: function getLineIn(sourceType, source) {
	            if (sourceType === _coreConstants.TYPES.MODULATOR) {
	                return this.main[source.target];
	            } else {
	                return this.main[this.defaultLineInProperty];
	            }
	        }
	    }]);

	    return SoundSource;
	})(_coreModule2['default']);

	exports['default'] = SoundSource;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Master = __webpack_require__(22);

	exports.Master = _interopRequire(_Master);

	var _Envelope = __webpack_require__(21);

	exports.Envelope = _interopRequire(_Envelope);

	var _Pan = __webpack_require__(23);

	exports.Pan = _interopRequire(_Pan);

	//SOUNDSOURCES

	var _SoundSourcesOscillator = __webpack_require__(26);

	exports.Oscillator = _interopRequire(_SoundSourcesOscillator);

	var _SoundSourcesModulator = __webpack_require__(24);

	exports.Modulator = _interopRequire(_SoundSourcesModulator);

	var _SoundSourcesNoise = __webpack_require__(25);

	exports.Noise = _interopRequire(_SoundSourcesNoise);

	//TODO implement
	//Sampler

	//EFFECTS

	var _EffectsFilter = __webpack_require__(15);

	exports.Filter = _interopRequire(_EffectsFilter);

	var _EffectsDelay = __webpack_require__(14);

	exports.Delay = _interopRequire(_EffectsDelay);

	var _EffectsPingPongDelay = __webpack_require__(18);

	exports.PingPongDelay = _interopRequire(_EffectsPingPongDelay);

	var _EffectsWahWah = __webpack_require__(20);

	exports.WahWah = _interopRequire(_EffectsWahWah);

	var _EffectsTremolo = __webpack_require__(19);

	exports.Tremolo = _interopRequire(_EffectsTremolo);

	var _EffectsOverdrive = __webpack_require__(17);

	exports.Overdrive = _interopRequire(_EffectsOverdrive);

	var _EffectsCabinet = __webpack_require__(13);

	exports.Cabinet = _interopRequire(_EffectsCabinet);

	var _EffectsBitcrusher = __webpack_require__(12);

	exports.Bitcrusher = _interopRequire(_EffectsBitcrusher);

	var _EffectsMoogFilter = __webpack_require__(16);

	exports.MoogFilter = _interopRequire(_EffectsMoogFilter);

	//TODO implement
	//Convolver
	//Compressor
	//Phaser
	//Chorus

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//export {default as MasterProps} from './MasterProps'
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _EnvelopeProps = __webpack_require__(30);

	exports.EnvelopeProps = _interopRequire(_EnvelopeProps);

	var _PanProps = __webpack_require__(37);

	exports.PanProps = _interopRequire(_PanProps);

	//SOUNDSOURCES

	var _OscillatorProps = __webpack_require__(35);

	exports.OscillatorProps = _interopRequire(_OscillatorProps);

	var _ModulatorProps = __webpack_require__(32);

	exports.ModulatorProps = _interopRequire(_ModulatorProps);

	var _NoiseProps = __webpack_require__(34);

	exports.NoiseProps = _interopRequire(_NoiseProps);

	//TODO implement
	//Sampler

	//EFFECTS

	var _FilterProps = __webpack_require__(31);

	exports.FilterProps = _interopRequire(_FilterProps);

	var _DelayProps = __webpack_require__(29);

	exports.DelayProps = _interopRequire(_DelayProps);

	var _PingPongDelayProps = __webpack_require__(38);

	exports.PingPongDelayProps = _interopRequire(_PingPongDelayProps);

	var _WahWahProps = __webpack_require__(40);

	exports.WahWahProps = _interopRequire(_WahWahProps);

	var _TremoloProps = __webpack_require__(39);

	exports.TremoloProps = _interopRequire(_TremoloProps);

	var _OverdriveProps = __webpack_require__(36);

	exports.OverdriveProps = _interopRequire(_OverdriveProps);

	var _CabinetProps = __webpack_require__(28);

	exports.CabinetProps = _interopRequire(_CabinetProps);

	var _BitcrusherProps = __webpack_require__(27);

	exports.BitcrusherProps = _interopRequire(_BitcrusherProps);

	var _MoogFilterProps = __webpack_require__(33);

	exports.MoogFilterProps = _interopRequire(_MoogFilterProps);

	//TODO implement
	//Convolver
	//Compressor
	//Phaser
	//Chorus

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libModules = __webpack_require__(6);

	var Modules = _interopRequireWildcard(_libModules);

	var _libProperties = __webpack_require__(7);

	var Props = _interopRequireWildcard(_libProperties);

	var _libCoreConstants = __webpack_require__(1);

	var _libSynth = __webpack_require__(9);

	var _libSynth2 = _interopRequireDefault(_libSynth);

	var WebSynth = function WebSynth(props) {
	    var _this = this;

	    _classCallCheck(this, WebSynth);

	    var properties = props || {},
	        synth = new _libSynth2['default'](properties),
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

	    this.listModules = function () {
	        var methods = Object.keys(Modules),
	            result = undefined,
	            propName = undefined,
	            props = undefined,
	            tmp = undefined;

	        result = methods.reduce(function (res, e) {
	            propName = e + 'Props';
	            props = Props[propName] || {};

	            //TODO set level and add global module properties....
	            tmp = {
	                name: e,
	                props: props
	            };
	            res.push(tmp);
	            return res;
	        }, []);

	        return result;
	    };
	};

	exports['default'] = WebSynth;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _coreConstants = __webpack_require__(1);

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreVoice = __webpack_require__(11);

	var _coreVoice2 = _interopRequireDefault(_coreVoice);

	var Synth = (function () {
	    function Synth(props) {
	        _classCallCheck(this, Synth);

	        var properties = props || {};
	        this.modulesConfig = {};
	        this.voices = {};
	        this.spectrum = properties.spectrum || false;
	        this.updateSpectrum = properties.updateSpectrum || null;
	        this.resetSpectrum = properties.resetSpectrum || null;

	        this.analyser = null;
	        this.javascriptNode = null;

	        if (this.spectrum === true) {
	            this.createSpectrum();
	        }

	        this.module('Master', _coreConstants.CONST.MASTER, {
	            level: 100
	        });

	        this.module('Envelope', _coreConstants.CONST.ADSR, {
	            link: _coreConstants.CONST.MASTER,
	            target: 'gain',
	            level: 100,
	            attack: null,
	            decay: 0.1,
	            sustain: 100,
	            release: 5
	        });
	    }

	    _createClass(Synth, [{
	        key: 'createSpectrum',
	        value: function createSpectrum() {
	            var SMOOTHING = 0.8,
	                FFT_SIZE = 2048;

	            this.javascriptNode = _AudioContext2['default'].createScriptProcessor(2048, 1, 1);
	            this.javascriptNode.connect(_AudioContext2['default'].destination);

	            this.analyser = _AudioContext2['default'].createAnalyser();
	            this.analyser.smoothingTimeConstant = SMOOTHING;
	            this.analyser.fftSize = FFT_SIZE;
	            this.analyser.minDecibels = -140;
	            this.analyser.maxDecibels = 0;

	            this.analyser.connect(_AudioContext2['default'].destination);
	        }
	    }, {
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
	            var _this = this;

	            var frequencyData = undefined;

	            if (!this.voices[note]) {
	                this.voices[note] = new _coreVoice2['default'](note, this.modulesConfig, this.analyser);
	                this.voices[note].noteOn();
	            }
	            if (this.spectrum === true && this.javascriptNode) {
	                frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

	                this.javascriptNode.onaudioprocess = function () {
	                    _this.analyser.getByteFrequencyData(frequencyData);
	                    if (_this.updateSpectrum && typeof _this.updateSpectrum === 'function') {
	                        _this.updateSpectrum(frequencyData);
	                    }
	                };
	            }
	        }
	    }, {
	        key: 'stop',
	        value: function stop(note) {
	            if (this.voices[note]) {
	                this.voices[note].noteOff();
	                this.voices[note] = undefined;
	                delete this.voices[note];
	            }
	            if (Object.keys(this.voices).length === 0 && this.spectrum === true && this.javascriptNode) {
	                this.javascriptNode.onaudioprocess = null;
	                if (this.resetSpectrum && typeof this.resetSpectrum === 'function') {
	                    this.resetSpectrum();
	                }
	            }
	        }
	    }]);

	    return Synth;
	})();

	exports['default'] = Synth;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _tunajs = __webpack_require__(41);

	var _tunajs2 = _interopRequireDefault(_tunajs);

	var manager = new _tunajs2['default'](_AudioContext2['default']);

	exports['default'] = manager;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _modules = __webpack_require__(6);

	var Modules = _interopRequireWildcard(_modules);

	var _SoundSource = __webpack_require__(5);

	var _SoundSource2 = _interopRequireDefault(_SoundSource);

	var _Constants = __webpack_require__(1);

	var Voice = (function () {
	    function Voice(note, modulesConfig, analyser) {
	        _classCallCheck(this, Voice);

	        this.note = note;
	        this.modulesConfig = modulesConfig;
	        this.modules = {};
	        this.soundSources = [];
	        this.master = null;
	        this.analyser = analyser || null;

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
	                    m = new Modules[modConf.type](modConf.props, modConf.type);
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
	                        dest = destinationModule.instance.getLineIn(currentModuleType, currentModule);
	                        //console.log(mod, source, currentModule.link, dest);
	                        if (source && dest) {
	                            source.connect(dest);
	                        }
	                    }
	                }
	            });

	            this.master.lineOut(this.analyser);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var Bitcrusher = (function (_Effect) {
	    _inherits(Bitcrusher, _Effect);

	    function Bitcrusher(props, name) {
	        _classCallCheck(this, Bitcrusher);

	        _get(Object.getPrototypeOf(Bitcrusher.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('Bitcrusher', 'output');
	        this.setMainProperties({
	            bits: this.bits,
	            normfreq: this.normfreq,
	            bufferSize: this.bufferSize
	        });
	    }

	    return Bitcrusher;
	})(_coreEffect2['default']);

	exports['default'] = Bitcrusher;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var Cabinet = (function (_Effect) {
	    _inherits(Cabinet, _Effect);

	    function Cabinet(props, name) {
	        _classCallCheck(this, Cabinet);

	        _get(Object.getPrototypeOf(Cabinet.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('Cabinet', 'output', {
	            impulsePath: this.impulsePath,
	            makeupGain: 1
	        });
	        this.setMainProperties({
	            impulsePath: this.impulsePath,
	            makeupGain: this.makeupGain,
	            bypass: this.bypass
	        });
	    }

	    return Cabinet;
	})(_coreEffect2['default']);

	exports['default'] = Cabinet;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var Delay = (function (_Effect) {
	    _inherits(Delay, _Effect);

	    function Delay(props, name) {
	        _classCallCheck(this, Delay);

	        _get(Object.getPrototypeOf(Delay.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('Delay', 'filter');
	        this.setMainProperties({
	            dryLevel: this.dry,
	            wetLevel: this.wet,
	            feedback: this.feedback,
	            cutoff: this.cutoff,
	            delayTime: this.delayTime,
	            bypass: this.bypass
	        });
	    }

	    return Delay;
	})(_coreEffect2['default']);

	exports['default'] = Delay;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var Filter = (function (_Effect) {
	    _inherits(Filter, _Effect);

	    function Filter(props, name) {
	        _classCallCheck(this, Filter);

	        _get(Object.getPrototypeOf(Filter.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('Filter', 'filter');
	        this.setMainProperties({
	            frequency: this.freq,
	            Q: this.q,
	            gain: this.filterGain,
	            filterType: this.filterType,
	            bypass: this.bypass
	        });
	    }

	    return Filter;
	})(_coreEffect2['default']);

	exports['default'] = Filter;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var MoogFilter = (function (_Effect) {
	    _inherits(MoogFilter, _Effect);

	    function MoogFilter(props, name) {
	        _classCallCheck(this, MoogFilter);

	        _get(Object.getPrototypeOf(MoogFilter.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('MoogFilter', 'output');
	        this.setMainProperties({
	            cutoff: this.cutoff,
	            resonance: this.resonance,
	            bufferSize: this.bufferSize
	        });
	    }

	    return MoogFilter;
	})(_coreEffect2['default']);

	exports['default'] = MoogFilter;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var Overdrive = (function (_Effect) {
	    _inherits(Overdrive, _Effect);

	    function Overdrive(props, name) {
	        _classCallCheck(this, Overdrive);

	        _get(Object.getPrototypeOf(Overdrive.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('Overdrive', 'output');
	        this.setMainProperties({
	            outputGain: this.outputGain,
	            drive: this.drive,
	            curveAmount: this.curveAmount,
	            algorithmIndex: this.algorithmIndex,
	            bypass: this.bypass
	        });
	    }

	    return Overdrive;
	})(_coreEffect2['default']);

	exports['default'] = Overdrive;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var PingPongDelay = (function (_Effect) {
	    _inherits(PingPongDelay, _Effect);

	    function PingPongDelay(props, name) {
	        _classCallCheck(this, PingPongDelay);

	        _get(Object.getPrototypeOf(PingPongDelay.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('PingPongDelay', 'delayLeft');
	        this.setMainProperties({
	            dryLevel: this.dry,
	            wetLevel: this.wet,
	            feedback: this.feedback,
	            delayTimeLeft: this.delayTimeLeft,
	            delayTimeRight: this.delayTimeRight,
	            bypass: this.bypass
	        });
	    }

	    return PingPongDelay;
	})(_coreEffect2['default']);

	exports['default'] = PingPongDelay;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var Tremolo = (function (_Effect) {
	    _inherits(Tremolo, _Effect);

	    function Tremolo(props, name) {
	        _classCallCheck(this, Tremolo);

	        _get(Object.getPrototypeOf(Tremolo.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('Tremolo', 'output');
	        this.setMainProperties({
	            intensity: this.intensity,
	            rate: this.rate,
	            stereoPhase: this.stereoPhase,
	            bypass: this.bypass
	        });
	    }

	    return Tremolo;
	})(_coreEffect2['default']);

	exports['default'] = Tremolo;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _coreConstants = __webpack_require__(1);

	var _coreEffect = __webpack_require__(3);

	var _coreEffect2 = _interopRequireDefault(_coreEffect);

	var WahWah = (function (_Effect) {
	    _inherits(WahWah, _Effect);

	    function WahWah(props, name) {
	        _classCallCheck(this, WahWah);

	        _get(Object.getPrototypeOf(WahWah.prototype), 'constructor', this).call(this, props, name);

	        this.setMainEffect('WahWah', 'filterBp');
	        this.setMainProperties({
	            automode: this.automode,
	            baseFrequency: this.baseFrequency,
	            excursionOctaves: this.excursionOctaves,
	            sweep: this.sweep,
	            resonance: this.resonance,
	            sensitivity: this.sensitivity,
	            bypass: this.bypass
	        });
	    }

	    return WahWah;
	})(_coreEffect2['default']);

	exports['default'] = WahWah;
	module.exports = exports['default'];

/***/ },
/* 21 */
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

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var Envelope = (function (_Module) {
	    _inherits(Envelope, _Module);

	    function Envelope(props, name) {
	        _classCallCheck(this, Envelope);

	        _get(Object.getPrototypeOf(Envelope.prototype), 'constructor', this).call(this, props, name);
	        //TODO check for method to call on update...like setMainProperties of Effect!!
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

	            if (dest && typeof dest.getEnvelopeTarget === 'function') {
	                t = dest.getEnvelopeTarget(this.target);

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

	            if (dest && typeof dest.getEnvelopeTarget === 'function') {
	                t = dest.getEnvelopeTarget(this.target);

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

/***/ },
/* 22 */
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

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var Master = (function (_Module) {
	    _inherits(Master, _Module);

	    function Master(props, name) {
	        _classCallCheck(this, Master);

	        _get(Object.getPrototypeOf(Master.prototype), 'constructor', this).call(this, props, name);
	        //TODO check for method to call on update...like setMainProperties of Effect!!
	        this.main = _AudioContext2['default'].createGain();
	        this.link = null;
	    }

	    _createClass(Master, [{
	        key: 'getLineIn',
	        value: function getLineIn() {
	            return this.main;
	        }
	    }, {
	        key: 'lineOut',
	        value: function lineOut(analyser) {
	            this.main.connect(this.envelope);
	            if (analyser) {
	                this.gain.connect(analyser);
	            } else {
	                this.gain.connect(_AudioContext2['default'].destination);
	            }
	        }
	    }]);

	    return Master;
	})(_coreModule2['default']);

	exports['default'] = Master;
	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreModule = __webpack_require__(4);

	var _coreModule2 = _interopRequireDefault(_coreModule);

	var Pan = (function (_Module) {
	    _inherits(Pan, _Module);

	    function Pan(props, name) {
	        _classCallCheck(this, Pan);

	        _get(Object.getPrototypeOf(Pan.prototype), 'constructor', this).call(this, props, name);
	        //TODO check for method to call on update...like setMainProperties of Effect!!
	        this.main = _AudioContext2['default'].createStereoPanner();
	        this.main.pan.value = this.value;
	        this.main.connect(this.envelope);
	    }

	    return Pan;
	})(_coreModule2['default']);

	exports['default'] = Pan;
	module.exports = exports['default'];

/***/ },
/* 24 */
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

	var _coreConstants = __webpack_require__(1);

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreSoundSource = __webpack_require__(5);

	var _coreSoundSource2 = _interopRequireDefault(_coreSoundSource);

	var Modulator = (function (_SoundSource) {
	    _inherits(Modulator, _SoundSource);

	    function Modulator(props, name) {
	        _classCallCheck(this, Modulator);

	        _get(Object.getPrototypeOf(Modulator.prototype), 'constructor', this).call(this, props, name);
	        //TODO separate in a method to call on update...like setMainProperties of Effect!!
	        this.main = _AudioContext2['default'].createOscillator();
	        this.main.type = this.wave;
	        this.main.connect(this.envelope);
	    }

	    _createClass(Modulator, [{
	        key: 'setNote',
	        value: function setNote() {
	            var f = this.freq % 11;
	            this.main.frequency.value = f;
	        }
	    }]);

	    return Modulator;
	})(_coreSoundSource2['default']);

	exports['default'] = Modulator;
	module.exports = exports['default'];

/***/ },
/* 25 */
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

	var _coreConstants = __webpack_require__(1);

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreSoundSource = __webpack_require__(5);

	var _coreSoundSource2 = _interopRequireDefault(_coreSoundSource);

	var Noise = (function (_SoundSource) {
	    _inherits(Noise, _SoundSource);

	    function Noise(props, name) {
	        _classCallCheck(this, Noise);

	        _get(Object.getPrototypeOf(Noise.prototype), 'constructor', this).call(this, props, name);
	        //TODO separate in a method to call on update...like setMainProperties of Effect!!
	        this.defaultLineInProperty = 'detune';
	        this.main = _AudioContext2['default'].createBufferSource();
	        this.main.connect(this.envelope);

	        this.setColor();
	    }

	    _createClass(Noise, [{
	        key: 'setColor',
	        value: function setColor() {
	            switch (this.color) {
	                case _coreConstants.CONST.NOISE_WHITE:
	                    this.main.buffer = this.white();
	                    break;
	                case _coreConstants.CONST.NOISE_PINK:
	                    this.main.buffer = this.pink();
	                    break;
	                case _coreConstants.CONST.NOISE_BROWN:
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
/* 26 */
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

	var _coreConstants = __webpack_require__(1);

	var _AudioContext = __webpack_require__(2);

	var _AudioContext2 = _interopRequireDefault(_AudioContext);

	var _coreSoundSource = __webpack_require__(5);

	var _coreSoundSource2 = _interopRequireDefault(_coreSoundSource);

	var Oscillator = (function (_SoundSource) {
	    _inherits(Oscillator, _SoundSource);

	    function Oscillator(props, name) {
	        _classCallCheck(this, Oscillator);

	        _get(Object.getPrototypeOf(Oscillator.prototype), 'constructor', this).call(this, props, name);
	        //TODO separate in a method to call on update...like setMainProperties of Effect!!
	        this.main = _AudioContext2['default'].createOscillator();
	        this.main.type = this.wave;
	        this.main.connect(this.envelope);

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
	    }]);

	    return Oscillator;
	})(_coreSoundSource2['default']);

	exports['default'] = Oscillator;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var BitcrusherProps = {
	    bits: {
	        type: 'number',
	        bounds: [1, 16],
	        defaultValue: 1
	    },
	    normfreq: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0.5
	    },
	    bufferSize: {
	        type: 'number',
	        bounds: [256, 16384],
	        defaultValue: 4096
	    }
	};

	exports['default'] = BitcrusherProps;
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var CabinetProps = {
	    makeupGain: {
	        type: 'number',
	        bounds: [0, 20],
	        defaultValue: 0
	    },
	    impulsePath: {
	        type: 'string',
	        defaultValue: ''
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = CabinetProps;
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var DelayProps = {
	    dry: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 1
	    },
	    wet: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    feedback: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    cutoff: {
	        type: 'number',
	        bounds: [20, 20000],
	        defaultValue: 440
	    },
	    delayTime: {
	        type: 'number',
	        bounds: [1, 10000],
	        defaultValue: 1
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = DelayProps;
	module.exports = exports['default'];

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var EnvelopeProps = {
	    target: {
	        type: 'string',
	        defaultValue: null
	    },
	    attack: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 1
	    },
	    decay: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 1
	    },
	    sustain: {
	        type: 'number',
	        bounds: [1, 100],
	        defaultValue: 100
	    },
	    release: {
	        type: 'number',
	        bounds: [0.001, 100],
	        defaultValue: 5
	    }
	};

	exports['default'] = EnvelopeProps;
	module.exports = exports['default'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _coreConstants = __webpack_require__(1);

	var FilterProps = {
	    freq: {
	        type: 'number',
	        bounds: [20, 20000],
	        defaultValue: 440
	    },
	    q: {
	        type: 'number',
	        bounds: [0.001, 100],
	        defaultValue: 10
	    },
	    filterGain: {
	        type: 'number',
	        bounds: [-40, 40],
	        defaultValue: 0
	    },
	    filterType: {
	        type: 'string',
	        defaultValue: _coreConstants.CONST.FILTER_LOWPASS
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = FilterProps;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _coreConstants = __webpack_require__(1);

	var ModulatorProps = {
	    freq: {
	        type: 'number',
	        bounds: [20, 20000],
	        defaultValue: 440
	    },
	    target: {
	        type: 'string',
	        defaultValue: 'frequency'
	    },
	    wave: {
	        type: 'string',
	        defaultValue: _coreConstants.CONST.WAVE_SINE
	    }
	};

	exports['default'] = ModulatorProps;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var MoogFilterProps = {
	    cutoff: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    resonance: {
	        type: 'number',
	        bounds: [0, 4],
	        defaultValue: 0
	    },
	    bufferSize: {
	        type: 'number',
	        bounds: [256, 16384],
	        defaultValue: 4096
	    }
	};

	exports['default'] = MoogFilterProps;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _coreConstants = __webpack_require__(1);

	var NoiseProps = {
	    color: {
	        type: 'string',
	        defaultValue: _coreConstants.CONST.NOISE_WHITE
	    }
	};

	exports['default'] = NoiseProps;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _coreConstants = __webpack_require__(1);

	var OscillatorProps = {
	    detune: {
	        type: 'number',
	        bounds: [-1200, 1200],
	        defaultValue: 0
	    },
	    wave: {
	        type: 'string',
	        defaultValue: _coreConstants.CONST.WAVE_SINE
	    }
	};

	exports['default'] = OscillatorProps;
	module.exports = exports['default'];

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var OverdriveProps = {
	    outputGain: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0.5
	    },
	    drive: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    curveAmount: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 1
	    },
	    algorithmIndex: {
	        type: 'number',
	        bounds: [0, 5],
	        defaultValue: 0
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = OverdriveProps;
	module.exports = exports['default'];

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var PanProps = {
	    value: {
	        type: 'number',
	        bounds: [-1, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = PanProps;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var PingPongDelayProps = {
	    dry: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 1
	    },
	    wet: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    feedback: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    delayTimeLeft: {
	        type: 'number',
	        bounds: [1, 10000],
	        defaultValue: 1
	    },
	    delayTimeRight: {
	        type: 'number',
	        bounds: [1, 10000],
	        defaultValue: 1
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = PingPongDelayProps;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var TremoloProps = {
	    intensity: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    rate: {
	        type: 'number',
	        bounds: [0.001, 8],
	        defaultValue: 0.001
	    },
	    stereoPhase: {
	        type: 'number',
	        bounds: [0, 180],
	        defaultValue: 0
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = TremoloProps;
	module.exports = exports['default'];

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var WahWahProps = {
	    automode: {
	        type: 'boolean',
	        defaultValue: false
	    },
	    baseFrequency: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    excursionOctaves: {
	        type: 'number',
	        bounds: [1, 6],
	        defaultValue: 1
	    },
	    sweep: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    },
	    resonance: {
	        type: 'number',
	        bounds: [1, 100],
	        defaultValue: 1
	    },
	    sensitivity: {
	        type: 'number',
	        bounds: [-1, 1],
	        defaultValue: 0
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};

	exports['default'] = WahWahProps;
	module.exports = exports['default'];

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/*
	    Copyright (c) 2012 DinahMoe AB & Oskar Eriksson

	    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
	    files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
	    modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software
	    is furnished to do so, subject to the following conditions:

	    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	    OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	*/
	(function(window) {
	    var userContext,
	        userInstance,
	        pipe = function(param, val) {
	            param.value = val;
	        },
	        Super = Object.create(null, {
	            activate: {
	                writable: true,
	                value: function(doActivate) {
	                    if (doActivate) {
	                        this.input.disconnect();
	                        this.input.connect(this.activateNode);
	                        if (this.activateCallback) {
	                            this.activateCallback(doActivate);
	                        }
	                    } else {
	                        this.input.disconnect();
	                        this.input.connect(this.output);
	                    }
	                }
	            },
	            bypass: {
	                get: function() {
	                    return this._bypass;
	                },
	                set: function(value) {
	                    if (this._lastBypassValue === value) {
	                        return;
	                    }
	                    this._bypass = value;
	                    this.activate(!value);
	                    this._lastBypassValue = value;
	                }
	            },
	            connect: {
	                value: function(target) {
	                    this.output.connect(target);
	                }
	            },
	            disconnect: {
	                value: function(target) {
	                    this.output.disconnect(target);
	                }
	            },
	            connectInOrder: {
	                value: function(nodeArray) {
	                    var i = nodeArray.length - 1;
	                    while (i--) {
	                        if (!nodeArray[i].connect) {
	                            return console.error("AudioNode.connectInOrder: TypeError: Not an AudioNode.", nodeArray[i]);
	                        }
	                        if (nodeArray[i + 1].input) {
	                            nodeArray[i].connect(nodeArray[i + 1].input);
	                        } else {
	                            nodeArray[i].connect(nodeArray[i + 1]);
	                        }
	                    }
	                }
	            },
	            getDefaults: {
	                value: function() {
	                    var result = {};
	                    for (var key in this.defaults) {
	                        result[key] = this.defaults[key].value;
	                    }
	                    return result;
	                }
	            },
	            automate: {
	                value: function(property, value, duration, startTime) {
	                    var start = startTime ? ~~(startTime / 1000) : userContext.currentTime,
	                        dur = duration ? ~~(duration / 1000) : 0,
	                        _is = this.defaults[property],
	                        param = this[property],
	                        method;

	                    if (param) {
	                        if (_is.automatable) {
	                            if (!duration) {
	                                method = "setValueAtTime";
	                            } else {
	                                method = "linearRampToValueAtTime";
	                                param.cancelScheduledValues(start);
	                                param.setValueAtTime(param.value, start);
	                            }
	                            param[method](value, dur + start);
	                        } else {
	                            param = value;
	                        }
	                    } else {
	                        console.error("Invalid Property for " + this.name);
	                    }
	                }
	            }
	        }),
	        FLOAT = "float",
	        BOOLEAN = "boolean",
	        STRING = "string",
	        INT = "int";

	    if (typeof module !== "undefined" && module.exports) {
	        module.exports = Tuna;
	    } else if (true) {
	        window.define("Tuna", definition);
	    } else {
	        window.Tuna = Tuna;
	    }

	    function definition() {
	        return Tuna;
	    }

	    function Tuna(context) {
	        if (!(this instanceof Tuna)) {
	            return new Tuna(context);
	        }
	        if (!window.AudioContext) {
	            window.AudioContext = window.webkitAudioContext;
	        }
	        if (!context) {
	            console.log("tuna.js: Missing audio context! Creating a new context for you.");
	            context = window.AudioContext && (new window.AudioContext());
	        }
	        if (!context) {
	            throw new Error("Tuna cannot initialize because this environment does not support web audio.");
	        }
	        connectify(context);
	        userContext = context;
	        userInstance = this;
	    }

	    function connectify(context) {
	        if (context.__connectified__ === true) return;

	        var gain = context.createGain(),
	            proto = Object.getPrototypeOf(Object.getPrototypeOf(gain)),
	            oconnect = proto.connect;

	        proto.connect = shimConnect;
	        context.__connectified__ = true; // Prevent overriding connect more than once

	        function shimConnect() {
	            var node = Array.prototype.shift.apply(arguments);
	            node = Super.isPrototypeOf ? (Super.isPrototypeOf(node) ? node.input : node) : (node.input || node);
	            arguments = Array.prototype.slice.call(arguments);
	            arguments.unshift(node);
	            oconnect.apply(this, arguments);
	            return node;
	        }
	    }

	    function dbToWAVolume(db) {
	        return Math.max(0, Math.round(100 * Math.pow(2, db / 6)) / 100);
	    }

	    function fmod(x, y) {
	        // http://kevin.vanzonneveld.net
	        // *     example 1: fmod(5.7, 1.3);
	        // *     returns 1: 0.5
	        var tmp, tmp2, p = 0,
	            pY = 0,
	            l = 0.0,
	            l2 = 0.0;

	        tmp = x.toExponential().match(/^.\.?(.*)e(.+)$/);
	        p = parseInt(tmp[2], 10) - (tmp[1] + "").length;
	        tmp = y.toExponential().match(/^.\.?(.*)e(.+)$/);
	        pY = parseInt(tmp[2], 10) - (tmp[1] + "").length;

	        if (pY > p) {
	            p = pY;
	        }

	        tmp2 = (x % y);

	        if (p < -100 || p > 20) {
	            // toFixed will give an out of bound error so we fix it like this:
	            l = Math.round(Math.log(tmp2) / Math.log(10));
	            l2 = Math.pow(10, l);

	            return (tmp2 / l2).toFixed(l - p) * l2;
	        } else {
	            return parseFloat(tmp2.toFixed(-p));
	        }
	    }

	    function sign(x) {
	        if (x === 0) {
	            return 1;
	        } else {
	            return Math.abs(x) / x;
	        }
	    }

	    function tanh(n) {
	        return (Math.exp(n) - Math.exp(-n)) / (Math.exp(n) + Math.exp(-n));
	    }

	    function initValue(userVal, defaultVal) {
	        return userVal === undefined ? defaultVal : userVal;
	    }

	    Tuna.prototype.Bitcrusher = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.bufferSize = properties.bufferSize || this.defaults.bufferSize.value;

	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.processor = userContext.createScriptProcessor(this.bufferSize, 1, 1);
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.processor);
	        this.processor.connect(this.output);

	        var phaser = 0,
	            last = 0,
	            input, output, step, i, length;
	        this.processor.onaudioprocess = function(e) {
	            input = e.inputBuffer.getChannelData(0),
	            output = e.outputBuffer.getChannelData(0),
	            step = Math.pow(1 / 2, this.bits);
	            length = input.length;
	            for (i = 0; i < length; i++) {
	                phaser += this.normfreq;
	                if (phaser >= 1.0) {
	                    phaser -= 1.0;
	                    last = step * Math.floor(input[i] / step + 0.5);
	                }
	                output[i] = last;
	            }
	        };

	        this.bits = properties.bits || this.defaults.bits.value;
	        this.normfreq = initValue(properties.normfreq, this.defaults.normfreq.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Bitcrusher.prototype = Object.create(Super, {
	        name: {
	            value: "Bitcrusher"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                bits: {
	                    value: 4,
	                    min: 1,
	                    max: 16,
	                    automatable: false,
	                    type: INT
	                },
	                bufferSize: {
	                    value: 4096,
	                    min: 256,
	                    max: 16384,
	                    automatable: false,
	                    type: INT
	                },
	                bypass: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                normfreq: {
	                    value: 0.1,
	                    min: 0.0001,
	                    max: 1.0,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        bits: {
	            enumerable: true,
	            get: function() {
	                return this.processor.bits;
	            },
	            set: function(value) {
	                this.processor.bits = value;
	            }
	        },
	        normfreq: {
	            enumerable: true,
	            get: function() {
	                return this.processor.normfreq;
	            },
	            set: function(value) {
	                this.processor.normfreq = value;
	            }
	        }
	    });

	    Tuna.prototype.Cabinet = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.convolver = this.newConvolver(properties.impulsePath ||
	            "../impulses/impulse_guitar.wav");
	        this.makeupNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.convolver.input);
	        this.convolver.output.connect(this.makeupNode);
	        this.makeupNode.connect(this.output);

	        this.makeupGain = initValue(properties.makeupGain, this.defaults
	            .makeupGain);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Cabinet.prototype = Object.create(Super, {
	        name: {
	            value: "Cabinet"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                makeupGain: {
	                    value: 1,
	                    min: 0,
	                    max: 20,
	                    automatable: true,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        makeupGain: {
	            enumerable: true,
	            get: function() {
	                return this.makeupNode.gain;
	            },
	            set: function(value) {
	                this.makeupNode.gain.value = value;
	            }
	        },
	        newConvolver: {
	            value: function(impulsePath) {
	                return new userInstance.Convolver({
	                    impulse: impulsePath,
	                    dryLevel: 0,
	                    wetLevel: 1
	                });
	            }
	        }
	    });

	    Tuna.prototype.Chorus = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.attenuator = this.activateNode = userContext.createGain();
	        this.splitter = userContext.createChannelSplitter(2);
	        this.delayL = userContext.createDelay();
	        this.delayR = userContext.createDelay();
	        this.feedbackGainNodeLR = userContext.createGain();
	        this.feedbackGainNodeRL = userContext.createGain();
	        this.merger = userContext.createChannelMerger(2);
	        this.output = userContext.createGain();

	        this.lfoL = new userInstance.LFO({
	            target: this.delayL.delayTime,
	            callback: pipe
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.delayR.delayTime,
	            callback: pipe
	        });

	        this.input.connect(this.attenuator);
	        this.attenuator.connect(this.output);
	        this.attenuator.connect(this.splitter);
	        this.splitter.connect(this.delayL, 0);
	        this.splitter.connect(this.delayR, 1);
	        this.delayL.connect(this.feedbackGainNodeLR);
	        this.delayR.connect(this.feedbackGainNodeRL);
	        this.feedbackGainNodeLR.connect(this.delayR);
	        this.feedbackGainNodeRL.connect(this.delayL);
	        this.delayL.connect(this.merger, 0, 0);
	        this.delayR.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);

	        this.feedback = initValue(properties.feedback, this.defaults.feedback
	            .value);
	        this.rate = initValue(properties.rate, this.defaults.rate.value);
	        this.delay = initValue(properties.delay, this.defaults.delay.value);
	        this.depth = initValue(properties.depth, this.defaults.depth.value);
	        this.lfoR.phase = Math.PI / 2;
	        this.attenuator.gain.value = 0.6934; // 1 / (10 ^ (((20 * log10(3)) / 3) / 20))
	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Chorus.prototype = Object.create(Super, {
	        name: {
	            value: "Chorus"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                feedback: {
	                    value: 0.4,
	                    min: 0,
	                    max: 0.95,
	                    automatable: false,
	                    type: FLOAT
	                },
	                delay: {
	                    value: 0.0045,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                depth: {
	                    value: 0.7,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                rate: {
	                    value: 1.5,
	                    min: 0,
	                    max: 8,
	                    automatable: false,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        delay: {
	            enumerable: true,
	            get: function() {
	                return this._delay;
	            },
	            set: function(value) {
	                this._delay = 0.0002 * (Math.pow(10, value) * 2);
	                this.lfoL.offset = this._delay;
	                this.lfoR.offset = this._delay;
	                this._depth = this._depth;
	            }
	        },
	        depth: {
	            enumerable: true,
	            get: function() {
	                return this._depth;
	            },
	            set: function(value) {
	                this._depth = value;
	                this.lfoL.oscillation = this._depth * this._delay;
	                this.lfoR.oscillation = this._depth * this._delay;
	            }
	        },
	        feedback: {
	            enumerable: true,
	            get: function() {
	                return this._feedback;
	            },
	            set: function(value) {
	                this._feedback = value;
	                this.feedbackGainNodeLR.gain.value = this._feedback;
	                this.feedbackGainNodeRL.gain.value = this._feedback;
	            }
	        },
	        rate: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        }
	    });

	    Tuna.prototype.Compressor = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.compNode = this.activateNode = userContext.createDynamicsCompressor();
	        this.makeupNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.compNode.connect(this.makeupNode);
	        this.makeupNode.connect(this.output);

	        this.automakeup = initValue(properties.automakeup, this.defaults
	            .automakeup
	            .value);
	        this.makeupGain = properties.makeupGain || this.defaults.makeupGain
	            .value;
	        this.threshold = initValue(properties.threshold, this.defaults.threshold
	            .value);
	        this.release = properties.release || this.defaults.release.value;
	        this.attack = initValue(properties.attack, this.defaults.attack
	            .value);
	        this.ratio = properties.ratio || this.defaults.ratio.value;
	        this.knee = initValue(properties.knee, this.defaults.knee.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Compressor.prototype = Object.create(Super, {
	        name: {
	            value: "Compressor"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                threshold: {
	                    value: -20,
	                    min: -60,
	                    max: 0,
	                    automatable: true,
	                    type: FLOAT
	                },
	                release: {
	                    value: 250,
	                    min: 10,
	                    max: 2000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                makeupGain: {
	                    value: 1,
	                    min: 1,
	                    max: 100,
	                    automatable: true,
	                    type: FLOAT
	                },
	                attack: {
	                    value: 1,
	                    min: 0,
	                    max: 1000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                ratio: {
	                    value: 4,
	                    min: 1,
	                    max: 50,
	                    automatable: true,
	                    type: FLOAT
	                },
	                knee: {
	                    value: 5,
	                    min: 0,
	                    max: 40,
	                    automatable: true,
	                    type: FLOAT
	                },
	                automakeup: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                bypass: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                }
	            }
	        },
	        computeMakeup: {
	            value: function() {
	                var magicCoefficient = 4,
	                    // raise me if the output is too hot
	                    c = this.compNode;
	                return -(c.threshold.value - c.threshold.value /
	                        c.ratio.value) /
	                    magicCoefficient;
	            }
	        },
	        automakeup: {
	            enumerable: true,
	            get: function() {
	                return this._automakeup;
	            },
	            set: function(value) {
	                this._automakeup = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        threshold: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.threshold;
	            },
	            set: function(value) {
	                this.compNode.threshold.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        ratio: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.ratio;
	            },
	            set: function(value) {
	                this.compNode.ratio.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        knee: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.knee;
	            },
	            set: function(value) {
	                this.compNode.knee.value = value;
	                if (this._automakeup) this.makeupGain = this.computeMakeup();
	            }
	        },
	        attack: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.attack;
	            },
	            set: function(value) {
	                this.compNode.attack.value = value / 1000;
	            }
	        },
	        release: {
	            enumerable: true,
	            get: function() {
	                return this.compNode.release;
	            },
	            set: function(value) {
	                this.compNode.release = value / 1000;
	            }
	        },
	        makeupGain: {
	            enumerable: true,
	            get: function() {
	                return this.makeupNode.gain;
	            },
	            set: function(value) {
	                this.makeupNode.gain.value = dbToWAVolume(value);
	            }
	        }
	    });

	    Tuna.prototype.Convolver = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.convolver = userContext.createConvolver();
	        this.dry = userContext.createGain();
	        this.filterLow = userContext.createBiquadFilter();
	        this.filterHigh = userContext.createBiquadFilter();
	        this.wet = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.filterLow);
	        this.activateNode.connect(this.dry);
	        this.filterLow.connect(this.filterHigh);
	        this.filterHigh.connect(this.convolver);
	        this.convolver.connect(this.wet);
	        this.wet.connect(this.output);
	        this.dry.connect(this.output);

	        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel
	            .value);
	        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel
	            .value);
	        this.highCut = properties.highCut || this.defaults.highCut.value;
	        this.buffer = properties.impulse ||
	            "../impulses/ir_rev_short.wav";
	        this.lowCut = properties.lowCut || this.defaults.lowCut.value;
	        this.level = initValue(properties.level, this.defaults.level.value);
	        this.filterHigh.type = "lowpass";
	        this.filterLow.type = "highpass";
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Convolver.prototype = Object.create(Super, {
	        name: {
	            value: "Convolver"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                highCut: {
	                    value: 22050,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                lowCut: {
	                    value: 20,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                dryLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                level: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                }
	            }
	        },
	        lowCut: {
	            get: function() {
	                return this.filterLow.frequency;
	            },
	            set: function(value) {
	                this.filterLow.frequency.value = value;
	            }
	        },
	        highCut: {
	            get: function() {
	                return this.filterHigh.frequency;
	            },
	            set: function(value) {
	                this.filterHigh.frequency.value = value;
	            }
	        },
	        level: {
	            get: function() {
	                return this.output.gain;
	            },
	            set: function(value) {
	                this.output.gain.value = value;
	            }
	        },
	        dryLevel: {
	            get: function() {
	                return this.dry.gain
	            },
	            set: function(value) {
	                this.dry.gain.value = value;
	            }
	        },
	        wetLevel: {
	            get: function() {
	                return this.wet.gain;
	            },
	            set: function(value) {
	                this.wet.gain.value = value;
	            }
	        },
	        buffer: {
	            enumerable: false,
	            get: function() {
	                return this.convolver.buffer;
	            },
	            set: function(impulse) {
	                var convolver = this.convolver,
	                    xhr = new XMLHttpRequest();
	                if (!impulse) {
	                    console.log("Tuna.Convolver.setBuffer: Missing impulse path!");
	                    return;
	                }
	                xhr.open("GET", impulse, true);
	                xhr.responseType = "arraybuffer";
	                xhr.onreadystatechange = function() {
	                    if (xhr.readyState === 4) {
	                        if (xhr.status < 300 && xhr.status > 199 || xhr.status === 302) {
	                            userContext.decodeAudioData(xhr.response, function(buffer) {
	                                convolver.buffer = buffer;
	                            }, function(e) {
	                                if (e) console.log("Tuna.Convolver.setBuffer: Error decoding data" + e);
	                            });
	                        }
	                    }
	                };
	                xhr.send(null);
	            }
	        }
	    });

	    Tuna.prototype.Delay = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.dry = userContext.createGain();
	        this.wet = userContext.createGain();
	        this.filter = userContext.createBiquadFilter();
	        this.delay = userContext.createDelay();
	        this.feedbackNode = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.delay);
	        this.activateNode.connect(this.dry);
	        this.delay.connect(this.filter);
	        this.filter.connect(this.feedbackNode);
	        this.feedbackNode.connect(this.delay);
	        this.feedbackNode.connect(this.wet);
	        this.wet.connect(this.output);
	        this.dry.connect(this.output);

	        this.delayTime = properties.delayTime || this.defaults.delayTime.value;
	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.wetLevel = initValue(properties.wetLevel, this.defaults.wetLevel.value);
	        this.dryLevel = initValue(properties.dryLevel, this.defaults.dryLevel.value);
	        this.cutoff = properties.cutoff || this.defaults.cutoff.value;
	        this.filter.type = "lowpass";
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Delay.prototype = Object.create(Super, {
	        name: {
	            value: "Delay"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                delayTime: {
	                    value: 100,
	                    min: 20,
	                    max: 1000,
	                    automatable: false,
	                    type: FLOAT
	                },
	                feedback: {
	                    value: 0.45,
	                    min: 0,
	                    max: 0.9,
	                    automatable: true,
	                    type: FLOAT
	                },
	                cutoff: {
	                    value: 20000,
	                    min: 20,
	                    max: 20000,
	                    automatable: true,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                },
	                dryLevel: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT
	                }
	            }
	        },
	        delayTime: {
	            enumerable: true,
	            get: function() {
	                return this.delay.delayTime;
	            },
	            set: function(value) {
	                this.delay.delayTime.value = value / 1000;
	            }
	        },
	        wetLevel: {
	            enumerable: true,
	            get: function() {
	                return this.wet.gain;
	            },
	            set: function(value) {
	                this.wet.gain.value = value;
	            }
	        },
	        dryLevel: {
	            enumerable: true,
	            get: function() {
	                return this.dry.gain;
	            },
	            set: function(value) {
	                this.dry.gain.value = value;
	            }
	        },
	        feedback: {
	            enumerable: true,
	            get: function() {
	                return this.feedbackNode.gain;
	            },
	            set: function(value) {
	                this.feedbackNode.gain.value = value;
	            }
	        },
	        cutoff: {
	            enumerable: true,
	            get: function() {
	                return this.filter.frequency;
	            },
	            set: function(value) {
	                this.filter.frequency.value = value;
	            }
	        }
	    });

	    Tuna.prototype.Filter = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.filter = userContext.createBiquadFilter();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.filter);
	        this.filter.connect(this.output);

	        this.frequency = properties.frequency || this.defaults.frequency
	            .value;
	        this.Q = properties.resonance || this.defaults.Q.value;
	        this.filterType = initValue(properties.filterType, this.defaults
	            .filterType
	            .value);
	        this.gain = initValue(properties.gain, this.defaults.gain.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Filter.prototype = Object.create(Super, {
	        name: {
	            value: "Filter"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                frequency: {
	                    value: 800,
	                    min: 20,
	                    max: 22050,
	                    automatable: true,
	                    type: FLOAT
	                },
	                Q: {
	                    value: 1,
	                    min: 0.001,
	                    max: 100,
	                    automatable: true,
	                    type: FLOAT
	                },
	                gain: {
	                    value: 0,
	                    min: -40,
	                    max: 40,
	                    automatable: true,
	                    type: FLOAT
	                },
	                bypass: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                filterType: {
	                    value: "lowpass",
	                    automatable: false,
	                    type: STRING
	                }
	            }
	        },
	        filterType: {
	            enumerable: true,
	            get: function() {
	                return this.filter.type;
	            },
	            set: function(value) {
	                this.filter.type = value;
	            }
	        },
	        Q: {
	            enumerable: true,
	            get: function() {
	                return this.filter.Q;
	            },
	            set: function(value) {
	                this.filter.Q.value = value;
	            }
	        },
	        gain: {
	            enumerable: true,
	            get: function() {
	                return this.filter.gain;
	            },
	            set: function(value) {
	                this.filter.gain.value = value;
	            }
	        },
	        frequency: {
	            enumerable: true,
	            get: function() {
	                return this.filter.frequency;
	            },
	            set: function(value) {
	                this.filter.frequency.value = value;
	            }
	        }
	    });

	    Tuna.prototype.MoogFilter = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.bufferSize = properties.bufferSize || this.defaults.bufferSize
	            .value;

	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.processor = userContext.createScriptProcessor(this.bufferSize,
	            1,
	            1);
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.processor);
	        this.processor.connect(this.output);

	        var in1, in2, in3, in4, out1, out2, out3, out4;
	        in1 = in2 = in3 = in4 = out1 = out2 = out3 = out4 = 0.0;
	        var input, output, f, fb, i, length;
	        this.processor.onaudioprocess = function(e) {
	            input = e.inputBuffer.getChannelData(0),
	                output = e.outputBuffer.getChannelData(0),
	                f = this.cutoff * 1.16,
	                inputFactor = 0.35013 * (f * f) * (f * f);
	            fb = this.resonance * (1.0 - 0.15 * f * f);
	            length = input.length;
	            for (i = 0; i < length; i++) {
	                input[i] -= out4 * fb;
	                input[i] *= inputFactor;
	                out1 = input[i] + 0.3 * in1 + (1 - f) * out1; // Pole 1
	                in1 = input[i];
	                out2 = out1 + 0.3 * in2 + (1 - f) * out2; // Pole 2
	                in2 = out1;
	                out3 = out2 + 0.3 * in3 + (1 - f) * out3; // Pole 3
	                in3 = out2;
	                out4 = out3 + 0.3 * in4 + (1 - f) * out4; // Pole 4
	                in4 = out3;
	                output[i] = out4;
	            }
	        };

	        this.cutoff = initValue(properties.cutoff, this.defaults.cutoff
	            .value);
	        this.resonance = initValue(properties.resonance, this.defaults.resonance
	            .value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.MoogFilter.prototype = Object.create(Super, {
	        name: {
	            value: "MoogFilter"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                bufferSize: {
	                    value: 4096,
	                    min: 256,
	                    max: 16384,
	                    automatable: false,
	                    type: INT
	                },
	                bypass: {
	                    value: false,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                cutoff: {
	                    value: 0.065,
	                    min: 0.0001,
	                    max: 1.0,
	                    automatable: false,
	                    type: FLOAT
	                },
	                resonance: {
	                    value: 3.5,
	                    min: 0.0,
	                    max: 4.0,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        cutoff: {
	            enumerable: true,
	            get: function() {
	                return this.processor.cutoff;
	            },
	            set: function(value) {
	                this.processor.cutoff = value;
	            }
	        },
	        resonance: {
	            enumerable: true,
	            get: function() {
	                return this.processor.resonance;
	            },
	            set: function(value) {
	                this.processor.resonance = value;
	            }
	        }
	    });

	    Tuna.prototype.Overdrive = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.inputDrive = userContext.createGain();
	        this.waveshaper = userContext.createWaveShaper();
	        this.outputDrive = userContext.createGain();
	        this.output = userContext.createGain();

	        this.activateNode.connect(this.inputDrive);
	        this.inputDrive.connect(this.waveshaper);
	        this.waveshaper.connect(this.outputDrive);
	        this.outputDrive.connect(this.output);

	        this.ws_table = new Float32Array(this.k_nSamples);
	        this.drive = initValue(properties.drive, this.defaults.drive.value);
	        this.outputGain = initValue(properties.outputGain, this.defaults
	            .outputGain
	            .value);
	        this.curveAmount = initValue(properties.curveAmount, this.defaults
	            .curveAmount
	            .value);
	        this.algorithmIndex = initValue(properties.algorithmIndex, this
	            .defaults
	            .algorithmIndex.value);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Overdrive.prototype = Object.create(Super, {
	        name: {
	            value: "Overdrive"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                drive: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT,
	                    scaled: true
	                },
	                outputGain: {
	                    value: 1,
	                    min: 0,
	                    max: 1,
	                    automatable: true,
	                    type: FLOAT,
	                    scaled: true
	                },
	                curveAmount: {
	                    value: 0.725,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                algorithmIndex: {
	                    value: 0,
	                    min: 0,
	                    max: 5,
	                    automatable: false,
	                    type: INT
	                }
	            }
	        },
	        k_nSamples: {
	            value: 8192
	        },
	        drive: {
	            get: function() {
	                return this.inputDrive.gain;
	            },
	            set: function(value) {
	                this._drive = value;
	            }
	        },
	        curveAmount: {
	            get: function() {
	                return this._curveAmount;
	            },
	            set: function(value) {
	                this._curveAmount = value;
	                if (this._algorithmIndex === undefined) {
	                    this._algorithmIndex = 0;
	                }
	                this.waveshaperAlgorithms[this._algorithmIndex]
	                    (this._curveAmount,
	                        this.k_nSamples, this.ws_table);
	                this.waveshaper.curve = this.ws_table;
	            }
	        },
	        outputGain: {
	            get: function() {
	                return this.outputDrive.gain;
	            },
	            set: function(value) {
	                this._outputGain = dbToWAVolume(value);
	            }
	        },
	        algorithmIndex: {
	            get: function() {
	                return this._algorithmIndex;
	            },
	            set: function(value) {
	                this._algorithmIndex = value;
	                this.curveAmount = this._curveAmount;
	            }
	        },
	        waveshaperAlgorithms: {
	            value: [
	                function(amount, n_samples, ws_table) {
	                    amount = Math.min(amount, 0.9999);
	                    var k = 2 * amount / (1 - amount),
	                        i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        ws_table[i] = (1 + k) * x / (1 + k * Math.abs(x));
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        y = ((0.5 * Math.pow((x + 1.4), 2)) - 1) * y >= 0 ? 5.8 : 1.2;
	                        ws_table[i] = tanh(y);
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y, a = 1 - amount;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        y = x < 0 ? -Math.pow(Math.abs(x), a + 0.04) : Math.pow(x, a);
	                        ws_table[i] = tanh(y * 2);
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var i, x, y, abx, a = 1 - amount > 0.99 ? 0.99 : 1 - amount;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        abx = Math.abs(x);
	                        if (abx < a) y = abx;
	                        else if (abx > a) y = a + (abx - a) / (1 + Math.pow((abx - a) / (1 - a), 2));
	                        else if (abx > 1) y = abx;
	                        ws_table[i] = sign(x) * y * (1 / ((a + 1) / 2));
	                    }
	                },
	                function(amount, n_samples, ws_table) { // fixed curve, amount doesn't do anything, the distortion is just from the drive
	                    var i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        if (x < -0.08905) {
	                            ws_table[i] = (-3 / 4) * (1 - (Math.pow((1 - (Math.abs(x) - 0.032857)), 12)) + (1 / 3) * (Math.abs(x) -
	                                0.032847)) + 0.01;
	                        } else if (x >= -0.08905 && x < 0.320018) {
	                            ws_table[i] = (-6.153 * (x * x)) + 3.9375 * x;
	                        } else {
	                            ws_table[i] = 0.630035;
	                        }
	                    }
	                },
	                function(amount, n_samples, ws_table) {
	                    var a = 2 + Math.round(amount * 14),
	                        // we go from 2 to 16 bits, keep in mind for the UI
	                        bits = Math.round(Math.pow(2, a - 1)),
	                        // real number of quantization steps divided by 2
	                        i, x;
	                    for (i = 0; i < n_samples; i++) {
	                        x = i * 2 / n_samples - 1;
	                        ws_table[i] = Math.round(x * bits) / bits;
	                    }
	                }
	            ]
	        }
	    });

	    Tuna.prototype.Phaser = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.splitter = this.activateNode = userContext.createChannelSplitter(2);
	        this.filtersL = [];
	        this.filtersR = [];
	        this.feedbackGainNodeL = userContext.createGain();
	        this.feedbackGainNodeR = userContext.createGain();
	        this.merger = userContext.createChannelMerger(2);
	        this.filteredSignal = userContext.createGain();
	        this.output = userContext.createGain();
	        this.lfoL = new userInstance.LFO({
	            target: this.filtersL,
	            callback: this.callback
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.filtersR,
	            callback: this.callback
	        });

	        var i = this.stage;
	        while (i--) {
	            this.filtersL[i] = userContext.createBiquadFilter();
	            this.filtersR[i] = userContext.createBiquadFilter();
	            this.filtersL[i].type = "allpass";
	            this.filtersR[i].type = "allpass";
	        }
	        this.input.connect(this.splitter);
	        this.input.connect(this.output);
	        this.splitter.connect(this.filtersL[0], 0, 0);
	        this.splitter.connect(this.filtersR[0], 1, 0);
	        this.connectInOrder(this.filtersL);
	        this.connectInOrder(this.filtersR);
	        this.filtersL[this.stage - 1].connect(this.feedbackGainNodeL);
	        this.filtersL[this.stage - 1].connect(this.merger, 0, 0);
	        this.filtersR[this.stage - 1].connect(this.feedbackGainNodeR);
	        this.filtersR[this.stage - 1].connect(this.merger, 0, 1);
	        this.feedbackGainNodeL.connect(this.filtersL[0]);
	        this.feedbackGainNodeR.connect(this.filtersR[0]);
	        this.merger.connect(this.output);

	        this.rate = initValue(properties.rate, this.defaults.rate.value);
	        this.baseModulationFrequency = properties.baseModulationFrequency || this.defaults.baseModulationFrequency.value;
	        this.depth = initValue(properties.depth, this.defaults.depth.value);
	        this.feedback = initValue(properties.feedback, this.defaults.feedback.value);
	        this.stereoPhase = initValue(properties.stereoPhase, this.defaults.stereoPhase.value);

	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Phaser.prototype = Object.create(Super, {
	        name: {
	            value: "Phaser"
	        },
	        stage: {
	            value: 4
	        },
	        defaults: {
	            writable: true,
	            value: {
	                rate: {
	                    value: 0.1,
	                    min: 0,
	                    max: 8,
	                    automatable: false,
	                    type: FLOAT
	                },
	                depth: {
	                    value: 0.6,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                feedback: {
	                    value: 0.7,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                stereoPhase: {
	                    value: 40,
	                    min: 0,
	                    max: 180,
	                    automatable: false,
	                    type: FLOAT
	                },
	                baseModulationFrequency: {
	                    value: 700,
	                    min: 500,
	                    max: 1500,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        callback: {
	            value: function(filters, value) {
	                for (var stage = 0; stage < 4; stage++) {
	                    filters[stage].frequency.value = value;
	                }
	            }
	        },
	        depth: {
	            get: function() {
	                return this._depth;
	            },
	            set: function(value) {
	                this._depth = value;
	                this.lfoL.oscillation = this._baseModulationFrequency * this._depth;
	                this.lfoR.oscillation = this._baseModulationFrequency * this._depth;
	            }
	        },
	        rate: {
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        },
	        baseModulationFrequency: {
	            enumerable: true,
	            get: function() {
	                return this._baseModulationFrequency;
	            },
	            set: function(value) {
	                this._baseModulationFrequency = value;
	                this.lfoL.offset = this._baseModulationFrequency;
	                this.lfoR.offset = this._baseModulationFrequency;
	                this._depth = this._depth;
	            }
	        },
	        feedback: {
	            get: function() {
	                return this._feedback;
	            },
	            set: function(value) {
	                this._feedback = value;
	                this.feedbackGainNodeL.gain.value = this._feedback;
	                this.feedbackGainNodeR.gain.value = this._feedback;
	            }
	        },
	        stereoPhase: {
	            get: function() {
	                return this._stereoPhase;
	            },
	            set: function(value) {
	                this._stereoPhase = value;
	                var newPhase = this.lfoL._phase + this._stereoPhase *
	                    Math.PI /
	                    180;
	                newPhase = fmod(newPhase, 2 * Math.PI);
	                this.lfoR._phase = newPhase;
	            }
	        }
	    });

	    Tuna.prototype.PingPongDelay = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.wetLevel = userContext.createGain();
	        this.stereoToMonoMix = userContext.createGain();
	        this.feedbackLevel = userContext.createGain();
	        this.output = userContext.createGain();
	        this.delayLeft = userContext.createDelay();
	        this.delayRight = userContext.createDelay();

	        this.activateNode = userContext.createGain();
	        this.splitter = userContext.createChannelSplitter(2);
	        this.merger = userContext.createChannelMerger(2);

	        this.activateNode.connect(this.splitter);
	        this.splitter.connect(this.stereoToMonoMix, 0, 0);
	        this.splitter.connect(this.stereoToMonoMix, 1, 0);
	        this.stereoToMonoMix.gain.value = .5;
	        this.stereoToMonoMix.connect(this.wetLevel);
	        this.wetLevel.connect(this.delayLeft);
	        this.feedbackLevel.connect(this.delayLeft);
	        this.delayLeft.connect(this.delayRight);
	        this.delayRight.connect(this.feedbackLevel);
	        this.delayLeft.connect(this.merger, 0, 0);
	        this.delayRight.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);
	        this.activateNode.connect(this.output);

	        this.delayTimeLeft = properties.delayTimeLeft !== undefined ? properties.delayTimeLeft : this.defaults.delayTimeLeft.value;
	        this.delayTimeRight = properties.delayTimeRight !== undefined ? properties.delayTimeRight : this.defaults.delayTimeRight.value;
	        this.feedbackLevel.gain.value = properties.feedback !== undefined ? properties.feedback : this.defaults.feedback.value;
	        this.wetLevel.gain.value = properties.wetLevel !== undefined ? properties.wetLevel : this.defaults.wetLevel.value;
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.PingPongDelay.prototype = Object.create(Super, {
	        name: {
	            value: "PingPongDelay"
	        },
	        delayTimeLeft: {
	            enumerable: true,
	            get: function() {
	                return this._delayTimeLeft;
	            },
	            set: function(value) {
	                this._delayTimeLeft = value;
	                this.delayLeft.delayTime.value = value / 1000;
	            }
	        },
	        delayTimeRight: {
	            enumerable: true,
	            get: function() {
	                return this._delayTimeRight;
	            },
	            set: function(value) {
	                this._delayTimeRight = value;
	                this.delayRight.delayTime.value = value / 1000;
	            }
	        },
	        defaults: {
	            writable: true,
	            value: {
	                delayTimeLeft: {
	                    value: 200,
	                    min: 1,
	                    max: 10000,
	                    automatable: false,
	                    type: INT
	                },
	                delayTimeRight: {
	                    value: 400,
	                    min: 1,
	                    max: 10000,
	                    automatable: false,
	                    type: INT
	                },
	                feedback: {
	                    value: 0.3,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                wetLevel: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        }
	    });

	    Tuna.prototype.Tremolo = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.splitter = this.activateNode = userContext.createChannelSplitter(
	                2),
	            this.amplitudeL = userContext.createGain(), this.amplitudeR =
	            userContext.createGain(), this.merger = userContext.createChannelMerger(
	                2), this.output = userContext.createGain();
	        this.lfoL = new userInstance.LFO({
	            target: this.amplitudeL.gain,
	            callback: pipe
	        });
	        this.lfoR = new userInstance.LFO({
	            target: this.amplitudeR.gain,
	            callback: pipe
	        });

	        this.input.connect(this.splitter);
	        this.splitter.connect(this.amplitudeL, 0);
	        this.splitter.connect(this.amplitudeR, 1);
	        this.amplitudeL.connect(this.merger, 0, 0);
	        this.amplitudeR.connect(this.merger, 0, 1);
	        this.merger.connect(this.output);

	        this.rate = properties.rate || this.defaults.rate.value;
	        this.intensity = initValue(properties.intensity, this.defaults.intensity
	            .value);
	        this.stereoPhase = initValue(properties.stereoPhase, this.defaults
	            .stereoPhase
	            .value);

	        this.lfoL.offset = 1 - (this.intensity / 2);
	        this.lfoR.offset = 1 - (this.intensity / 2);
	        this.lfoL.phase = this.stereoPhase * Math.PI / 180;

	        this.lfoL.activate(true);
	        this.lfoR.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.Tremolo.prototype = Object.create(Super, {
	        name: {
	            value: "Tremolo"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                intensity: {
	                    value: 0.3,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                stereoPhase: {
	                    value: 0,
	                    min: 0,
	                    max: 180,
	                    automatable: false,
	                    type: FLOAT
	                },
	                rate: {
	                    value: 5,
	                    min: 0.1,
	                    max: 11,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        intensity: {
	            enumerable: true,
	            get: function() {
	                return this._intensity;
	            },
	            set: function(value) {
	                this._intensity = value;
	                this.lfoL.offset = 1 - this._intensity / 2;
	                this.lfoR.offset = 1 - this._intensity / 2;
	                this.lfoL.oscillation = this._intensity;
	                this.lfoR.oscillation = this._intensity;
	            }
	        },
	        rate: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._rate = value;
	                this.lfoL.frequency = this._rate;
	                this.lfoR.frequency = this._rate;
	            }
	        },
	        stereoPhase: {
	            enumerable: true,
	            get: function() {
	                return this._rate;
	            },
	            set: function(value) {
	                this._stereoPhase = value;
	                var newPhase = this.lfoL._phase + this._stereoPhase *
	                    Math.PI /
	                    180;
	                newPhase = fmod(newPhase, 2 * Math.PI);
	                this.lfoR.phase = newPhase;
	            }
	        }
	    });

	    Tuna.prototype.WahWah = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.activateNode = userContext.createGain();
	        this.envelopeFollower = new userInstance.EnvelopeFollower({
	            target: this,
	            callback: function(context, value) {
	                context.sweep = value;
	            }
	        });
	        this.filterBp = userContext.createBiquadFilter();
	        this.filterPeaking = userContext.createBiquadFilter();
	        this.output = userContext.createGain();

	        //Connect AudioNodes
	        this.activateNode.connect(this.filterBp);
	        this.filterBp.connect(this.filterPeaking);
	        this.filterPeaking.connect(this.output);

	        //Set Properties
	        this.init();
	        this.automode = initValue(properties.enableAutoMode, this.defaults
	            .automode
	            .value);
	        this.resonance = properties.resonance || this.defaults.resonance
	            .value;
	        this.sensitivity = initValue(properties.sensitivity, this.defaults
	            .sensitivity
	            .value);
	        this.baseFrequency = initValue(properties.baseFrequency, this.defaults
	            .baseFrequency
	            .value);
	        this.excursionOctaves = properties.excursionOctaves || this.defaults
	            .excursionOctaves
	            .value;
	        this.sweep = initValue(properties.sweep, this.defaults.sweep.value);

	        this.activateNode.gain.value = 2;
	        this.envelopeFollower.activate(true);
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.WahWah.prototype = Object.create(Super, {
	        name: {
	            value: "WahWah"
	        },
	        defaults: {
	            writable: true,
	            value: {
	                automode: {
	                    value: true,
	                    automatable: false,
	                    type: BOOLEAN
	                },
	                baseFrequency: {
	                    value: 0.5,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                excursionOctaves: {
	                    value: 2,
	                    min: 1,
	                    max: 6,
	                    automatable: false,
	                    type: FLOAT
	                },
	                sweep: {
	                    value: 0.2,
	                    min: 0,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                },
	                resonance: {
	                    value: 10,
	                    min: 1,
	                    max: 100,
	                    automatable: false,
	                    type: FLOAT
	                },
	                sensitivity: {
	                    value: 0.5,
	                    min: -1,
	                    max: 1,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        activateCallback: {
	            value: function(value) {
	                this.automode = value;
	            }
	        },
	        automode: {
	            get: function() {
	                return this._automode;
	            },
	            set: function(value) {
	                this._automode = value;
	                if (value) {
	                    this.activateNode.connect(this.envelopeFollower.input);
	                    this.envelopeFollower.activate(true);
	                } else {
	                    this.envelopeFollower.activate(false);
	                    this.activateNode.disconnect();
	                    this.activateNode.connect(this.filterBp);
	                }
	            }
	        },
	        filterFreqTimeout: {
	            value: 0
	        },
	        setFilterFreq: {
	            value: function() {
	                try {
	                    this.filterBp.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
	                    this.filterPeaking.frequency.value = this._baseFrequency + this._excursionFrequency * this._sweep;
	                } catch (e) {
	                    clearTimeout(this.filterFreqTimeout);
	                    //put on the next cycle to let all init properties be set
	                    this.filterFreqTimeout = setTimeout(function() {
	                        this.setFilterFreq();
	                    }.bind(this), 0);
	                }
	            }
	        },
	        sweep: {
	            enumerable: true,
	            get: function() {
	                return this._sweep.value;
	            },
	            set: function(value) {
	                this._sweep = Math.pow(value > 1 ? 1 : value <
	                    0 ? 0 :
	                    value,
	                    this._sensitivity);
	                this.setFilterFreq();
	            }
	        },
	        baseFrequency: {
	            enumerable: true,
	            get: function() {
	                return this._baseFrequency;
	            },
	            set: function(value) {
	                this._baseFrequency = 50 * Math.pow(10, value *
	                    2);
	                this._excursionFrequency = Math.min(userContext
	                    .sampleRate /
	                    2,
	                    this.baseFrequency * Math.pow(2, this._excursionOctaves)
	                );
	                this.setFilterFreq();
	            }
	        },
	        excursionOctaves: {
	            enumerable: true,
	            get: function() {
	                return this._excursionOctaves;
	            },
	            set: function(value) {
	                this._excursionOctaves = value;
	                this._excursionFrequency = Math.min(userContext
	                    .sampleRate /
	                    2,
	                    this.baseFrequency * Math.pow(2, this._excursionOctaves)
	                );
	                this.setFilterFreq();
	            }
	        },
	        sensitivity: {
	            enumerable: true,
	            get: function() {
	                return this._sensitivity;
	            },
	            set: function(value) {
	                this._sensitivity = Math.pow(10, value);
	            }
	        },
	        resonance: {
	            enumerable: true,
	            get: function() {
	                return this._resonance;
	            },
	            set: function(value) {
	                this._resonance = value;
	                this.filterPeaking.Q = this._resonance;
	            }
	        },
	        init: {
	            value: function() {
	                this.output.gain.value = 1;
	                this.filterPeaking.type = "peaking";
	                this.filterBp.type = "bandpass";
	                this.filterPeaking.frequency.value = 100;
	                this.filterPeaking.gain.value = 20;
	                this.filterPeaking.Q.value = 5;
	                this.filterBp.frequency.value = 100;
	                this.filterBp.Q.value = 1;
	            }
	        }
	    });

	    Tuna.prototype.EnvelopeFollower = function(properties) {
	        if (!properties) {
	            properties = this.getDefaults();
	        }
	        this.input = userContext.createGain();
	        this.jsNode = this.output = userContext.createScriptProcessor(
	            this.buffersize,
	            1, 1);

	        this.input.connect(this.output);

	        this.attackTime = initValue(properties.attackTime, this.defaults
	            .attackTime
	            .value);
	        this.releaseTime = initValue(properties.releaseTime, this.defaults
	            .releaseTime
	            .value);
	        this._envelope = 0;
	        this.target = properties.target || {};
	        this.callback = properties.callback || function() {};
	    };
	    Tuna.prototype.EnvelopeFollower.prototype = Object.create(Super, {
	        name: {
	            value: "EnvelopeFollower"
	        },
	        defaults: {
	            value: {
	                attackTime: {
	                    value: 0.003,
	                    min: 0,
	                    max: 0.5,
	                    automatable: false,
	                    type: FLOAT
	                },
	                releaseTime: {
	                    value: 0.5,
	                    min: 0,
	                    max: 0.5,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        buffersize: {
	            value: 256
	        },
	        envelope: {
	            value: 0
	        },
	        sampleRate: {
	            value: 44100
	        },
	        attackTime: {
	            enumerable: true,
	            get: function() {
	                return this._attackTime;
	            },
	            set: function(value) {
	                this._attackTime = value;
	                this._attackC = Math.exp(-1 / this._attackTime *
	                    this.sampleRate /
	                    this.buffersize);
	            }
	        },
	        releaseTime: {
	            enumerable: true,
	            get: function() {
	                return this._releaseTime;
	            },
	            set: function(value) {
	                this._releaseTime = value;
	                this._releaseC = Math.exp(-1 / this._releaseTime *
	                    this.sampleRate /
	                    this.buffersize);
	            }
	        },
	        callback: {
	            get: function() {
	                return this._callback;
	            },
	            set: function(value) {
	                if (typeof value === "function") {
	                    this._callback = value;
	                } else {
	                    console.error("tuna.js: " + this.name +
	                        ": Callback must be a function!");
	                }
	            }
	        },
	        target: {
	            get: function() {
	                return this._target;
	            },
	            set: function(value) {
	                this._target = value;
	            }
	        },
	        activate: {
	            value: function(doActivate) {
	                this.activated = doActivate;
	                if (doActivate) {
	                    this.jsNode.connect(userContext.destination);
	                    this.jsNode.onaudioprocess = this.returnCompute(
	                        this);
	                } else {
	                    this.jsNode.disconnect();
	                    this.jsNode.onaudioprocess = null;
	                }
	            }
	        },
	        returnCompute: {
	            value: function(instance) {
	                return function(event) {
	                    instance.compute(event);
	                };
	            }
	        },
	        compute: {
	            value: function(event) {
	                var count = event.inputBuffer.getChannelData(0)
	                    .length,
	                    channels = event.inputBuffer.numberOfChannels,
	                    current, chan, rms, i;
	                chan = rms = i = 0;
	                if (channels > 1) { //need to mixdown
	                    for (i = 0; i < count; ++i) {
	                        for (; chan < channels; ++chan) {
	                            current = event.inputBuffer.getChannelData(chan)[i];
	                            rms += (current * current) / channels;
	                        }
	                    }
	                } else {
	                    for (i = 0; i < count; ++i) {
	                        current = event.inputBuffer.getChannelData(0)[i];
	                        rms += (current * current);
	                    }
	                }
	                rms = Math.sqrt(rms);

	                if (this._envelope < rms) {
	                    this._envelope *= this._attackC;
	                    this._envelope += (1 - this._attackC) * rms;
	                } else {
	                    this._envelope *= this._releaseC;
	                    this._envelope += (1 - this._releaseC) *
	                        rms;
	                }
	                this._callback(this._target, this._envelope);
	            }
	        }
	    });

	    Tuna.prototype.LFO = function(properties) {
	        //Instantiate AudioNode
	        this.output = userContext.createScriptProcessor(256, 1, 1);
	        this.activateNode = userContext.destination;

	        //Set Properties
	        this.frequency = initValue(properties.frequency, this.defaults.frequency
	            .value);
	        this.offset = initValue(properties.offset, this.defaults.offset.value);
	        this.oscillation = initValue(properties.oscillation, this.defaults
	            .oscillation
	            .value);
	        this.phase = initValue(properties.phase, this.defaults.phase.value);
	        this.target = properties.target || {};
	        this.output.onaudioprocess = this.callback(properties.callback ||
	            function() {});
	        this.bypass = properties.bypass || false;
	    };
	    Tuna.prototype.LFO.prototype = Object.create(Super, {
	        name: {
	            value: "LFO"
	        },
	        bufferSize: {
	            value: 256
	        },
	        sampleRate: {
	            value: 44100
	        },
	        defaults: {
	            value: {
	                frequency: {
	                    value: 1,
	                    min: 0,
	                    max: 20,
	                    automatable: false,
	                    type: FLOAT
	                },
	                offset: {
	                    value: 0.85,
	                    min: 0,
	                    max: 22049,
	                    automatable: false,
	                    type: FLOAT
	                },
	                oscillation: {
	                    value: 0.3,
	                    min: -22050,
	                    max: 22050,
	                    automatable: false,
	                    type: FLOAT
	                },
	                phase: {
	                    value: 0,
	                    min: 0,
	                    max: 2 * Math.PI,
	                    automatable: false,
	                    type: FLOAT
	                }
	            }
	        },
	        frequency: {
	            get: function() {
	                return this._frequency;
	            },
	            set: function(value) {
	                this._frequency = value;
	                this._phaseInc = 2 * Math.PI * this._frequency *
	                    this.bufferSize /
	                    this.sampleRate;
	            }
	        },
	        offset: {
	            get: function() {
	                return this._offset;
	            },
	            set: function(value) {
	                this._offset = value;
	            }
	        },
	        oscillation: {
	            get: function() {
	                return this._oscillation;
	            },
	            set: function(value) {
	                this._oscillation = value;
	            }
	        },
	        phase: {
	            get: function() {
	                return this._phase;
	            },
	            set: function(value) {
	                this._phase = value;
	            }
	        },
	        target: {
	            get: function() {
	                return this._target;
	            },
	            set: function(value) {
	                this._target = value;
	            }
	        },
	        activate: {
	            value: function(doActivate) {
	                if (!doActivate) {
	                    this.output.disconnect(userContext.destination);
	                } else {
	                    this.output.connect(userContext.destination);
	                }
	            }
	        },
	        callback: {
	            value: function(callback) {
	                var that = this;
	                return function() {
	                    that._phase += that._phaseInc;
	                    if (that._phase > 2 * Math.PI) {
	                        that._phase = 0;
	                    }
	                    callback(that._target, that._offset +
	                        that._oscillation *
	                        Math.sin(that._phase));
	                };
	            }
	        }
	    });

	    Tuna.toString = Tuna.prototype.toString = function() {
	        return "Please visit https://github.com/Theodeus/tuna/wiki for instructions on how to use Tuna.js";
	    };
	})(this);


/***/ }
/******/ ]);