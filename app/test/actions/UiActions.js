import { expect } from 'chai';
import * as actions from '../../src/actions/UiActions';
import * as actionTypes from '../../src/constants/ActionTypes';

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

    it('should create an action setGraphPan', () => {
        const expectedAction = {
            type: actionTypes.SET_GRAPH_PAN,
            pan: { x: 100, y: 100 }
        };
        expect(actions.setGraphPan({ x: 100, y: 100 })).to.deep.equal(expectedAction);
    });

    it('should create an action setGraphZoom', () => {
        const expectedAction = {
            type: actionTypes.SET_GRAPH_ZOOM,
            zoom: 1
        };
        expect(actions.setGraphZoom(1)).to.deep.equal(expectedAction);
    });
});
