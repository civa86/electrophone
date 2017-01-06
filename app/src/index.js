import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
    <AppContainer>
        <Root store={store} />
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./containers/Root', () => {
        const RootContainer = require('./containers/Root').default;
        render(
            <AppContainer key={Math.random()}>
                <RootContainer store={store} history={history}/>
            </AppContainer>,
            document.getElementById('root')
        );
    });
}
