import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';

class App extends Component {
    render () {
        const { synth, dispatch } = this.props;
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
