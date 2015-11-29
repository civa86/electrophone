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

	var _DecoratedSynth = __webpack_require__(3);

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

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Oscillator = __webpack_require__(7);

	exports.Oscillator = _interopRequire(_Oscillator);

	var _Filter = __webpack_require__(6);

	exports.Filter = _interopRequire(_Filter);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _libModules = __webpack_require__(2);

	var Modules = _interopRequireWildcard(_libModules);

	var _libSynth = __webpack_require__(4);

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

	exports['default'] = DecoratedSynth;
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

	var _Voice = __webpack_require__(5);

	var _Voice2 = _interopRequireDefault(_Voice);

	var Synth = (function () {
	    function Synth() {
	        _classCallCheck(this, Synth);

	        this.master = _AudioContext2['default'].createGain();
	        this.master.connect(_AudioContext2['default'].destination);
	        this.modules = {};
	        this.voices = {};
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

	            this.modules[label] = {
	                type: type,
	                props: props
	            };
	        }
	    }, {
	        key: 'play',
	        value: function play(note) {
	            if (!this.voices[note]) {
	                this.voices[note] = new _Voice2['default'](note, this.modules, this.master);
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
/* 5 */
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

	var _modules = __webpack_require__(2);

	var Modules = _interopRequireWildcard(_modules);

	var Voice = (function () {
	    function Voice(note, modules, master) {
	        _classCallCheck(this, Voice);

	        this.note = note;
	        this.modules = modules;
	        this.master = master;

	        this.soundSources = [];

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

	                    m.instance = new Modules[m.type](m.props);
	                    if (m.type === 'Oscillator') {
	                        this.soundSources.push(m.instance);
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
	                    if (dest === 'master') {
	                        out = this.master;
	                    } else if (this.modules[dest]) {
	                        out = this.modules[dest].instance.lineout.source;
	                    }

	                    source.connect(out);
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
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;

	            try {
	                for (var _iterator4 = this.soundSources[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var source = _step4.value;

	                    source.noteOff();
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
/* 6 */
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
/* 7 */
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

	        this.gain.gain.value = props.level || 1;

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
	            this.osc.stop(_AudioContext2['default'].currentTime + 5);
	        }
	    }, {
	        key: 'noteOff',
	        value: function noteOff() {
	            this.osc.stop(0);
	        }
	    }]);

	    return Oscillator;
	})();

	exports['default'] = Oscillator;
	module.exports = exports['default'];

/***/ }
/******/ ]);