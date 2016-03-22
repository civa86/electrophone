import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import knob from 'jquery-knob';

class Knob extends Component {
    onChange (value) {
        console.log(value);
    }

    componentDidMount () {
        const
            node = $(ReactDOM.findDOMNode(this)),
            { property } = this.props;

        //TODO set step from property...
        node.find('input').knob({
            min: property.bounds[0],
            max: property.bounds[1],
            change: (value) => this.onChange(value)
        });
    }

    componentWillReceiveProps (newProps) {
        const
            node = $(ReactDOM.findDOMNode(this)),
            { property } = newProps;

        //TODO set step from property...
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
                       data-angleoffset="-125" />
            </div>
        );
    }

}

export default Knob;
