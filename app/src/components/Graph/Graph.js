import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cytoscape from 'cytoscape';

import { ActionHandler } from '../../components/ActionHandler';

//Graph Service
import GraphService from './GraphService'
const graph = GraphService(cytoscape, window);

class Graph extends Component {

    componentDidMount () {
        const
            node = ReactDOM.findDOMNode(this),
            $canvas = document.createElement('canvas'),
            { actions, synthState, uiState, height, width } = this.props;

        node.style.width = width + 'px';
        node.style.height = height + 'px';

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
            synthState,
            uiState
        );
    }

    componentWillReceiveProps (newProps) {
        graph.refreshGraph(newProps.synthState, newProps.uiState);
    }

    render () {
        return (
            <div style={{ position: 'relative' }} className="no-select"/>
        )
    }
}

export default ActionHandler(Graph);
