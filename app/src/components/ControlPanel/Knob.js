import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import knob from 'jquery-knob';

class Knob extends Component {

    componentDidMount () {
        const
            node = $(ReactDOM.findDOMNode(this)),
            { property, module, onUpdate } = this.props;

        //TODO set step from property...remove parse int....
        node.find('input').knob({
            min: property.bounds[0],
            max: property.bounds[1],
            change: (value) => onUpdate(module, property.name, parseInt(value, 10))
        });
        node.find('input').val(property.value).trigger('change');
    }

    componentWillReceiveProps (newProps) {
        const
            node = $(ReactDOM.findDOMNode(this)),
            { property } = newProps;

        //TODO set step from property...
        //check for float....
        node.find('input')
            .val(property.value)
            .trigger('change');
    }

    render () {
        const
            { property } = this.props;

        return (
            <div>
                <div>{property.name.toUpperCase()}</div>
                <input type="text"
                       data-width="75"
                       data-height="75"
                       data-skin="tron"
                       data-thickness=".3"
                       data-anglearc="250"
                       data-angleoffset="-125"/>
            </div>
        );
    }

}

export default Knob;
