import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as SynthActions from '../actions/SynthActions';

class App extends Component {
    render () {
        const { synth, dispatch } = this.props;
        return (
            <div>
                <p>{synth}</p>
                <button onClick={() => dispatch(SynthActions.increment())}>increment</button>
                <button onClick={() => dispatch(SynthActions.decrement())}>decrement</button>
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
