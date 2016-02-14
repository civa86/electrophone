import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root';

// HUMANS AND ROBOTS TXT
import '../humans.txt';
import '../robots.txt';

// STYLE
import '../less/screen.less';

const store = configureStore();

render(
    <Root store={store}/>,
    document.getElementById('root')
);
