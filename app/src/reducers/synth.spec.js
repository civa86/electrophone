import { expect } from 'chai';
import { addAudioNode, setAudioNodeSelection, setLinkMode, toggleLinkMode } from '../actions/SynthActions';
import synth from './synth';

describe('Synth reducer', () => {
    let state = synth();

    it('should have an initial state', () => {
        expect(state.modules).to.deep.equal([]);
        expect(state.linkMode).to.equal(false);
    });

    it('should set link mode on', () => {
        state = synth(state, setLinkMode(true));
        expect(state.linkMode).to.equal(true);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should toggle link mode', () => {
        state = synth(state, toggleLinkMode());
        expect(state.linkMode).to.equal(false);
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should add an audio node', () => {
        state = synth(state, addAudioNode({ id: 'ele1' }));
        expect(state.modules.length).to.equal(1);
        expect(state.modules[0].id).to.equal('ele1');
        expect(Object.keys(state)).to.deep.equal(Object.keys(state));
    });

    it('should select an audio node', () => {
        let selectedNode;

        state = synth(state, setAudioNodeSelection('ele1', true));
        selectedNode = state.modules.filter(e => e.id === 'ele1').pop();
        expect(selectedNode.isSelected).to.equal(true);
    });
});
