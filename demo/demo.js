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
                freq:  5,
                level: 100,
                link:  'OSC-A'
            })
            .modulator('FM-B', {
                type:  synth.VARS.WAVE_SINE,
                freq:  1,
                level: 100,
                link:  'OSC-B'
            })
            .envelope('OSC-A-FREQ-ENV', {
                link:    'OSC-A',
                target:  'frequency',
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
            .oscillator('OSC-B', {
                type:  synth.VARS.WAVE_SAWTOOTH,
                level: 50,
                link:  'FILT1'
            })
            .modulator('FM-FILT', {
                type:  synth.VARS.WAVE_SINE,
                freq:  5,
                level: 100,
                link:  'FILT1'
            })
            .envelope('FILT1-DETUNE-ENV', {
                link:    'FILT1',
                target:  'detune',
                level:   100,
                attack:  20,
                decay:   1,
                sustain: 1,
                release: 10
            })
            .filter('FILT1', {
                type: synth.VARS.FILTER_BANDPASS,
                freq: 13000,
                q:    2,
                link: synth.VARS.MASTER
            })
    }
})();

