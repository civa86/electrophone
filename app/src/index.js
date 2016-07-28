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
