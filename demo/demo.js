(function () {
    'use strict';

    window.onload = function () {
        var notes = document.getElementsByClassName('note'),
            frequencies = {
                65: '261.626',
                83: '293.665',
                68: '329.628'
            },
            c = document.getElementById('spectrum'),
            WIDTH = notes[0].offsetWidth,
            HEIGHT = notes[0].offsetHeight * 5,
            canvasCtx = c.getContext('2d'),
            synth = new WebSynth({
                spectrum:       true,
                updateSpectrum: function (dataArray) {
                    var sliceWidth = WIDTH * 1.0 / 128,
                        x = 0;

                    canvasCtx.fillStyle = 'rgb(255, 255, 255)';
                    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
                    canvasCtx.lineWidth = 2;
                    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
                    canvasCtx.beginPath();

                    for (var i = 0; i < dataArray.length; i++) {

                        var v = dataArray[i] / 128.0,
                            y = v * HEIGHT / 2;

                        if (i === 0) {
                            canvasCtx.moveTo(x, y);
                        } else {
                            canvasCtx.lineTo(x, y);
                        }

                        x += sliceWidth;
                    }
                    canvasCtx.lineTo(c.width, c.height / 2);
                    canvasCtx.stroke();

                    // Draw the frequency domain chart.
                    for (var i = 0; i < dataArray.length; i++) {
                        var value = dataArray[i],
                            percent = value / 256,
                            height = HEIGHT * percent,
                            offset = HEIGHT - height - 1,
                            barWidth = WIDTH / dataArray.length,
                            hue = i / dataArray.length * 360;
                        canvasCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
                        canvasCtx.fillRect(i * barWidth, offset, barWidth, height);
                    }

                },
                resetSpectrum:  function () {
                    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
                }
            });

        c.width = WIDTH;
        c.height = HEIGHT;
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

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
        .oscillator('OSC-B', {
            type:  synth.VARS.WAVE_SINE,
            level: 100,
            link:  synth.VARS.MASTER
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
            link:           'TREMOLO',
            wet:            0.5, //0 to 1
            feedback:       0.3, //0 to 1
            delayTimeLeft:  150, //1 to 10000 (milliseconds)
            delayTimeRight: 200 //1 to 10000 (milliseconds)
        })
        .tremolo('TREMOLO', {
            link:        synth.VARS.MASTER,
            intensity:   0.5,    //0 to 1
            rate:        6,         //0.001 to 8
            stereoPhase: 0,    //0 to 180
            bypass:      0
        })
    }
})();

