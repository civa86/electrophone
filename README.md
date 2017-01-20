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

[Documentation Page](http://civa86.github.io/web-synth/docs/)

Code Documentation of the WebSynth class provided by the Library.

For a full development documentation:

- Download / Clone the Repository
- Enter in the web-synth project folder
- Run `lib::docs` npm script
- Run docs/index.html in a browser

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
// Get the browser AudioContext
var AudioCtx = window.AudioContext || window.webkitAudioContext;

// CREATE A WEBSYNTH INSTANCE
var synth = new WebSynth(new AudioCtx(), {
        //Optional parameters
        spectrum: <true|false>,            // set true to manage data of playing sound
        updateSpectrum: <dataArray => {}>, // on receive data callback
        resetSpectrum: <() => {}>          // on stop data callback
    });
```

#### Create Modules

```javascript
synth.create("moduleLabel", "moduleType", { ...properties });
```

#### Update Modules

```javascript
synth.update("moduleLabel", { ...properties });
```

#### Destroy Modules

```javascript
synth.destroy("moduleLabel");
```

#### Link modules

```javascript
synth.link("sourceModuleLabel", "destinationModuleLabel");
```

#### Update Prebuilt Modules

```javascript
// Master module
synth.master({ ...properties });

// ADSR module
synth.adsr({ ...properties });
```

#### Play and Stop sound

```javascript
// Play a frequency (20 - 20000)
synth.play(440);

// Stop a frequency (20 - 20000)
synth.stop(440);
```

#### Get All Created Modules

```javascript
synth.getModules();
```

#### Static Methods

```javascript
// Get module properties by type.
WebSynth.getModuleProperties("moduleType");

// Describe all WebSynth modules with properties configuration.
WebSynth.describeModules("moduleType");

// Get frequency float value calculated from given note and octave.
WebSynth.getFrequency("A", 4);

// Get complete notes list.
WebSynth.getNotes();
```


## Constants

The library expose two set of constants: `CONST` and `TYPES`

#### CONST

The set of string values to setup module properties.

| CONST                   | Description                          |
| ----------------------- | ------------------------------------ |
| MASTER                  | the Master module label              |
| ADSR                    | the ADSR module label                |
| NOISE_WHITE             | the white Noise color value          |
| NOISE_PINK              | the pink Noise color value           |
| NOISE_BROWN             | the brown Noise color value          |
| WAVE_SINE               | the sine Wave type value             |
| WAVE_SQUARE             | the square Wave type value           |
| WAVE_SAWTOOTH           | the sawtooth Wave type value         |
| WAVE_TRIANLGE           | the triangle Wave type value         |
| WAVE_CUSTOM             | the custom Wave type value           |
| FILTER_LOWPASS          | the lowpass Filter type value        |
| FILTER_HIGHPASS         | the highpass Filter type value       |
| FILTER_BANDPASS         | the bandpass Filter type value       |
| FILTER_LOWSHELF         | the lowshelf Filter type value       |
| FILTER_HIGHSHELF        | the highshelf Filter type value      |
| FILTER_PEAKING          | the peaking Filter type value        |
| FILTER_NOTCH            | the notch Filter type value          |
| FILTER_ALLPASS          | the allpass Filter type value        |
| MODULATOR_TARGET_FREQ   | the frequency Modulator target value |
| MODULATOR_TARGET_DETUNE | the detune Modulator target value    |
| ENVELOPE_TARGET_GAIN    | the gain Envelope target value       |
| ENVELOPE_TARGET_FREQ    | the frequency Envelope target value  |
| ENVELOPE_TARGET_DETUNE  | the detune Envelope target value     |

#### TYPES

The set of string values to create modules.

| TYPES         | Usage                                                   |
| ------------- | ------------------------------------------------------- |
| OSCILLATOR    | synth.create('label', WebSynth.TYPES.OSCILLATOR, {})    |
| NOISE         | synth.create('label', WebSynth.TYPES.NOISE, {})         |
| MODULATOR     | synth.create('label', WebSynth.TYPES.MODULATOR, {})     |
| ENVELOPE      | synth.create('label', WebSynth.TYPES.ENVELOPE, {})      |
| PAN           | synth.create('label', WebSynth.TYPES.PAN, {})           |
| FILTER        | synth.create('label', WebSynth.TYPES.FILTER, {})        |
| DELAY         | synth.create('label', WebSynth.TYPES.DELAY, {})         |
| PINGPONGDELAY | synth.create('label', WebSynth.TYPES.PINGPONGDELAY, {}) |
| TREMOLO       | synth.create('label', WebSynth.TYPES.TREMOLO, {})       |
| OVERDRIVE     | synth.create('label', WebSynth.TYPES.OVERDRIVE, {})     |
| BITCRUSHER    | synth.create('label', WebSynth.TYPES.BITCRUSHER, {})    |
| MOOGFILTER    | synth.create('label', WebSynth.TYPES.MOOGFILTER, {})    |

#### Full Example: Two Voices Synth

```javascript
// Load library
import WebSynth from 'WebSynth';

// Build the synth instance (See Usage Section)
const AudioCtx = window.AudioContext || window.webkitAudioContext;
const synth = new WebSynth(new AudioCtx());

// Create the first voice
synth.create(
    'Voice1',
    WebSynth.TYPES.OSCILLATOR,
    {
        wave: WebSynth.CONST.WAVE_SAWTOOTH,
        detune: 500,
        level: 50
    }
);

// Create the second voice
synth.create(
    'Voice2',
    WebSynth.TYPES.OSCILLATOR,
    {
        wave: WebSynth.CONST.WAVE_SAWTOOTH,
        detune: -500,
        level: 50
    }
);

//Link voices to Master
synth.link('Voice1', WebSynth.CONST.MASTER);
synth.link('Voice2', WebSynth.CONST.MASTER);

// Setup ADSR
synth.adsr({ attack: 0, decay: 1, sustain: 50, release: 25 });

// Set Master Volume to 80%
synth.master({ level: 80 });

// Get the A4 note frequency
const a4 = WebSynth.getFrequency("A", 4);

// Play the a4 note
synth.play(a4);

// Stop the a4 note after 1 second
setTimeout(() => synth.stop(a4), 1000);
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

They can be linked to any Effect Module or directly to Master

#### Oscillator

Sound Wave Generator.

| Property | Type     | Values                                    | Default |
| -------- | -------- | ----------------------------------------- | ------- |
| level    | Integer  | 0 - 100                                   | 100     |
| detune   | Integer  | -1200 - 1200                              | 0       |
| wave     | String   | sine, square, sawtooth, triangle, custom  | sine    |
| link     | String   | master, "any module label"                | -       |

#### Noise

Noise Generator.

| Property | Type     | Values                           | Default |
| -------- | -------- | -------------------------------- | ------- |
| level    | Integer  | 0 - 100                          | 100     |
| detune   | Integer  | -1200 - 1200                     | 0       |
| color    | String   | white, brown, pink               | white   |
| link     | String   | master, "any module label"       | -       |

## Control Modules

Control Modules can change the behavior of a specific module property or modify the final sound.

#### Modulator

An Oscillator that produces modulation on another module property.

It can be linked to any module with `freq` or `detune` property.

| Property | Type     | Values                                    | Default   |
| -------- | -------- | ----------------------------------------- | --------- |
| level    | Integer  | 0 - 100                                   | 100       |
| freq     | Integer  | 1 - 100                                   | 5         |
| wave     | String   | sine, square, sawtooth, triangle, custom  | sine      |
| target   | String   | frequency, detune                         | frequency |
| link     | String   | master, "any module label"                | -         |

#### Envelope

A module that can describe property changes during time.

It can be linked to any module with `level` property (gain target).

| Property | Type     | Values                           | Default |
| -------- | -------- | -------------------------------- | ------- |
| level    | Integer  | 0 - 100                          | 100     |
| attack   | Integer  | 0 - 100                          | 0       |
| decay    | Integer  | 0 - 100                          | 1       |
| sustain  | Integer  | 0 - 100                          | 100     |
| release  | Integer  | 0 - 100                          | 5       |
| target   | String   | frequency, detune, gain          | gain    |
| link     | String   | master, "any module label"       | -       |

#### Pan

A module that routes sound between left and right channel.

It can be placed between a Sound Module and its destination to setup stereo routing.

| Property | Type     | Values                           | Default |
| -------- | -------- | -------------------------------- | ------- |
| level    | Integer  | 0 - 100                          | 100     |
| pan      | Float    | -1 - 1                           | 0       |
| link     | String   | master, "any module label"       | -       |

## Effect Modules

Effect Modules can change the nature of a sound.

They can be linked to other Effect Modules to create an effect chain and finally to Master.

#### Filter

A module that filters frequencies with different algorithms.

| Property   | Type     | Values                                                                    | Default |
| ---------- | -------- | ------------------------------------------------------------------------- | ------- |
| level      | Integer  | 0 - 100                                                                   | 100     |
| freq       | Integer  | 20 - 20000                                                                | 440     |
| q          | Integer  | 0 - 100                                                                   | 10      |
| filterGain | Integer  | -40 - 40                                                                  | 0       |
| filterType | String   | lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass | lowpass |
| bypass     | Flag     | 0 / 1                                                                     | 0       |
| link       | String   | master, "any module label"                                                | -       |

#### Delay

A module that plays a sound back after a period of time.

| Property  | Type     | Values                           | Default |
| --------- | -------- | -------------------------------- | ------- |
| level     | Integer  | 0 - 100                          | 100     |
| dry       | Float    | 0 - 1                            | 1       |
| wet       | Float    | 0 - 1                            | 0.5     |
| feedback  | Float    | 0 - 0.9                          | 0.4     |
| cutoff    | Integer  | 20 - 20000                       | 440     |
| delayTime | Integer  | 20 - 1000                        | 100     |
| bypass    | Flag     | 0 / 1                            | 0       |
| link      | String   | master, "any module label"       | -       |

#### PingPongDelay

A different kind of Delay.

| Property       | Type     | Values                           | Default |
| -------------- | -------- | -------------------------------- | ------- |
| level          | Integer  | 0 - 100                          | 100     |
| wet            | Float    | 0 - 1                            | 0.5     |
| feedback       | Float    | 0 - 1                            | 0.3     |
| cutoff         | Integer  | 20 - 20000                       | 440     |
| delayTimeLeft  | Integer  | 1 - 10000                        | 200     |
| delayTimeRight | Integer  | 1 - 10000                        | 400     |
| bypass         | Flag     | 0 / 1                            | 0       |
| link           | String   | master, "any module label"       | -       |

#### Tremolo

A trembling sound effect.

| Property    | Type     | Values                           | Default |
| ----------- | -------- | -------------------------------- | ------- |
| level       | Integer  | 0 - 100                          | 100     |
| intensity   | Float    | 0 - 1                            | 0.3     |
| rate        | Float    | 0 - 11                           | 5       |
| stereoPhase | Integer  | 0 - 180                          | 0       |
| bypass      | Flag     | 0 / 1                            | 0       |
| link        | String   | master, "any module label"       | -       |

#### Overdrive

A module that alters the sound increasing its gain with distortion.

| Property       | Type     | Values                           | Default |
| -------------- | -------- | -------------------------------- | ------- |
| level          | Integer  | 0 - 100                          | 100     |
| outputGain     | Float    | 0 - 1                            | 1       |
| drive          | Float    | 0 - 1                            | 1       |
| curveAmount    | Float    | 0 - 1                            | 0.7     |
| algorithmIndex | Integer  | 0 - 5                            | 0       |
| bypass         | Flag     | 0 / 1                            | 0       |
| link           | String   | master, "any module label"       | -       |

#### Bitcrusher

A module that produces a distortion by the reduction of the resolution or bandwidth of digital audio data.

| Property   | Type     | Values                           | Default |
| ---------- | -------- | -------------------------------- | ------- |
| level      | Integer  | 0 - 100                          | 100     |
| bits       | Integer  | 1 - 16                           | 4       |
| normfreq   | Float    | 0 - 1                            | 0.1     |
| bufferSize | Integer  | 256 - 16384                      | 4096    |
| bypass     | Flag     | 0 / 1                            | 0       |
| link       | String   | master, "any module label"       | -       |

#### Moogfilter

A Moog inspired filter

| Property   | Type     | Values                           | Default |
| ---------- | -------- | -------------------------------- | ------- |
| level      | Integer  | 0 - 100                          | 100     |
| cutoff     | Float    | 0 - 1                            | 0.1     |
| resonance  | Float    | 0 - 4                            | 3.5     |
| bufferSize | Integer  | 256 - 16384                      | 4096    |
| bypass     | Flag     | 0 / 1                            | 0       |
| link       | String   | master, "any module label"       | -       |
