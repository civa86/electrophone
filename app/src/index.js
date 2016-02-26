import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

// HUMANS AND ROBOTS TXT
import '../humans.txt';
import '../robots.txt';

// STYLE
import '../less/screen.less';

let cache;
//TODO move into app and create an action to LOAD_SYNTH
//if (localStorage.getItem('synthState')) {
//    cache = { synth: JSON.parse(localStorage.getItem('synthState')) };
//}

const store = configureStore(cache);

render(
    <Root store={store}/>,
    document.getElementById('root')
);
