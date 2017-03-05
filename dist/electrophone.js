/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	__webpack_require__(40);
	
	var _ElectroPhone = __webpack_require__(7);
	
	var _ElectroPhone2 = _interopRequireDefault(_ElectroPhone);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var win = window || {};
	win.EP = _ElectroPhone2.default;
	
	exports.default = _ElectroPhone2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var TYPES = {
	    MASTER: 'Master',
	    OSCILLATOR: 'Oscillator',
	    NOISE: 'Noise',
	    MODULATOR: 'Modulator',
	    ENVELOPE: 'Envelope',
	    PAN: 'Pan',
	    FILTER: 'Filter',
	    DELAY: 'Delay',
	    PINGPONGDELAY: 'PingPongDelay',
	    TREMOLO: 'Tremolo',
	    OVERDRIVE: 'Overdrive',
	    BITCRUSHER: 'Bitcrusher',
	    MOOGFILTER: 'MoogFilter'
	},
	    CONST = {
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
	    FILTER_ALLPASS: 'allpass',
	
	    MODULATOR_TARGET_FREQ: 'frequency',
	    MODULATOR_TARGET_DETUNE: 'detune',
	
	    ENVELOPE_TARGET_GAIN: 'gain',
	    ENVELOPE_TARGET_FREQ: 'frequency',
	    ENVELOPE_TARGET_DETUNE: 'detune'
	};
	
	exports.TYPES = TYPES;
	exports.CONST = CONST;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var _Module2 = __webpack_require__(3);
	
	var _Module3 = _interopRequireDefault(_Module2);
	
	var _EffectManager = __webpack_require__(9);
	
	var _EffectManager2 = _interopRequireDefault(_EffectManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Effect = function (_Module) {
	    _inherits(Effect, _Module);
	
	    function Effect(audioContext, props, name) {
	        _classCallCheck(this, Effect);
	
	        var _this = _possibleConstructorReturn(this, _Module.call(this, audioContext, props, name));
	
	        _this.main = null;
	        _this.mainEffect = null;
	        return _this;
	    }
	
	    Effect.prototype.setMainEffect = function setMainEffect(type, mainEffect, props) {
	        var effectManager = (0, _EffectManager2.default)(this.audioContext);
	        this.main = new effectManager[type](props);
	        this.mainEffect = this.main[mainEffect];
	    };
	
	    Effect.prototype.setMainProperties = function setMainProperties(props) {
	        var _this2 = this;
	
	        Object.keys(props).forEach(function (e) {
	            if (_this2.main[e]) {
	                _this2.main[e] = props[e];
	            }
	        });
	    };
	
	    Effect.prototype.createGain = function createGain() {
	        return false;
	    };
	
	    Effect.prototype.getLineIn = function getLineIn(sourceType, source) {
	        if (sourceType === _Constants.TYPES.MODULATOR) {
	            return this.mainEffect[source.target];
	        } else {
	            return this.main.input;
	        }
	    };
	
	    Effect.prototype.getLineOut = function getLineOut() {
	        return this.main.output;
	    };
	
	    Effect.prototype.getEnvelopeTarget = function getEnvelopeTarget(target) {
	        var ret = null;
	
	        if (target === 'gain') {
	            ret = this.main.output.gain;
	        } else if (this.main && this.mainEffect && this.mainEffect[target]) {
	            ret = this.main.filter[target];
	        }
	
	        return ret;
	    };
	
	    return Effect;
	}(_Module3.default);
	
	exports.default = Effect;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _properties = __webpack_require__(6);
	
	var Props = _interopRequireWildcard(_properties);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Module = function () {
	    function Module(audioContext, props, name) {
	        _classCallCheck(this, Module);
	
	        this.name = name;
	        this.audioContext = audioContext;
	        this.gain = null;
	        this.envelope = null;
	        this.main = null;
	
	        this.setupProperties(props);
	
	        this.createGain(this.level);
	    }
	
	    Module.prototype.toString = function toString() {
	        return this.name;
	    };
	
	    Module.prototype.setupProperties = function setupProperties(props) {
	        var _this = this;
	
	        var properties = props || {},
	            propsHandler = this.toString() + 'Props',
	            specificProps = Props[propsHandler],
	            moduleProperties = void 0;
	
	        moduleProperties = _extends({}, Props.DefaultProps, specificProps);
	        Object.keys(moduleProperties).forEach(function (e) {
	            _this.setProperty(e, properties[e], moduleProperties[e]);
	        });
	    };
	
	    Module.prototype.getRealProperties = function getRealProperties(propName) {
	        switch (propName) {
	            case 'level':
	                return 'gain';
	            case 'freq':
	                return 'frequency';
	            case 'wave':
	                return 'type';
	            case 'q':
	                return 'Q';
	            case 'link':
	                return null;
	            default:
	                return propName;
	        }
	    };
	
	    Module.prototype.updateProperties = function updateProperties(props) {
	        var _this2 = this;
	
	        Object.keys(props).forEach(function (p) {
	            var realProp = _this2.getRealProperties(p);
	
	            if (_this2.main && realProp && _this2[p] !== props[p]) {
	                if (realProp === 'gain' && _this2.gain && _this2.gain.gain) {
	                    var l = props[p] >= 0 ? props[p] % 101 : 100;
	                    _this2.gain.gain.value = l / 100;
	                } else if (_this2.main[realProp] !== undefined && _this2.main[realProp].value !== undefined) {
	                    _this2.main[realProp].value = props[p];
	                } else if (_this2.main[realProp] !== undefined) {
	                    _this2.main[realProp] = props[p];
	                }
	            }
	        });
	    };
	
	    Module.prototype.setProperty = function setProperty(propKey, propVal, propConfig) {
	        this[propKey] = null;
	        if (propConfig.type && (typeof propVal === 'undefined' ? 'undefined' : _typeof(propVal)) === propConfig.type) {
	            this[propKey] = propVal;
	        } else if (propConfig.defaultValue !== undefined) {
	            this[propKey] = propConfig.defaultValue;
	        }
	    };
	
	    Module.prototype.createGain = function createGain(level) {
	        var l = level >= 0 ? level % 101 : 100;
	        this.gain = this.audioContext.createGain();
	        this.envelope = this.audioContext.createGain();
	        this.gain.gain.value = l / 100;
	        this.envelope.gain.value = 1;
	
	        this.envelope.connect(this.gain);
	    };
	
	    Module.prototype.disconnect = function disconnect() {
	        this.gain.disconnect();
	    };
	
	    Module.prototype.getLineIn = function getLineIn() {
	        return this.main;
	    };
	
	    Module.prototype.getLineOut = function getLineOut() {
	        return this.gain;
	    };
	
	    Module.prototype.getEnvelopeTarget = function getEnvelopeTarget(target) {
	        var ret = null;
	
	        if (this.main && this.main[target]) {
	            ret = this.main[target];
	        } else if (target === 'gain' && this.gain) {
	            ret = this.envelope.gain;
	        }
	        return ret;
	    };
	
	    return Module;
	}();
	
	exports.default = Module;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var _Module2 = __webpack_require__(3);
	
	var _Module3 = _interopRequireDefault(_Module2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SoundSource = function (_Module) {
	    _inherits(SoundSource, _Module);
	
	    function SoundSource(audioContext, props, name) {
	        _classCallCheck(this, SoundSource);
	
	        var _this = _possibleConstructorReturn(this, _Module.call(this, audioContext, props, name));
	
	        _this.defaultLineInProperty = 'frequency';
	        return _this;
	    }
	
	    SoundSource.prototype.setDetune = function setDetune() {
	        if (this.main && this.main.detune) {
	            this.main.detune.value = this.detune;
	        }
	    };
	
	    SoundSource.prototype.noteOn = function noteOn() {
	        this.main.start(0);
	    };
	
	    SoundSource.prototype.noteOff = function noteOff(release) {
	        this.main.stop(release);
	    };
	
	    SoundSource.prototype.getLineIn = function getLineIn(sourceType, source) {
	        if (sourceType === _Constants.TYPES.MODULATOR) {
	            return this.main[source.target];
	        } else {
	            return this.main[this.defaultLineInProperty];
	        }
	    };
	
	    return SoundSource;
	}(_Module3.default);
	
	exports.default = SoundSource;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Master = __webpack_require__(19);
	
	Object.defineProperty(exports, 'Master', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Master).default;
	  }
	});
	
	var _Envelope = __webpack_require__(18);
	
	Object.defineProperty(exports, 'Envelope', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Envelope).default;
	  }
	});
	
	var _Pan = __webpack_require__(20);
	
	Object.defineProperty(exports, 'Pan', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Pan).default;
	  }
	});
	
	var _Oscillator = __webpack_require__(23);
	
	Object.defineProperty(exports, 'Oscillator', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Oscillator).default;
	  }
	});
	
	var _Modulator = __webpack_require__(21);
	
	Object.defineProperty(exports, 'Modulator', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Modulator).default;
	  }
	});
	
	var _Noise = __webpack_require__(22);
	
	Object.defineProperty(exports, 'Noise', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Noise).default;
	  }
	});
	
	var _Filter = __webpack_require__(13);
	
	Object.defineProperty(exports, 'Filter', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Filter).default;
	  }
	});
	
	var _Delay = __webpack_require__(12);
	
	Object.defineProperty(exports, 'Delay', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Delay).default;
	  }
	});
	
	var _PingPongDelay = __webpack_require__(16);
	
	Object.defineProperty(exports, 'PingPongDelay', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PingPongDelay).default;
	  }
	});
	
	var _Tremolo = __webpack_require__(17);
	
	Object.defineProperty(exports, 'Tremolo', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Tremolo).default;
	  }
	});
	
	var _Overdrive = __webpack_require__(15);
	
	Object.defineProperty(exports, 'Overdrive', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Overdrive).default;
	  }
	});
	
	var _Bitcrusher = __webpack_require__(11);
	
	Object.defineProperty(exports, 'Bitcrusher', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Bitcrusher).default;
	  }
	});
	
	var _MoogFilter = __webpack_require__(14);
	
	Object.defineProperty(exports, 'MoogFilter', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_MoogFilter).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _DefaultProps = __webpack_require__(25);
	
	Object.defineProperty(exports, 'DefaultProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DefaultProps).default;
	  }
	});
	
	var _ModulatorProps = __webpack_require__(29);
	
	Object.defineProperty(exports, 'ModulatorProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_ModulatorProps).default;
	  }
	});
	
	var _EnvelopeProps = __webpack_require__(27);
	
	Object.defineProperty(exports, 'EnvelopeProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_EnvelopeProps).default;
	  }
	});
	
	var _PanProps = __webpack_require__(34);
	
	Object.defineProperty(exports, 'PanProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PanProps).default;
	  }
	});
	
	var _OscillatorProps = __webpack_require__(32);
	
	Object.defineProperty(exports, 'OscillatorProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_OscillatorProps).default;
	  }
	});
	
	var _NoiseProps = __webpack_require__(31);
	
	Object.defineProperty(exports, 'NoiseProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_NoiseProps).default;
	  }
	});
	
	var _FilterProps = __webpack_require__(28);
	
	Object.defineProperty(exports, 'FilterProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_FilterProps).default;
	  }
	});
	
	var _DelayProps = __webpack_require__(26);
	
	Object.defineProperty(exports, 'DelayProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_DelayProps).default;
	  }
	});
	
	var _PingPongDelayProps = __webpack_require__(35);
	
	Object.defineProperty(exports, 'PingPongDelayProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_PingPongDelayProps).default;
	  }
	});
	
	var _TremoloProps = __webpack_require__(36);
	
	Object.defineProperty(exports, 'TremoloProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_TremoloProps).default;
	  }
	});
	
	var _OverdriveProps = __webpack_require__(33);
	
	Object.defineProperty(exports, 'OverdriveProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_OverdriveProps).default;
	  }
	});
	
	var _BitcrusherProps = __webpack_require__(24);
	
	Object.defineProperty(exports, 'BitcrusherProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_BitcrusherProps).default;
	  }
	});
	
	var _MoogFilterProps = __webpack_require__(30);
	
	Object.defineProperty(exports, 'MoogFilterProps', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_MoogFilterProps).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _modules = __webpack_require__(5);
	
	var Modules = _interopRequireWildcard(_modules);
	
	var _properties = __webpack_require__(6);
	
	var Props = _interopRequireWildcard(_properties);
	
	var _Constants = __webpack_require__(1);
	
	var _Synth = __webpack_require__(8);
	
	var _Synth2 = _interopRequireDefault(_Synth);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
	    methods = Object.keys(Modules);
	var synth = void 0;
	
	/**
	 * ElectroPhone Library.
	 * @example
	 * const AudioCtx = window.AudioContext || window.webkitAudioContext;
	 * const synth = new ElectroPhone(new AudioCtx(), { spectrum: false });
	 */
	
	var ElectroPhone = function () {
	    /**
	     * Create a playable web synthesizer instance.
	     * @param {AudioContext} audioContext - Web Audio Context instance.
	     * @param {ElectroPhoneProperties} [properties] - synth properties.
	     */
	    function ElectroPhone(audioContext, props) {
	        _classCallCheck(this, ElectroPhone);
	
	        var properties = props || {};
	        synth = new _Synth2.default(audioContext, properties);
	        this.isPlaying = false;
	    }
	
	    /**
	     * Returns current synth modules configuration object.
	     * @return {Object} current synth modules configuration.
	     * @property {Object} master - the master ModuleProperties.
	     * @property {Object} adsr - the adsr ModuleProperties.
	     * @property {ModuleProperties} <module_id> - one ModuleProperties for each created module.
	     */
	
	
	    ElectroPhone.prototype.getModules = function getModules() {
	        return _extends({}, synth.modulesConfig);
	    };
	
	    /**
	     * Create a new synth module.
	     * @param {String} id - the module identifier.
	     * @param {String} type - the type of module.
	     * @param {Object} properties - module properties.
	     * @return {ElectroPhone}
	     * @throws {Error} throw error when module with id is already created.
	     */
	
	
	    ElectroPhone.prototype.create = function create(id, type, properties) {
	        var currentModule = this.getModules()[id];
	        if (currentModule) {
	            throw new Error('Module ' + id + ' already created. Use update method instead.');
	        }
	        synth.module(type, id, properties);
	        return this;
	    };
	
	    /**
	     * Update the synth module by id.
	     * @param {String} id - the module identifier.
	     * @param {Object} properties - module properties.
	     * @return {ElectroPhone}
	     * @throws {Error} throw error when module with id is not found.
	     */
	
	
	    ElectroPhone.prototype.update = function update(id, properties) {
	        var currentModule = this.getModules()[id];
	        if (!currentModule) {
	            throw new Error('Module ' + id + ' not found. Use create method instead.');
	        }
	        synth.module(currentModule.type, id, properties);
	        return this;
	    };
	
	    /**
	     * Update the master module.
	     * @param {Object} properties - master properties.
	     * @return {ElectroPhone}
	     */
	
	
	    ElectroPhone.prototype.master = function master(properties) {
	        synth.module(_Constants.TYPES.MASTER, _Constants.CONST.MASTER, properties);
	        return this;
	    };
	
	    /**
	     * Update the ADSR module.
	     * @param {Object} properties - ADSR (Envelope) properties
	     * @return {ElectroPhone}
	     */
	
	
	    ElectroPhone.prototype.adsr = function adsr(properties) {
	        synth.module(_Constants.TYPES.ENVELOPE, _Constants.CONST.ADSR, properties);
	        return this;
	    };
	
	    /**
	     * Destroy the synth module by id.
	     * @param {String} id - the module identifier.
	     * @return {ElectroPhone}
	     * @throws {Error} throw error when module with id is not found.
	     */
	
	
	    ElectroPhone.prototype.destroy = function destroy(id) {
	        var currentModule = this.getModules()[id];
	        if (!currentModule) {
	            throw new Error('Module ' + id + ' not found.');
	        }
	        synth.destroyModule(id);
	        return this;
	    };
	
	    /**
	     * Start playing the input frequency.
	     * @param {Number} frequency - the frequency value.
	     * @return {ElectroPhone}
	     */
	
	
	    ElectroPhone.prototype.play = function play(frequency) {
	        if (+frequency >= 0) {
	            synth.play(frequency);
	            this.isPlaying = true;
	        }
	        return this;
	    };
	
	    /**
	     * Stop playing the input frequency.
	     * @param {Number} frequency - the frequency value.
	     * @return {ElectroPhone}
	     */
	
	
	    ElectroPhone.prototype.stop = function stop(frequency) {
	        if (+frequency >= 0) {
	            synth.stop(frequency);
	            this.isPlaying = false;
	        }
	        return this;
	    };
	
	    /**
	     * Link two modules, connect source module to target module.
	     * @param {String} source - the source module id.
	     * @param {String} target - the target module id.
	     * @return {ElectroPhone}
	     * @throws {Error} throw error when source is master.
	     * @throws {Error} throw error when source module is not found.
	     * @throws {Error} throw error when target module is not found.
	     */
	
	
	    ElectroPhone.prototype.link = function link(source, target) {
	        if (source === _Constants.CONST.MASTER) {
	            throw new Error('Module master can\'t be linked to any modules.');
	        }
	        if (!synth.modulesConfig[source]) {
	            throw new Error('Source module ' + source + ' not found.');
	        }
	
	        if (!synth.modulesConfig[target]) {
	            throw new Error('Target module ' + target + ' not found.');
	        }
	        synth.modulesConfig[source].props.link = target;
	        return this;
	    };
	
	    /**
	     * Get module properties by type.
	     * @param {String} moduleType - module='' type, taken from ElectroPhone.TYPES.
	     * @return {Array}
	     */
	
	
	    ElectroPhone.getModuleProperties = function getModuleProperties() {
	        var moduleType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	        var moduleProps = Props[moduleType + 'Props'] || {};
	
	        return [].concat(Object.keys(moduleProps).map(function (prop) {
	            return _extends({}, moduleProps[prop], { name: prop });
	        }), Object.keys(Props.DefaultProps).map(function (prop) {
	            return _extends({}, Props.DefaultProps[prop], { name: prop });
	        }));
	    };
	
	    /**
	     * Describe all ElectroPhone modules with parameters configuration.
	     * @return {Array}
	     */
	
	
	    ElectroPhone.describeModules = function describeModules() {
	        return [].concat(methods).filter(function (e) {
	            return e !== '__esModule';
	        }).reduce(function (result, e) {
	            return [].concat(result, [{
	                type: e,
	                properties: ElectroPhone.getModuleProperties(e)
	            }]);
	        }, []);
	    };
	
	    /**
	     * Get frequency float value calculated from given note and octave.
	     * @param {String} note - note char indicator. sharp char for semi-tones.
	     * @param {Number} octave - octave number.
	     * @return {Number}
	     */
	
	
	    ElectroPhone.getFrequency = function getFrequency(note, octave) {
	        var octaveD = parseInt(octave, 10) - 4,
	            noteD = notes.indexOf(note) - notes.indexOf('A'),
	            delta = 12 * octaveD,
	            exp = noteD + delta,
	            freq = 440 * Math.pow(1.059463, exp);
	        return parseFloat(freq.toFixed(3)) || 0;
	    };
	
	    /**
	     * Get complete notes list.
	     * @return {Array}
	     */
	
	
	    ElectroPhone.getNotes = function getNotes() {
	        return notes;
	    };
	
	    return ElectroPhone;
	}();
	
	ElectroPhone.CONST = _Constants.CONST;
	ElectroPhone.TYPES = _Constants.TYPES;
	
	exports.default = ElectroPhone;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var _Voice = __webpack_require__(10);
	
	var _Voice2 = _interopRequireDefault(_Voice);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Synth Class
	 * @example
	 * const AudioCtx = window.AudioContext || window.webkitAudioContext;
	 * const synth = new Synth(new AudioCtx(), { spectrum: false });
	 */
	var Synth = function () {
	
	    /**
	     * Create a synthesizer instance.
	     * @param {AudioContext} audioContext - Web Audio Context instance.
	     * @param {ElectroPhoneProperties} [properties] - synth properties.
	     */
	    function Synth(audioContext, props) {
	        _classCallCheck(this, Synth);
	
	        var properties = props || {};
	
	        this.audioContext = audioContext;
	        this.modulesConfig = {};
	        this.voices = {};
	        this.spectrum = properties.spectrum || false;
	        this.updateSpectrum = properties.updateSpectrum || null;
	        this.resetSpectrum = properties.resetSpectrum || null;
	
	        this.analyser = null;
	        this.javascriptNode = null;
	
	        if (this.audioContext && typeof this.audioContext.createGainNode === 'function') {
	            this.audioContext.createGain = this.audioContext.createGainNode;
	        }
	        if (this.audioContext && typeof this.audioContext.createDelayNode === 'function') {
	            this.audioContext.createDelay = this.audioContext.createDelayNode;
	        }
	
	        if (this.spectrum === true) {
	            this.createSpectrum();
	        }
	
	        this.module('Master', _Constants.CONST.MASTER, {
	            level: 100
	        });
	
	        this.module('Envelope', _Constants.CONST.ADSR, {
	            link: _Constants.CONST.MASTER,
	            target: 'gain',
	            level: 100,
	            attack: null,
	            decay: 0.1,
	            sustain: 100,
	            release: 5
	        });
	    }
	
	    /**
	     * Create a spectrum node for the synth instance.
	     */
	
	
	    Synth.prototype.createSpectrum = function createSpectrum() {
	        var SMOOTHING = 0.8,
	            FFT_SIZE = 2048;
	
	        if (this.audioContext) {
	            this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);
	            this.javascriptNode.connect(this.audioContext.destination);
	
	            this.analyser = this.audioContext.createAnalyser();
	            this.analyser.smoothingTimeConstant = SMOOTHING;
	            this.analyser.fftSize = FFT_SIZE;
	            this.analyser.minDecibels = -160;
	            this.analyser.maxDecibels = 0;
	
	            this.analyser.connect(this.audioContext.destination);
	        }
	    };
	
	    /**
	     * Module method to create | update modules.
	     * @param {String} type - the type of module.
	     * @param {String} label - the module identifier.
	     * @param {Object} props={} - module properties
	     */
	
	
	    Synth.prototype.module = function module(type, label) {
	        var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	        if (!type || type.constructor !== String) {
	            throw new Error('Synth Module :: missing type');
	        }
	
	        if (!label || label.constructor !== String) {
	            throw new Error('Synth Module :: missing label');
	        }
	
	        if (!this.modulesConfig[label]) {
	            this.addModule(type, label, props);
	        } else {
	            this.updateModule(label, props);
	        }
	    };
	
	    /**
	     * Add a new module.
	     * @param {String} type - the type of module.
	     * @param {String} label - the module identifier.
	     * @param {Object} props={} - module properties.
	     * @throws {Error} throw error when module with label is already created.
	     */
	
	
	    Synth.prototype.addModule = function addModule(type, label) {
	        var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	        if (this.modulesConfig[label]) {
	            throw new Error('Module ' + label + ' already created. Use updateModule method instead.');
	        }
	        this.modulesConfig[label] = {
	            type: type,
	            props: props
	        };
	    };
	
	    /**
	     * Update the module identified by label and update all running voices.
	     * @param {String} label - the module identifier.
	     * @param {Object} props={} - module properties.
	     * @throws {Error} throw error when module with label is not found.
	     */
	
	
	    Synth.prototype.updateModule = function updateModule(label) {
	        var _this = this;
	
	        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        if (!this.modulesConfig[label]) {
	            throw new Error('Module ' + label + ' not found. Use addModule method instead.');
	        }
	        Object.keys(props).forEach(function (e) {
	            if (_this.modulesConfig[label].props[e] !== undefined) {
	                _this.modulesConfig[label].props[e] = props[e];
	            }
	        });
	
	        Object.keys(this.voices).forEach(function (e) {
	            _this.voices[e].updateModule(label, props);
	        });
	    };
	
	    /**
	     * Destroy the module identified by label and remove running voices.
	     * @param {String} label - the module identifier.
	     * @throws {Error} throw error when module with label is not found.
	     */
	
	
	    Synth.prototype.destroyModule = function destroyModule(label) {
	        var _this2 = this;
	
	        if (!this.modulesConfig[label]) {
	            throw new Error('Module ' + label + ' not found.');
	        }
	        delete this.modulesConfig[label];
	        Object.keys(this.voices).forEach(function (e) {
	            _this2.voices[e].removeModule(label);
	        });
	    };
	
	    /**
	     * Start playing the input note and start spectrum data if necessary.
	     * @param {Number} note - the note frequency value.
	     */
	
	
	    Synth.prototype.play = function play(note) {
	        var _this3 = this;
	
	        var frequencyData = void 0,
	            freqBufferLength = this.analyser && this.analyser.frequencyBinCount ? this.analyser.frequencyBinCount : 1024;
	
	        if (!this.voices[note]) {
	            this.voices[note] = new _Voice2.default(note, this.audioContext, this.modulesConfig, this.analyser);
	            this.voices[note].noteOn();
	        }
	        if (this.spectrum === true && this.javascriptNode) {
	
	            frequencyData = new Uint8Array(freqBufferLength);
	
	            this.javascriptNode.onaudioprocess = function () {
	                _this3.analyser.getByteFrequencyData(frequencyData);
	                if (_this3.updateSpectrum && typeof _this3.updateSpectrum === 'function') {
	                    _this3.updateSpectrum(frequencyData);
	                }
	            };
	        }
	    };
	
	    /**
	     * Stop playing the input note and stop spectrum data if necessary.
	     * @param {Number} note - the note frequency value.
	     */
	
	
	    Synth.prototype.stop = function stop(note) {
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
	    };
	
	    return Synth;
	}();
	
	exports.default = Synth;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _tunajs = __webpack_require__(41);
	
	var _tunajs2 = _interopRequireDefault(_tunajs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var EffectManager = function EffectManager(audioContext) {
	  return new _tunajs2.default(audioContext);
	};
	
	exports.default = EffectManager;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _modules = __webpack_require__(5);
	
	var Modules = _interopRequireWildcard(_modules);
	
	var _SoundSource = __webpack_require__(4);
	
	var _SoundSource2 = _interopRequireDefault(_SoundSource);
	
	var _Constants = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Voice Class
	 * @example
	 * const v = new Voice(440, AudioContext, { master: { ... }, adsr: { ... } }, null);
	 */
	var Voice = function () {
	    function Voice(note, audioContext, modulesConfig, analyser) {
	        _classCallCheck(this, Voice);
	
	        this.note = note;
	        this.modulesConfig = modulesConfig;
	        this.modules = {};
	        this.soundSources = [];
	        this.master = null;
	        this.analyser = analyser || null;
	
	        if (audioContext) {
	            this.setupModules(audioContext);
	            this.linkModules();
	        }
	    }
	
	    Voice.prototype.setupModules = function setupModules(audioContext) {
	        var _this = this;
	
	        var modConf = void 0,
	            m = void 0;
	
	        Object.keys(this.modulesConfig).forEach(function (mod) {
	            modConf = _this.modulesConfig[mod];
	            if (modConf.type && modConf.props) {
	                m = new Modules[modConf.type](audioContext, modConf.props, modConf.type);
	                _this.modules[mod] = {
	                    type: modConf.type,
	                    instance: m
	                };
	
	                if (m.instance instanceof _SoundSource2.default) {
	                    _this.soundSources.push(m);
	                } else if (modConf.type === _Constants.TYPES.MASTER) {
	                    _this.master = m;
	                }
	            }
	        });
	    };
	
	    Voice.prototype.updateModule = function updateModule(moduleId, props) {
	        if (this.modules[moduleId] && this.modules[moduleId].instance) {
	            this.modules[moduleId].instance.updateProperties(props);
	        }
	    };
	
	    Voice.prototype.removeModule = function removeModule(moduleId) {
	        if (this.modules[moduleId] && this.modules[moduleId].instance) {
	            this.modules[moduleId].instance.disconnect();
	        }
	    };
	
	    Voice.prototype.linkModules = function linkModules() {
	        var _this2 = this;
	
	        Object.keys(this.modules).forEach(function (mod) {
	            var currentModule = _this2.modules[mod].instance,
	                currentModuleType = _this2.modules[mod].type,
	                destinationModule = void 0,
	                source = void 0,
	                dest = void 0;
	
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
	    };
	
	    Voice.prototype.noteOn = function noteOn() {
	        var _this3 = this;
	
	        var m = void 0,
	            dest = void 0;
	
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
	            if (m && typeof m.noteOn === 'function') {
	                m.noteOn();
	            }
	        });
	    };
	
	    Voice.prototype.noteOff = function noteOff() {
	        var _this4 = this;
	
	        var release = 0,
	            adsr = this.modules.adsr ? this.modules.adsr.instance : null,
	            m = void 0,
	            dest = void 0;
	
	        if (adsr) {
	            release = adsr.getReleaseTime();
	        }
	
	        Object.keys(this.modules).forEach(function (e) {
	            m = _this4.modules[e].instance;
	            if (m && typeof m.resetEnvelope === 'function') {
	                dest = _this4.modules[m.link] ? _this4.modules[m.link].instance : null;
	                m.resetEnvelope(dest);
	            }
	        });
	        Object.keys(this.modules).forEach(function (e) {
	            m = _this4.modules[e].instance;
	            if (m && typeof m.noteOff === 'function') {
	                m.noteOff(release);
	            }
	        });
	    };
	
	    return Voice;
	}();
	
	exports.default = Voice;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bitcrusher = function (_Effect) {
	    _inherits(Bitcrusher, _Effect);
	
	    function Bitcrusher(audioContext, props, name) {
	        _classCallCheck(this, Bitcrusher);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('Bitcrusher', 'output');
	        _this.setMainProperties({
	            bits: _this.bits,
	            normfreq: _this.normfreq,
	            bufferSize: _this.bufferSize
	        });
	        return _this;
	    }
	
	    return Bitcrusher;
	}(_Effect3.default);
	
	exports.default = Bitcrusher;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Delay = function (_Effect) {
	    _inherits(Delay, _Effect);
	
	    function Delay(audioContext, props, name) {
	        _classCallCheck(this, Delay);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('Delay', 'filter');
	        _this.setMainProperties({
	            dryLevel: _this.dry,
	            wetLevel: _this.wet,
	            feedback: _this.feedback,
	            cutoff: _this.cutoff,
	            delayTime: _this.delayTime,
	            bypass: _this.bypass
	        });
	        return _this;
	    }
	
	    return Delay;
	}(_Effect3.default);
	
	exports.default = Delay;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Filter = function (_Effect) {
	    _inherits(Filter, _Effect);
	
	    function Filter(audioContext, props, name) {
	        _classCallCheck(this, Filter);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('Filter', 'filter');
	        _this.setMainProperties({
	            frequency: _this.freq,
	            Q: _this.q,
	            gain: _this.filterGain,
	            filterType: _this.filterType,
	            bypass: _this.bypass
	        });
	        return _this;
	    }
	
	    return Filter;
	}(_Effect3.default);
	
	exports.default = Filter;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MoogFilter = function (_Effect) {
	    _inherits(MoogFilter, _Effect);
	
	    function MoogFilter(audioContext, props, name) {
	        _classCallCheck(this, MoogFilter);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('MoogFilter', 'output');
	        _this.setMainProperties({
	            cutoff: _this.cutoff,
	            resonance: _this.resonance,
	            bufferSize: _this.bufferSize
	        });
	        return _this;
	    }
	
	    return MoogFilter;
	}(_Effect3.default);
	
	exports.default = MoogFilter;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Overdrive = function (_Effect) {
	    _inherits(Overdrive, _Effect);
	
	    function Overdrive(audioContext, props, name) {
	        _classCallCheck(this, Overdrive);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('Overdrive', 'output');
	        _this.setMainProperties({
	            outputGain: _this.outputGain,
	            drive: _this.drive,
	            curveAmount: _this.curveAmount,
	            algorithmIndex: _this.algorithmIndex,
	            bypass: _this.bypass
	        });
	        return _this;
	    }
	
	    return Overdrive;
	}(_Effect3.default);
	
	exports.default = Overdrive;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PingPongDelay = function (_Effect) {
	    _inherits(PingPongDelay, _Effect);
	
	    function PingPongDelay(audioContext, props, name) {
	        _classCallCheck(this, PingPongDelay);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('PingPongDelay', 'delayLeft');
	        _this.setMainProperties({
	            dryLevel: _this.dry,
	            wetLevel: _this.wet,
	            feedback: _this.feedback,
	            delayTimeLeft: _this.delayTimeLeft,
	            delayTimeRight: _this.delayTimeRight,
	            bypass: _this.bypass
	        });
	        return _this;
	    }
	
	    return PingPongDelay;
	}(_Effect3.default);
	
	exports.default = PingPongDelay;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Effect2 = __webpack_require__(2);
	
	var _Effect3 = _interopRequireDefault(_Effect2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tremolo = function (_Effect) {
	    _inherits(Tremolo, _Effect);
	
	    function Tremolo(audioContext, props, name) {
	        _classCallCheck(this, Tremolo);
	
	        var _this = _possibleConstructorReturn(this, _Effect.call(this, audioContext, props, name));
	
	        _this.setMainEffect('Tremolo', 'output');
	        _this.setMainProperties({
	            intensity: _this.intensity,
	            rate: _this.rate,
	            stereoPhase: _this.stereoPhase,
	            bypass: _this.bypass
	        });
	        return _this;
	    }
	
	    return Tremolo;
	}(_Effect3.default);
	
	exports.default = Tremolo;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Module2 = __webpack_require__(3);
	
	var _Module3 = _interopRequireDefault(_Module2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Envelope = function (_Module) {
	    _inherits(Envelope, _Module);
	
	    function Envelope(audioContext, props, name) {
	        _classCallCheck(this, Envelope);
	
	        return _possibleConstructorReturn(this, _Module.call(this, audioContext, props, name));
	    }
	
	    Envelope.prototype.createGain = function createGain() {
	        return false;
	    };
	
	    Envelope.prototype.getReleaseTime = function getReleaseTime() {
	        var now = this.audioContext.currentTime,
	            release = void 0;
	
	        if (this.release) {
	            release = now + this.release / 10.0;
	        } else {
	            release = now + 0.2;
	        }
	
	        return release;
	    };
	
	    Envelope.prototype.setEnvelope = function setEnvelope(dest) {
	        var now = this.audioContext.currentTime,
	            envelope = this.level % 101,
	            attackLevel = void 0,
	            sustainLevel = void 0,
	            attackEnd = this.attack / 20.0,
	            t = void 0;
	
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
	
	            if (t && t.setValueAtTime && t.linearRampToValueAtTime && t.setTargetAtTime) {
	                t.setValueAtTime(0, now);
	                t.linearRampToValueAtTime(attackLevel, now + attackEnd);
	                t.setTargetAtTime(sustainLevel, now + attackEnd, this.decay / 100.0);
	            }
	        }
	    };
	
	    Envelope.prototype.resetEnvelope = function resetEnvelope(dest) {
	        var now = this.audioContext.currentTime,
	            t = void 0;
	
	        if (dest && typeof dest.getEnvelopeTarget === 'function') {
	            t = dest.getEnvelopeTarget(this.target);
	
	            if (t && t.cancelScheduledValues && t.setValueAtTime && t.setTargetAtTime) {
	                t.cancelScheduledValues(now);
	                if (this.target === 'gain') {
	                    t.setValueAtTime(t.value, now);
	                }
	                t.setTargetAtTime(0, now, this.release / 100.0);
	            }
	        }
	    };
	
	    Envelope.prototype.getLineOut = function getLineOut() {
	        return false;
	    };
	
	    return Envelope;
	}(_Module3.default);
	
	exports.default = Envelope;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Module2 = __webpack_require__(3);
	
	var _Module3 = _interopRequireDefault(_Module2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Master = function (_Module) {
	    _inherits(Master, _Module);
	
	    function Master(audioContext, props, name) {
	        _classCallCheck(this, Master);
	
	        var _this = _possibleConstructorReturn(this, _Module.call(this, audioContext, props, name));
	
	        _this.main = _this.audioContext.createGain();
	        _this.link = null;
	        return _this;
	    }
	
	    Master.prototype.getLineIn = function getLineIn() {
	        return this.main;
	    };
	
	    Master.prototype.lineOut = function lineOut(analyser) {
	        this.main.connect(this.envelope);
	        if (analyser) {
	            this.gain.connect(analyser);
	        } else {
	            this.gain.connect(this.audioContext.destination);
	        }
	    };
	
	    return Master;
	}(_Module3.default);
	
	exports.default = Master;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Module2 = __webpack_require__(3);
	
	var _Module3 = _interopRequireDefault(_Module2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pan = function (_Module) {
	    _inherits(Pan, _Module);
	
	    function Pan(audioContext, props, name) {
	        _classCallCheck(this, Pan);
	
	        var _this = _possibleConstructorReturn(this, _Module.call(this, audioContext, props, name));
	
	        _this.main = _this.audioContext.createStereoPanner();
	        _this.main.pan.value = _this.pan;
	        _this.main.connect(_this.envelope);
	        return _this;
	    }
	
	    return Pan;
	}(_Module3.default);
	
	exports.default = Pan;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _SoundSource2 = __webpack_require__(4);
	
	var _SoundSource3 = _interopRequireDefault(_SoundSource2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Modulator = function (_SoundSource) {
	    _inherits(Modulator, _SoundSource);
	
	    function Modulator(audioContext, props, name) {
	        _classCallCheck(this, Modulator);
	
	        var _this = _possibleConstructorReturn(this, _SoundSource.call(this, audioContext, props, name));
	
	        _this.main = _this.audioContext.createOscillator();
	        _this.main.type = _this.wave;
	        _this.main.connect(_this.envelope);
	        return _this;
	    }
	
	    Modulator.prototype.setNote = function setNote() {
	        var f = this.freq % 11;
	        this.main.frequency.value = f;
	    };
	
	    return Modulator;
	}(_SoundSource3.default);
	
	exports.default = Modulator;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var _SoundSource2 = __webpack_require__(4);
	
	var _SoundSource3 = _interopRequireDefault(_SoundSource2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Noise = function (_SoundSource) {
	    _inherits(Noise, _SoundSource);
	
	    function Noise(audioContext, props, name) {
	        _classCallCheck(this, Noise);
	
	        var _this = _possibleConstructorReturn(this, _SoundSource.call(this, audioContext, props, name));
	
	        _this.defaultLineInProperty = 'detune';
	        _this.main = _this.audioContext.createBufferSource();
	        _this.main.connect(_this.envelope);
	
	        _this.setDetune();
	        _this.setColor();
	        return _this;
	    }
	
	    Noise.prototype.setColor = function setColor() {
	        switch (this.color) {
	            case _Constants.CONST.NOISE_WHITE:
	                this.main.buffer = this.white();
	                break;
	            case _Constants.CONST.NOISE_PINK:
	                this.main.buffer = this.pink();
	                break;
	            case _Constants.CONST.NOISE_BROWN:
	                this.main.buffer = this.brown();
	                break;
	            default:
	                throw new Error('Invalid Noise color: ' + this.color);
	        }
	    };
	
	    Noise.prototype.white = function white() {
	        var noiseBuffer = this.getNoiseBuffer(),
	            bufferSize = this.getBufferSize(),
	            output = noiseBuffer.getChannelData(0);
	
	        for (var i = 0; i < bufferSize; i++) {
	            output[i] = Math.random() * 2 - 1;
	        }
	
	        return noiseBuffer;
	    };
	
	    Noise.prototype.pink = function pink() {
	        var b0 = void 0,
	            b1 = void 0,
	            b2 = void 0,
	            b3 = void 0,
	            b4 = void 0,
	            b5 = void 0,
	            b6 = void 0,
	            noiseBuffer = this.getNoiseBuffer(),
	            bufferSize = this.getBufferSize(),
	            output = noiseBuffer.getChannelData(0),
	            white = void 0;
	
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
	    };
	
	    Noise.prototype.brown = function brown() {
	        var noiseBuffer = this.getNoiseBuffer(),
	            bufferSize = this.getBufferSize(),
	            output = noiseBuffer.getChannelData(0),
	            lastOut = 0.0,
	            white = void 0;
	
	        for (var i = 0; i < bufferSize; i++) {
	            white = white = Math.random() * 2 - 1;
	
	            output[i] = (lastOut + 0.02 * white) / 1.02;
	            lastOut = output[i];
	            output[i] *= 3.5;
	        }
	
	        return noiseBuffer;
	    };
	
	    Noise.prototype.getBufferSize = function getBufferSize() {
	        return 2 * this.audioContext.sampleRate;
	    };
	
	    Noise.prototype.getNoiseBuffer = function getNoiseBuffer() {
	        var bufferSize = this.getBufferSize(),
	            noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
	        return noiseBuffer;
	    };
	
	    Noise.prototype.setNote = function setNote() {
	        this.main.loop = true;
	    };
	
	    return Noise;
	}(_SoundSource3.default);
	
	exports.default = Noise;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _SoundSource2 = __webpack_require__(4);
	
	var _SoundSource3 = _interopRequireDefault(_SoundSource2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Oscillator = function (_SoundSource) {
	    _inherits(Oscillator, _SoundSource);
	
	    function Oscillator(audioContext, props, name) {
	        _classCallCheck(this, Oscillator);
	
	        var _this = _possibleConstructorReturn(this, _SoundSource.call(this, audioContext, props, name));
	
	        _this.main = _this.audioContext.createOscillator();
	        _this.main.type = _this.wave;
	        _this.main.connect(_this.envelope);
	
	        _this.setDetune();
	        return _this;
	    }
	
	    Oscillator.prototype.setNote = function setNote(note) {
	        this.main.frequency.value = note;
	    };
	
	    return Oscillator;
	}(_SoundSource3.default);
	
	exports.default = Oscillator;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var BitcrusherProps = {
	    bits: {
	        type: 'number',
	        bounds: [1, 16],
	        defaultValue: 4
	    },
	    normfreq: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.1
	    },
	    bufferSize: {
	        type: 'number',
	        bounds: [256, 16384],
	        defaultValue: 4096
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};
	
	exports.default = BitcrusherProps;

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var DefaultProps = {
	    link: {
	        type: 'string',
	        defaultValue: ''
	    },
	    level: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 100
	    }
	};
	
	exports.default = DefaultProps;

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var DelayProps = {
	    dry: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 1
	    },
	    wet: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.5
	    },
	    feedback: {
	        type: 'number',
	        bounds: [0, 0.9],
	        step: 0.1,
	        defaultValue: 0.4
	    },
	    cutoff: {
	        type: 'number',
	        bounds: [20, 20000],
	        defaultValue: 440
	    },
	    delayTime: {
	        type: 'number',
	        bounds: [20, 1000],
	        defaultValue: 100
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};
	
	exports.default = DelayProps;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var EnvelopeProps = {
	    target: {
	        type: 'string',
	        bounds: [_Constants.CONST.ENVELOPE_TARGET_GAIN, _Constants.CONST.ENVELOPE_TARGET_FREQ, _Constants.CONST.ENVELOPE_TARGET_DETUNE],
	        defaultValue: _Constants.CONST.ENVELOPE_TARGET_GAIN
	    },
	    attack: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 0
	    },
	    decay: {
	        type: 'number',
	        bounds: [1, 100],
	        defaultValue: 1
	    },
	    sustain: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 100
	    },
	    release: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 5
	    }
	};
	
	exports.default = EnvelopeProps;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var FilterProps = {
	    freq: {
	        type: 'number',
	        bounds: [20, 20000],
	        defaultValue: 440
	    },
	    q: {
	        type: 'number',
	        bounds: [0, 100],
	        defaultValue: 10
	    },
	    filterGain: {
	        type: 'number',
	        bounds: [-40, 40],
	        defaultValue: 0
	    },
	    filterType: {
	        type: 'string',
	        bounds: [_Constants.CONST.FILTER_ALLPASS, _Constants.CONST.FILTER_BANDPASS, _Constants.CONST.FILTER_HIGHPASS, _Constants.CONST.FILTER_HIGHSHELF, _Constants.CONST.FILTER_LOWPASS, _Constants.CONST.FILTER_LOWSHELF, _Constants.CONST.FILTER_NOTCH, _Constants.CONST.FILTER_PEAKING],
	        defaultValue: _Constants.CONST.FILTER_LOWPASS
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};
	
	exports.default = FilterProps;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var ModulatorProps = {
	    freq: {
	        type: 'number',
	        bounds: [1, 100],
	        defaultValue: 5
	    },
	    target: {
	        type: 'string',
	        bounds: [_Constants.CONST.MODULATOR_TARGET_FREQ, _Constants.CONST.MODULATOR_TARGET_DETUNE],
	        defaultValue: _Constants.CONST.MODULATOR_TARGET_FREQ
	    },
	    wave: {
	        type: 'string',
	        bounds: [_Constants.CONST.WAVE_SINE, _Constants.CONST.WAVE_SQUARE, _Constants.CONST.WAVE_SAWTOOTH, _Constants.CONST.WAVE_TRIANLGE, _Constants.CONST.WAVE_CUSTOM],
	        defaultValue: _Constants.CONST.WAVE_SINE
	    }
	};
	
	exports.default = ModulatorProps;

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var MoogFilterProps = {
	    cutoff: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.1
	    },
	    resonance: {
	        type: 'number',
	        bounds: [0, 4],
	        step: 0.1,
	        defaultValue: 3.5
	    },
	    bufferSize: {
	        type: 'number',
	        bounds: [256, 16384],
	        defaultValue: 4096
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};
	
	exports.default = MoogFilterProps;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var NoiseProps = {
	    color: {
	        type: 'string',
	        bounds: [_Constants.CONST.NOISE_BROWN, _Constants.CONST.NOISE_PINK, _Constants.CONST.NOISE_WHITE],
	        defaultValue: _Constants.CONST.NOISE_WHITE
	    },
	    detune: {
	        type: 'number',
	        bounds: [-1200, 1200],
	        defaultValue: 0
	    }
	};
	
	exports.default = NoiseProps;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _Constants = __webpack_require__(1);
	
	var OscillatorProps = {
	    detune: {
	        type: 'number',
	        bounds: [-1200, 1200],
	        defaultValue: 0
	    },
	    wave: {
	        type: 'string',
	        bounds: [_Constants.CONST.WAVE_SINE, _Constants.CONST.WAVE_SQUARE, _Constants.CONST.WAVE_SAWTOOTH, _Constants.CONST.WAVE_TRIANLGE, _Constants.CONST.WAVE_CUSTOM],
	        defaultValue: _Constants.CONST.WAVE_SINE
	    }
	};
	
	exports.default = OscillatorProps;

/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var OverdriveProps = {
	    outputGain: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 1
	    },
	    drive: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 1
	    },
	    curveAmount: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.7
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
	
	exports.default = OverdriveProps;

/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var PanProps = {
	    pan: {
	        type: 'number',
	        bounds: [-1, 1],
	        step: 0.1,
	        defaultValue: 0
	    }
	};
	
	exports.default = PanProps;

/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var PingPongDelayProps = {
	    wet: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.5
	    },
	    feedback: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.3
	    },
	    delayTimeLeft: {
	        type: 'number',
	        bounds: [1, 10000],
	        defaultValue: 200
	    },
	    delayTimeRight: {
	        type: 'number',
	        bounds: [1, 10000],
	        defaultValue: 400
	    },
	    bypass: {
	        type: 'number',
	        bounds: [0, 1],
	        defaultValue: 0
	    }
	};
	
	exports.default = PingPongDelayProps;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var TremoloProps = {
	    intensity: {
	        type: 'number',
	        bounds: [0, 1],
	        step: 0.1,
	        defaultValue: 0.3
	    },
	    rate: {
	        type: 'number',
	        bounds: [0, 11],
	        step: 0.1,
	        defaultValue: 5
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
	
	exports.default = TremoloProps;

/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	var WS_CURVE_SIZE = 4096;
	var curveL = new Float32Array(WS_CURVE_SIZE);
	var curveR = new Float32Array(WS_CURVE_SIZE);
	
	(function() {
	  for (var i = 0; i < WS_CURVE_SIZE; i++) {
	    curveL[i] = Math.cos((i / WS_CURVE_SIZE) * Math.PI * 0.5);
	    curveR[i] = Math.sin((i / WS_CURVE_SIZE) * Math.PI * 0.5);
	  }
	})();
	
	module.exports = {
	  L: curveL,
	  R: curveR,
	};


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var curve = __webpack_require__(37);
	
	/**
	 *  StereoPannerImpl
	 *  +--------------------------------+  +------------------------+
	 *  | ChannelSplitter(inlet)         |  | BufferSourceNode(_dc1) |
	 *  +--------------------------------+  | buffer: [ 1, 1 ]       |
	 *    |                            |    | loop: true             |
	 *    |                            |    +------------------------+
	 *    |                            |       |
	 *    |                            |  +----------------+
	 *    |                            |  | GainNode(_pan) |
	 *    |                            |  | gain: 0(pan)   |
	 *    |                            |  +----------------+
	 *    |                            |    |
	 *    |    +-----------------------|----+
	 *    |    |                       |    |
	 *    |  +----------------------+  |  +----------------------+
	 *    |  | WaveShaperNode(_wsL) |  |  | WaveShaperNode(_wsR) |
	 *    |  | curve: curveL        |  |  | curve: curveR        |
	 *    |  +----------------------+  |  +----------------------+
	 *    |               |            |               |
	 *    |               |            |               |
	 *    |               |            |               |
	 *  +--------------+  |          +--------------+  |
	 *  | GainNode(_L) |  |          | GainNode(_R) |  |
	 *  | gain: 0    <----+          | gain: 0    <----+
	 *  +--------------+             +--------------+
	 *    |                            |
	 *  +--------------------------------+
	 *  | ChannelMergerNode(outlet)      |
	 *  +--------------------------------+
	 */
	function StereoPannerImpl(audioContext) {
	  this.audioContext = audioContext;
	  this.inlet = audioContext.createChannelSplitter(2);
	  this._pan = audioContext.createGain();
	  this.pan = this._pan.gain;
	  this._wsL = audioContext.createWaveShaper();
	  this._wsR = audioContext.createWaveShaper();
	  this._L = audioContext.createGain();
	  this._R = audioContext.createGain();
	  this.outlet = audioContext.createChannelMerger(2);
	
	  this.inlet.channelCount = 2;
	  this.inlet.channelCountMode = "explicit";
	  this._pan.gain.value = 0;
	  this._wsL.curve = curve.L;
	  this._wsR.curve = curve.R;
	  this._L.gain.value = 0;
	  this._R.gain.value = 0;
	
	  this.inlet.connect(this._L, 0);
	  this.inlet.connect(this._R, 1);
	  this._L.connect(this.outlet, 0, 0);
	  this._R.connect(this.outlet, 0, 1);
	  this._pan.connect(this._wsL);
	  this._pan.connect(this._wsR);
	  this._wsL.connect(this._L.gain);
	  this._wsR.connect(this._R.gain);
	
	  this._isConnected = false;
	  this._dc1buffer = null;
	  this._dc1 = null;
	}
	
	StereoPannerImpl.prototype.connect = function(destination) {
	  var audioContext = this.audioContext;
	  if (!this._isConnected) {
	    this._isConnected = true;
	    this._dc1buffer = audioContext.createBuffer(1, 2, audioContext.sampleRate);
	    this._dc1buffer.getChannelData(0).set([ 1, 1 ]);
	
	    this._dc1 = audioContext.createBufferSource();
	    this._dc1.buffer = this._dc1buffer;
	    this._dc1.loop = true;
	    this._dc1.start(audioContext.currentTime);
	    this._dc1.connect(this._pan);
	  }
	  global.AudioNode.prototype.connect.call(this.outlet, destination);
	};
	
	StereoPannerImpl.prototype.disconnect = function() {
	  var audioContext = this.audioContext;
	  if (this._isConnected) {
	    this._isConnected = false;
	    this._dc1.stop(audioContext.currentTime);
	    this._dc1.disconnect();
	    this._dc1 = null;
	    this._dc1buffer = null;
	  }
	  global.AudioNode.prototype.disconnect.call(this.outlet);
	};
	
	module.exports = StereoPannerImpl;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var StereoPannerImpl = __webpack_require__(38);
	
	function StereoPanner(audioContext) {
	  var impl = new StereoPannerImpl(audioContext);
	
	  Object.defineProperties(impl.inlet, {
	    pan: {
	      value: impl.pan,
	      enumerable: true
	    },
	    connect: {
	      value: function(node) {
	        return impl.connect(node);
	      }
	    },
	    disconnect: {
	      value: function() {
	        return impl.disconnect();
	      }
	    }
	  });
	
	  return impl.inlet;
	}
	
	module.exports = StereoPanner;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var AudioContext = global.AudioContext || global.webkitAudioContext;
	var StereoPannerNode = __webpack_require__(39);
	
	if (AudioContext && !AudioContext.prototype.createStereoPanner) {
	  AudioContext.prototype.createStereoPanner = function() {
	    return new StereoPannerNode(this);
	  };
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

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
//# sourceMappingURL=electrophone.js.map