# WebSynth

JavaScript Library to build a modular synthesizer.

Based on WebAudio API and WebAudio Effects Libray [tuna](https://github.com/Theodeus/tuna)

[![Build Status](https://travis-ci.org/civa86/web-synth.svg?branch=master)](https://travis-ci.org/civa86/web-synth)
[![Coverage Status](https://coveralls.io/repos/github/civa86/web-synth/badge.svg?branch=master)](https://coveralls.io/github/civa86/web-synth?branch=master)

## Demo Application

[https://civa86.github.io/web-synth](https://civa86.github.io/web-synth)

HTML5 Application to demonstrate the use of `web-synth` library.

Frameworks and Libraries:

| Name         | Version | Link                                                                   |
| ------------ | ------- | ---------------------------------------------------------------------- |
| React        | 15.4.1  | [https://facebook.github.io/react/](https://facebook.github.io/react/) |
| Redux        | 3.6.0   | [http://redux.js.org/](http://redux.js.org/)                           |
| jQuery       | 1.12.11 | [https://jquery.com/](https://jquery.com/)                             |
| jquery-knob  | 1.2.11  | [http://anthonyterrien.com/knob/](http://anthonyterrien.com/knob/)     |
| Cytoscape.js | 2.5.5   | [http://js.cytoscape.org/](http://js.cytoscape.org/)                   |
| Bootstrap    | 3.3.6   | [http://getbootstrap.com/](http://getbootstrap.com/)                   |
| Ionicons     | 2.0.1   | [http://ionicons.com/](http://ionicons.com/)                           |

## Library Code Documentation

[Code Documentation Page](http://civa86.github.io/web-synth/docs/)

Code Documentation of the WebSynth class provided by the Library.

For a full development documentation:

- Clone Repository
- Run `lib::docs` npm script

## Usage

Install npm module

```bash
npm install web-synth
```

#### Include Library

With ES5 via `<script>` tag:

`<script src="<path_to_node_modules>/web-synth/dist/web-synth.min.js"/>`

With ES2015 via [Babel](https://babeljs.io/):

```javascript
import WebSynth from 'web-synth'
```

#### Create an instance

```javascript
//Get the browser AudioContext
var AudioCtx = window.AudioContext || window.webkitAudioContext;

//CREATE A WEBSYNTH INSTANCE
var synth = new WebSynth(new AudioCtx(), {
        //Optional parameters
        spectrum: <true|false>,            //set true to manage data of playing sound
        updateSpectrum: <dataArray => {}>, //on receive data callback
        resetSpectrum: <() => {}>          //on stop data callback
    });
```

#### Full Example: Two Voices Synth

```javascript
// Load library
import WebSynth from 'WebSynth';

// Build the synth instance (See Usage Section)
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const synth = new WebSynth(new AudioCtx());

// Create the voice 1 linked to master module (See Prebuilt Modules Section)
synth.create(
    'Voice1',
    WebSynth.TYPES.OSCILLATOR,
    {
        wave: WebSynth.CONST.WAVE_SAWTOOTH,
        detune: 500,
        link: 'master'
    }
);

// Create the voice 2 linked to master module
synth.create(
    'Voice2',
    WebSynth.TYPES.OSCILLATOR,
    {
        wave: WebSynth.CONST.WAVE_SAWTOOTH,
        detune: -500,
        link: 'master'
    }
);

// Setup ADSR
synt.adsr({ attack: 0, decay: 1, sustain: 50, release: 25 });

// Set Master Volume to 80%
synth.master({ level: 80 });

// Play the frequency 440 (A4)
synth.play(440);

// Stop frequency 440 after 1 second
setTimeout(() => synth.stop(440), 1000);
```


## Prebuilt Modules

Every WebSynth instance has 2 hardcoded modules: `Master` and `ADSR`.

This is the minimal configuration to let sound coming out from  your
sound card and control its behaviour during time.

#### Master

Main Output Gain.

| Property | Type     | Values  | Default |
| -------- | -------- | ------- | ------- |
| level    | Integer  | 0 - 100 | 100     |


#### ADSR

Envelope on the master gain. Describes final sound behavior during time.

| Property | Type     | Values  | Default |
| -------- | -------- | ------- | ------- |
| attack   | Integer  | 0 - 100 | 0       |
| decay    | Integer  | 0 - 100 | 1       |
| sustain  | Integer  | 0 - 100 | 100     |
| release  | Integer  | 0 - 100 | 5       |

## Sound Modules

Sound Modules can generate sounds and play frequencies.

They can be linked to any Effect or directly to Master

#### Oscillator

Sound Wave Generator.

| Property | Type     | Values                                    | Default |
| -------- | -------- | ----------------------------------------- | ------- |
| level    | Integer  | 0 - 100                                   | 100     |
| detune   | Integer  | -1200 - 1200                              | 0       |
| wave     | String   | sine, square, sawtooth, triangle, custom  | sine    |

#### Noise

Noise Generator.

| Property | Type     | Values              | Default |
| -------- | -------- | ------------------- | ------- |
| level    | Integer  | 0 - 100             | 100     |
| detune   | Integer  | -1200 - 1200        | 0       |
| color    | String   | white, brown, pink  | white   |

## Control Modules

Control Modules can change the behavior of a specific module property or modify the final sound.

#### Modulator

An Oscillator that produces modulation on another module property.

It can be linked to any Sound Module.

| Property | Type     | Values                                    | Default   |
| -------- | -------- | ----------------------------------------- | --------- |
| level    | Integer  | 0 - 100                                   | 100       |
| freq     | Integer  | 1 - 100                                   | 5         |
| wave     | String   | sine, square, sawtooth, triangle, custom  | sine      |
| target   | String   | frequency, detune                         | frequency |

#### Envelope

A module that can describe property changes during time.

It can be linked to any Sound Module or to any module that has the level property (gain target).

| Property | Type     | Values                  | Default |
| -------- | -------- | -------                 | ------- |
| level    | Integer  | 0 - 100                 | 100     |
| attack   | Integer  | 0 - 100                 | 0       |
| decay    | Integer  | 0 - 100                 | 1       |
| sustain  | Integer  | 0 - 100                 | 100     |
| release  | Integer  | 0 - 100                 | 5       |
| target   | String   | frequency, detune, gain | gain    |


#### Pan


## Effect Modules
