import { expect } from 'chai';
import ui from '../../src/reducers/ui';
import initState from '../../src/reducers/initState';
import { loadState } from '../../src/actions/AppActions';
import { setPositions, addNode, updatePlayingVoices } from '../../src/actions/SynthActions';
import {
    setLinkMode,
    toggleLinkMode,
    setPianoVisibility,
    setSpectrumVisibility,
    setViewPanel,
    setGraphPan,
    setGraphZoom,
    setGraphInstance
} from '../../src/actions/UiActions';

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

    it('should set graph zoom and pan when synth set positions', () => {
        state = ui(state, setPositions(
            'master',
            { x: 100, y: 100 },
            { x: 333, y: 155 },
            3
        ));

        expect(state.graph.pan.x).to.equal(333);
        expect(state.graph.pan.y).to.equal(155);
        expect(state.graph.zoom).to.equal(3);
    });

    it('should set graph instance', () => {
        state = ui(state, setGraphInstance({ value: 1, zoom: () => 1 }));

        expect(state.graph.instance).to.be.a('object');
        expect(state.graph.instance.value).to.equal(1);
        expect(state.graph.instance.zoom).to.be.a('function');
        expect(state.graph.instance.zoom()).to.equal(1);
    });

    it('should set graph zoom and pan when synth add node', () => {
        state = ui(state, addNode(
            {
                id: 'ele1',
                isMaster: true,
                posX: 300,
                posY: 234,
                type: 'Type',
                properties: [{ name: 'a', value: 1 }]
            },
            {
                zoom: 3,
                pan: {
                    x: 5,
                    y: 6
                }
            }
        ));

        expect(state.graph.zoom).to.equal(3);
        expect(state.graph.pan.x).to.equal(5);
        expect(state.graph.pan.y).to.equal(6);
    });

    it('should set graph zoom and pan when synth updates playing voices', () => {
        state = ui(state, updatePlayingVoices(
            ['C-4', 'A-4'],
            {
                zoom: 3,
                pan: {
                    x: 5,
                    y: 6
                }
            }
        ));

        expect(state.graph.zoom).to.equal(3);
        expect(state.graph.pan.x).to.equal(5);
        expect(state.graph.pan.y).to.equal(6);
    });

    it('should load a full state', () => {
        state = ui(state, loadState({
            synth: {},
            ui: {
                viewPanel: 'test',
                isPianoVisible: true,
                isSpectrumVisible: true
            }
        }, ['Master', 'Oscillator']));

        expect(state.viewPanel).to.equal('test');
        expect(state.isPianoVisible).to.equal(true);
        expect(state.isSpectrumVisible).to.equal(true);

        state = ui(state, loadState({
            synth: {},
            ui: {
                viewPanel: 'testtest',
                isPianoVisible: false,
            }
        }, ['Master', 'Oscillator']));

        expect(state.viewPanel).to.equal('testtest');
        expect(state.isPianoVisible).to.equal(false);
        expect(state.isSpectrumVisible).to.equal(true);

        state = ui(state, loadState({
            synth: {},
            ui: {
                viewPanel: null
            }
        }, ['Master', 'Oscillator']));

        expect(state.viewPanel).to.equal('testtest');
        expect(state.isPianoVisible).to.equal(false);
        expect(state.isSpectrumVisible).to.equal(true);
    });
});
