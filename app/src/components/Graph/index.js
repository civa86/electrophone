import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import cytoscape from 'cytoscape';

//Graph Service
import GraphService from './GraphService'
const graph = GraphService(cytoscape, window);

class Graph extends Component {

    componentDidMount () {
        const node = ReactDOM.findDOMNode(this),
            $canvas = document.createElement('canvas'),
            { actions, state, height } = this.props;

        node.style.height = height + 'px';

        node.appendChild($canvas);
        $canvas.setAttribute('width', node.offsetWidth);
        $canvas.setAttribute('height', node.offsetHeight);
        $canvas.style.position = 'absolute';
        $canvas.style.top = 0;
        $canvas.style.left = 0;
        $canvas.style.zIndex = '999';
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
            <div style={{ position: 'relative' }}/>
        )
    }
}

export default Graph;
