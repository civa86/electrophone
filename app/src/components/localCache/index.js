import React, { Component } from 'react';

class LocalCache extends Component {

    constructor (props) {
        super(props);
        this.hasStorage = false;
    }

    setItem (obj) {
        localStorage.setItem('synthState', JSON.stringify(obj));
    }

    componentDidMount () {
        if (typeof(Storage) !== "undefined") {
            this.hasStorage = true;
        }
    }

    componentWillReceiveProps (newProps) {
        if (this.hasStorage) {
            this.setItem(newProps.synth);
        }
    }

    render () {
        return (
            <div style={{ display: 'none' }}/>
        )
    }
}

export default LocalCache;
