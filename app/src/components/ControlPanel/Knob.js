import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import knob from 'jquery-knob';

class Knob extends Component {

    componentDidMount () {
        const
            node = $(ReactDOM.findDOMNode(this)),
            { property, module, onUpdate } = this.props;

        node.find('input').knob({
            min: property.bounds[0] || 0,
            max: property.bounds[1] || 0,
            step: property.step || 1,
            fgColor: '#46bcec',
            bgColor: '#ccc',
            change: (value) => onUpdate(module, property.name, value)
        });
        node.find('input').val(property.value).trigger('change');

        node.find('input').on('keyup', () => onUpdate(module, property.name, parseInt(node.find('input').val(), 10)));
    }

    componentWillReceiveProps (newProps) {
        const
            node = $(ReactDOM.findDOMNode(this)),
            { property } = newProps;

        //TODO check for float....or parse int based on step?
        node.find('input')
            .val(property.value)
            .trigger('change');
    }

    render () {
        const { property } = this.props;

        return (
            <div style={{ width: '80px', height: '80px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center' }}>{property.name.toUpperCase()}</div>
                <input type="text"
                       data-width="80"
                       data-height="80"
                       data-skin="tron"
                       data-thickness=".3"
                       data-anglearc="250"
                       data-angleoffset="-125"/>
            </div>
        );
    }

}

export default Knob;
