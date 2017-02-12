import { combineReducers } from 'redux';
import app from './app';
import synth from './synth';
import ui from './ui';

const rootReducer = combineReducers({
    app,
    synth,
    ui
});

export default rootReducer;
