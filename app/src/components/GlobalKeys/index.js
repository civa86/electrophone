import React, { Component } from 'react';

class GlobalKeys extends Component {

    getKeyCode (e) {
        const keyCode = e.which || e.keyCode;
        return keyCode;
    }

    onKeyDown = (e) => {
        const charCode = this.getKeyCode(e),
            { keyboardMapping } = this.props;

        if (
            keyboardMapping.linkMode &&
            typeof keyboardMapping.linkMode.down === 'function' &&
            e.shiftKey &&
            charCode === 16
        ) {
            keyboardMapping.linkMode.down();

        } else if (
            keyboardMapping.note &&
            typeof keyboardMapping.note.down === 'function' &&
            keyboardMapping.notes &&
            keyboardMapping.notes[charCode]
        ) {
            keyboardMapping.note.down(keyboardMapping.notes[charCode]);
        }
    };

    onKeyUp = (e) => {
        const charCode = this.getKeyCode(e),
            { keyboardMapping } = this.props;

        if (
            keyboardMapping.linkMode &&
            typeof keyboardMapping.linkMode.up === 'function' &&
            charCode === 16
        ) {
            keyboardMapping.linkMode.up();
        } else if (
            keyboardMapping.note &&
            typeof keyboardMapping.note.up === 'function' &&
            keyboardMapping.notes &&
            keyboardMapping.notes[charCode]
        ) {
            keyboardMapping.note.up(keyboardMapping.notes[charCode]);
        }
    };

    componentDidMount () {
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);
    }

    render () {
        return (
            <div style={{ display: 'none' }}/>
        )
    }
}

export default GlobalKeys;
