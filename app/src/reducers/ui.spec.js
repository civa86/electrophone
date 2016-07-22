import { expect } from 'chai';
import ui from './ui';
import initState from './initState';
import {
    setLinkMode,
    toggleLinkMode,
    setPianoVisibility,
    setSpectrumVisibility,
    setViewPanel,
    setGraphPan,
    setGraphZoom
} from '../actions/UiActions';

const
    initialState = initState.ui,
    deepFreeze = (obj) => {
    // Retrieve the property names defined on obj
    const propNames = Object.getOwnPropertyNames(obj);

    // Freeze properties before freezing self
    propNames.forEach(name => {
        const prop = obj[name];

        // Freeze prop if it is an object
        if (typeof prop === 'object' && prop !== null) {
            deepFreeze(prop);
        }
    });

    // Freeze self (no-op if already frozen)
    return Object.freeze(obj);
};

describe('Ui reducer', () => {
    let state = deepFreeze(ui());

    it('should have an initial state', () => {
        expect(state).to.deep.equal(initialState);
    });

    it('should set the view panel', () => {
        state = ui(state, setViewPanel('control'));
        expect(state.viewPanel).to.equal('control');
        state = ui(state, setViewPanel('graph'));
        expect(state.viewPanel).to.equal('graph');
    });

    it('should set link mode on', () => {
        state = ui(state, setLinkMode(true));
        expect(state.graph.linkMode).to.equal(true);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should toggle link mode', () => {
        state = ui(state, toggleLinkMode());
        expect(state.graph.linkMode).to.equal(false);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should set the piano visibility', () => {
        state = ui(state, setPianoVisibility(false));
        expect(state.isPianoVisible).to.equal(false);
        state = ui(state, setPianoVisibility(true));
        expect(state.isPianoVisible).to.equal(true);
        state = ui(state, setPianoVisibility());
        expect(state.isPianoVisible).to.equal(false);
        state = ui(state, setPianoVisibility(1));
        expect(state.isPianoVisible).to.equal(true);
        state = ui(state, setPianoVisibility(false));
    });

    it('should set the spectrum visibility', () => {
        state = ui(state, setSpectrumVisibility(false));
        expect(state.isSpectrumVisible).to.equal(false);
        state = ui(state, setSpectrumVisibility(true));
        expect(state.isSpectrumVisible).to.equal(true);
        state = ui(state, setSpectrumVisibility());
        expect(state.isSpectrumVisible).to.equal(false);
        state = ui(state, setSpectrumVisibility(1));
        expect(state.isSpectrumVisible).to.equal(true);
        state = ui(state, setSpectrumVisibility(false));
    });

    it('should set graph pan', () => {
        state = ui(state, setGraphPan({ x: 100, y: 100 }));
        expect(state.graph.pan.x).to.equal(100);
        expect(state.graph.pan.y).to.equal(100);
    });

    it('should set graph zoom', () => {
        state = ui(state, setGraphZoom(1));
        expect(state.graph.zoom).to.equal(1);
    });

    // it('should load a full state', () => {
    //     expect(0).to.equal(1);
    // });
    //
    // it('should reset state', () => {
    //     expect(0).to.equal(1);
    // });

    //TODO check for unit test load and reset state....
});
