import { combineReducers } from 'redux';
import synth from './synth';
import ui from './ui';

const rootReducer = combineReducers({
    synth,
    ui
});

export default rootReducer;
