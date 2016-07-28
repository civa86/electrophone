# WebSynth

JavaScript Library to build a modular synthesizer.

Based on WebAudio API and WebAudio Effects Libray [tuna](https://github.com/Theodeus/tuna)

STATUS: `DEVELOPMENT`

[![Build Status](https://travis-ci.org/civa86/web-synth.svg?branch=master)](https://travis-ci.org/civa86/web-synth) [![Coverage Status](https://coveralls.io/repos/github/civa86/web-synth/badge.svg?branch=master)](https://coveralls.io/github/civa86/web-synth?branch=master)

## Demo Application

[https://civa86.github.io/web-synth](https://civa86.github.io/web-synth)

HTML5 Application to demonstrate the use of `web-synth` library.

Application based on [React](https://facebook.github.io/react/) - [Redux](http://redux.js.org/). 

Source code built with [Webpack](https://webpack.github.io/). ES6 code compiled with [Babel](https://babeljs.io/).
 
## Library Code Documentation
 
[Code Documentation Page](http://civa86.github.io/web-synth/docs/)
 
Code Documentation of the WebSynth class exposed in the Library.
 
For a full development documentation: `npm run lib::docs` in the root of your local repository.
 
## WebSynth JavaScript Library

Install npm module `not already published

### Library Inclusion

Javascript File Inclusion 

```html
<script src="<Path_to_node_modules>/web-synth/dist/web-synth.min.js"/>
```
ES5 npm require

```javascript
var WebSynth = require('web-synth)
```

ES6 npm import
```javascript
import WebSynth from 'web-synth'
```
### Usage
 
```javascript
//Get the browser AudioContext    
var AudioCtx = window.AudioContext || window.webkitAudioContext;

//CREATE A WEBSYNTH INSTANCE
var synth = new WebSynth(new AudioCtx(), {
        //Optional parameters
        spectrum: <true|false>, //set true to manage data of playing sound
        updateSpectrum: <function () {}>, //on receive data callback
        resetSpectrum: <function () {}> //on stop data callback
    });
```

### Prebuilt Modules

Modules hardcoded into the WebSynth Instance. `Master` and `ADSR` to let sound exit from sound card output.

##### Master

#### ADSR

### Sound Modules

#### Oscillator

#### Noise

### Control Modules

### Effect Modules




