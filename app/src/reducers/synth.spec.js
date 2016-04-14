import { expect } from 'chai';
import synth from './synth';
import initState from './initState';
import {
    addAudioNode,
    removeNode,
    removeNodes,
    linkNodes,
    updateNode,
    setAudioNodeSelection,
    setLinkMode,
    toggleLinkMode,
    setPositions,
    setGraphPan,
    setGraphZoom,
    loadState,
    resetState,
    octaveIncrease,
    octaveDecrease,
    setViewPanel
} from '../actions/SynthActions';

const deepFreeze = (obj) => {
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

describe('Synth reducer', () => {
    let state = deepFreeze(synth());

    it('should have an initial state', () => {
        expect(state).to.deep.equal(initState);
    });

    it('should set link mode on', () => {
        state = synth(state, setLinkMode(true));
        expect(state.graph.linkMode).to.equal(true);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should toggle link mode', () => {
        state = synth(state, toggleLinkMode());
        expect(state.graph.linkMode).to.equal(false);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should have an audio node already built, the master', () => {
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('master');
        expect(state.modules[0].isMaster).to.equal(true);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    //TODO test add module.

    it('should remove an audio node', () => {
        state = synth(state, addAudioNode({ id: 'ele2' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, removeNode('ele2'));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('master');
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should remove an array of audio node', () => {
        state = synth(state, addAudioNode({ id: 'ele3' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, addAudioNode({ id: 'ele4' }));
        expect(state.modules.length).to.equal(3);
        state = synth(state, removeNodes(['ele3', 'ele4']));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('master');
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should link nodes', () => {
        state = synth(state, addAudioNode({ id: 'ele2' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, linkNodes('master', 'ele2'));
        expect(state.modules[0].id).to.equal('master');
        expect(state.modules[0].link).to.equal('ele2');
        state = synth(state, removeNode('ele2'));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('master');
        expect(state.modules[0].link).to.equal(null);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should update node', () => {
        let updatedNode;

        state = synth(state, updateNode('master', 'level', 50));
        updatedNode = state.modules.filter(e => e.id === 'master').pop();
        expect(updatedNode.properties.filter(p => p.name === 'level').pop().value).to.equal(50);
        expect(updatedNode.properties.filter(p => p.name === 'attack').pop().value).to.equal(0);

        state = synth(state, updateNode('master', 'attack', 100));
        updatedNode = state.modules.filter(e => e.id === 'master').pop();
        expect(updatedNode.properties.filter(p => p.name === 'level').pop().value).to.equal(50);
        expect(updatedNode.properties.filter(p => p.name === 'attack').pop().value).to.equal(100);

        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should select an audio node', () => {
        let selectedNode;

        state = synth(state, setAudioNodeSelection('master', true));
        selectedNode = state.modules.filter(e => e.id === 'master').pop();
        expect(selectedNode.isSelected).to.equal(true);
    });

    it('should set positions', () => {
        let selectedNode;

        state = synth(state, setPositions(
            'master',
            { x: 100, y: 100 },
            { x: 100, y: 100 },
            3
        ));

        expect(state.graph.pan.x).to.equal(100);
        expect(state.graph.pan.y).to.equal(100);
        expect(state.graph.zoom).to.equal(3);

        selectedNode = state.modules.filter(e => e.id === 'master').pop();
        expect(selectedNode.position.x).to.equal(100);
        expect(selectedNode.position.y).to.equal(100);
    });

    it('should set graph pan', () => {
        state = synth(state, setGraphPan({ x: 100, y: 100 }));
        expect(state.graph.pan.x).to.equal(100);
        expect(state.graph.pan.y).to.equal(100);
    });

    it('should set graph zoom', () => {
        state = synth(state, setGraphZoom(1));
        expect(state.graph.zoom).to.equal(1);
    });

    it('should load a full state', () => {
        state = synth(state, loadState(initState));
        expect(state).to.deep.equal(initState);
    });

    it('should reset state', () => {
        state = synth(state, addAudioNode({ id: 'tmpNode' }));
        expect(state.modules.length).to.equal(2);
        state = synth(state, resetState());
        expect(state).to.deep.equal(initState);
        expect(state.modules.length).to.equal(1);
    });

    it('should increase octave', () => {
        state = synth(state, octaveIncrease());
        expect(state.octave).to.equal(5);
    });

    it('should decrease octave', () => {
        state = synth(state, octaveDecrease());
        expect(state.octave).to.equal(4);
    });

    it('should set the view panel', () => {
        state = synth(state, setViewPanel('control'));
        expect(state.viewPanel).to.equal('control');
    });
});
