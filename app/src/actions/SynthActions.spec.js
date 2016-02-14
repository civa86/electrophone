import { expect } from 'chai';
import * as actions from '../actions/SynthActions';
import * as actionTypes from '../constants/ActionTypes';

describe('Synth actions', () => {
    it('should create an action addAudioNode', () => {
        const expectedAction = {
            type: actionTypes.ADD_AUDIO_NODE,
            id: 'ele1'
        };
        expect(actions.addAudioNode({
            id: 'ele1'
        })).to.deep.equal(expectedAction);
    });

    it('should create an action setAudioNodeSelection', () => {
        const expectedAction = {
            type: actionTypes.SET_AUDIO_NODE_SELECTION,
            node: 'ele1',
            isSelected: true
        };
        expect(actions.setAudioNodeSelection('ele1', true)).to.deep.equal(expectedAction);
    });

    it('should create an action setLinkMode', () => {
        const expectedAction = {
            type: actionTypes.SET_LINK_MODE,
            mode: true
        };
        expect(actions.setLinkMode(true)).to.deep.equal(expectedAction);
    });

    it('should create an action toggleLinkMode', () => {
        const expectedAction = {
            type: actionTypes.TOGGLE_LINK_MODE
        };
        expect(actions.toggleLinkMode()).to.deep.equal(expectedAction);
    });
});
