//TODO refactor-- rename this in Graph.js and the folder in GraphPanel...index is the panel!!
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cytoscape from 'cytoscape';

//Graph Service
import GraphService from './GraphService'
const graph = GraphService(cytoscape, window);

class Graph extends Component {

    componentDidMount () {
        const
            node = ReactDOM.findDOMNode(this),
            $canvas = document.createElement('canvas'),
            { actions, state, height, width } = this.props;

        node.style.width = width + 'px';
        node.style.height = height + 'px';

        //TODO try to add style rules...
        node.appendChild($canvas);
        $canvas.setAttribute('width', width);
        $canvas.setAttribute('height', height);
        $canvas.style.position = 'absolute';
        $canvas.style.top = 0;
        $canvas.style.left = 0;
        $canvas.style.zIndex = '900';

        graph.createGraph(
            node,
            $canvas.getContext('2d'),
            actions,
            state
        );
    }

    componentWillReceiveProps (newProps) {
        graph.refreshGraph(newProps.state);
    }

    render () {
        return (
            <div style={{ position: 'relative' }} className="no-select"/>
        )
    }
}

export default Graph;
