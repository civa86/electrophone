import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';
import Graph from '../components/Graph';

class App extends Component {
    render () {
        const
            { synth, dispatch } = this.props,
            graphActions = {
                onClickHandler: (node, isSeletected) => dispatch(SynthActions.setAudioNodeSelection(node, isSeletected))
            };

        return (
            <div>
                {synth.modules.map(e =>
                    <p key={e.id} onClick={() => dispatch(
                        SynthActions.setAudioNodeSelection(e.id, !e.isSelected)
                    )}>
                        {e.id} - {e.isSelected ? 'V' : 'X'}
                    </p>
                )}
                <button onClick={() => dispatch(
                    SynthActions.addAudioNode({ id: 'ele' + synth.modules.length })
                )}>
                    add
                </button>
                <Graph modules={synth.modules}
                       linkMode={synth.linkMode}
                       actions={graphActions}
                />
            </div>
        );
    }
}

function select (state) {
    return {
        synth: state.synth
    };
}

export default connect(select)(App);
