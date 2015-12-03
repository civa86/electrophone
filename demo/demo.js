(function () {
    'use strict';

    window.onload = function () {
        var notes = document.getElementsByClassName('note');
        var synth = new WebSynth();
        var frequencies = {
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
            .oscillator('FM-A', {
                type:  synth.VARS.WAVE_SQUARE,
                freq: 1,
                level: 1,
                link:  'OSC-A'
            })
            .oscillator('FM-B', {
                type:  synth.VARS.WAVE_SQUARE,
                freq: 10,
                level: 1,
                link:  'OSC-A'
            })
            .oscillator('OSC-A', {
                type:  synth.VARS.WAVE_SQUARE,
                level: 0.5,
                link:  synth.VARS.MASTER
            })
            .oscillator('OSC-B', {
                type:  synth.VARS.WAVE_SQUARE,
                level: 0.5,
                link:  synth.VARS.MASTER
            })
    }
})();

