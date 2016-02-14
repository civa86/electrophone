import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as SynthActions from '../actions/SynthActions';

class App extends Component {
    render () {
        const { synth, dispatch } = this.props;
        return (
            <Counter counter={synth}
                {...bindActionCreators(SynthActions, dispatch)} />
        );
    }
}

function select (state) {
    return {
        synth: state.synth
    };
}

export default connect(select)(App);
