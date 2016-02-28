import React, { Component } from 'react';

class GlobalKeys extends Component {

    constructor (props) {
        super(props);

        this.onKeyDown = (event) => {
            const charCode = this.getKeyCode(event),
                { keyboardMapping } = this.props;
console.log(charCode)
            keyboardMapping.forEach(e => {
                if (e.keys.indexOf(charCode) !== -1 && typeof e.down === 'function') {
                    e.down(event, charCode);
                }
            });
        };

        this.onKeyUp = (event) => {
            const charCode = this.getKeyCode(event),
                { keyboardMapping } = this.props;

            keyboardMapping.forEach(e => {
                if (e.keys.indexOf(charCode) !== -1 && typeof e.up === 'function') {
                    e.up(event, charCode);
                }
            });
        };
    }

    getKeyCode (event) {
        const keyCode = event.which || event.keyCode;
        return keyCode;
    }

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
