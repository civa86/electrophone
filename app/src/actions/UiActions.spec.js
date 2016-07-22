import { expect } from 'chai';
import * as actions from '../actions/UiActions';
import * as actionTypes from '../constants/ActionTypes';

describe('Ui actions', () => {
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

    it('should create an action setPianoVisibility', () => {
        const expectedAction = {
            type: actionTypes.SET_PIANO_VISIBILITY,
            isPianoVisible: true
        };
        expect(actions.setPianoVisibility(true)).to.deep.equal(expectedAction);
    });

    it('should create an action setSpectrumVisibility', () => {
        const expectedAction = {
            type: actionTypes.SET_SPECTRUM_VISIBILITY,
            isSpectrumVisible: true
        };
        expect(actions.setSpectrumVisibility(true)).to.deep.equal(expectedAction);
    });

    it('should create an action setViewPanel', () => {
        const expectedAction = {
            type: actionTypes.SET_VIEW_PANEL,
            panel: 'test'
        };
        expect(actions.setViewPanel('test')).to.deep.equal(expectedAction);
    });
});
