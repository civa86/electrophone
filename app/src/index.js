import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

// HUMANS AND ROBOTS TXT
import '../humans.txt';
import '../robots.txt';

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.css';
import 'imports?jQuery=jquery!bootstrap/dist/js/bootstrap';

//IONICONS
import 'ionicons/css/ionicons.css';

// STYLE
import '../less/screen.less';

const store = configureStore();

render(
    <Root store={store}/>,
    document.getElementById('root')
);

//TODO icons and layout....
// filter http://reactable.com/mobile/manual/icons/filter_lowpass.png
// oscillator http://reactable.com/live/manual/icons/oscillator_sine.png
// noise http://reactable.com/live/manual/icons/lfo_noise.png
// modulator http://static.squarespace.com/static/5006e57c84ae2a41e73b4416/t/5069e52384ae2e32baf96ee6/1349117220192/iconmonstr-sound-wave-4-icon.png
// master http://2.bp.blogspot.com/-1Za5DiXYh6c/UReMZ5cuR-I/AAAAAAAAEy8/zBSz2sfYVgQ/s400/media-volume-2.png
// pan http://audiolink.andreascoroiu.com/resources/img/stream.png

// react table icons http://reactable.com/live/manual/
