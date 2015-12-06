(function () {
    'use strict';

    window.onload = function () {
        var notes = document.getElementsByClassName('note'),
            synth = new WebSynth(),
            frequencies = {
                65: '261.626',
                83: '293.665',
                68: '329.628'
            };

        for (var i = 0; i < notes.length; i++) {

            (function (i) {
                var current = notes[i];
                current.addEventListener('mousedown', function () {
                    var freq = current.getAttribute('data-note');
                    synth.play(freq);
                }, false);

                current.addEventListener('mouseup', function () {
                    var freq = current.getAttribute('data-note');
                    synth.stop(freq);
                }, false);
            })(i);

        }
        document.addEventListener('keydown', function (e) {
            var evt = e.which || e.keyCode,
                freq = frequencies[evt];
            if (freq) {
                synth.play(freq);
            }
        }, false);

        document.addEventListener('keyup', function (e) {
            var evt = e.which || e.keyCode,
                freq = frequencies[evt];
            if (freq) {
                synth.stop(freq);
            }
        }, false);

        synth
            .modulator('FM-A', {
                type:  synth.VARS.WAVE_SINE,
                freq:  1,
                level: 100,
                link:  'OSC-A'
            })
            .modulator('FM-B', {
                type:  synth.VARS.WAVE_SINE,
                freq:  5,
                level: 100,
                link:  'OSC-B'
            })
            .envelope('OSC-A-FREQ-ENV', {
                link:    'OSC-A',
                target:  'detune',
                level:   20,
                attack:  2,
                decay:   1,
                sustain: 100,
                release: 10
            })
            .oscillator('OSC-A', {
                type:  synth.VARS.WAVE_SQUARE,
                level: 50,
                link:  'FILT1'
            })
            .envelope('OSC-B-FREQ-ENV', {
                link:    'OSC-B',
                target:  'frequency',
                level:   20,
                attack:  2,
                decay:   1,
                sustain: 80,
                release: 10
            })
            .oscillator('OSC-B', {
                type:  synth.VARS.WAVE_SINE,
                level: 100,
                link:  'PINGPONG'
            })
            .modulator('FM-NOISE', {
                type:  synth.VARS.WAVE_SQUARE,
                freq:  10,
                level: 100,
                link:  'NOISE-W'
            })
            .envelope('NOISE-ENV', {
                link:    'NOISE-W',
                target:  'gain',
                level:   50,
                attack:  1,
                decay:   50,
                sustain: 10,
                release: 1
            })
            .noise('NOISE-W', {
                level: 50,
                link:  'FILT1'
            })
            .modulator('FM-FILT', {
                type:   synth.VARS.WAVE_SINE,
                freq:   5,
                level:  100,
                link:   'FILT1',
                target: 'detune'
            })
            .envelope('FILT1-DETUNE-ENV', {
                link:    'FILT1',
                target:  'detune',
                level:   100,
                attack:  1,
                decay:   10,
                sustain: 100,
                release: 100
            })
            .filter('FILT1', {
                type: synth.VARS.FILTER_LOWPASS,
                freq: 500,
                q:    1,
                link: 'DELAY'
            })
            .delay('DELAY', {
                link:      'PINGPONG',
                feedback:  0.55,
                delayTime: 100,
                wet:       1,
                cutoff:    1000,
                bypass:    0
            })
            .pingpongdelay('PINGPONG', {
                link:      'WAHWAH',
                wet: 0.5, //0 to 1
                feedback: 0.3, //0 to 1
                delayTimeLeft: 150, //1 to 10000 (milliseconds)
                delayTimeRight: 200 //1 to 10000 (milliseconds)
            })
            .wahwah('WAHWAH', {
                link:      synth.VARS.MASTER,
                automode: true,                //true/false
                baseFrequency: 0.4,            //0 to 1
                excursionOctaves: 4,           //1 to 6
                sweep: 0.2,                    //0 to 1
                resonance: 50,                 //1 to 100
                sensitivity: 0.5,              //-1 to 1
                bypass: 0
            })
    }
})();

