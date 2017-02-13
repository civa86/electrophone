import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import app from './app';
import synth from './synth';
import ui from './ui';

const rootReducer = combineReducers({
    app,
    synth,
    ui,
    form: formReducer
});

export default rootReducer;
