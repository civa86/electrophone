import React, { Component } from 'react';

class GlobalKeys extends Component {

    getKeyCode (e) {
        const keyCode = e.which || e.keyCode;
        return keyCode;
    }

    onKeyDown (e) {
        const charCode = this.getKeyCode(e)
        console.log('pressed', charCode);
    }

    componentDidMount () {
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
    }

    render () {
        return (
            <div style={{ display: 'none' }} />
        )
    }
}

export default GlobalKeys;
