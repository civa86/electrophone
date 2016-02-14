import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GraphService from './GraphService'

const graph = GraphService();

class Graph extends Component {

    componentDidMount () {
        const node = ReactDOM.findDOMNode(this),
            graphHeight = 300,
            $canvas = document.createElement('canvas');

        node.style.height = graphHeight + 'px';

        node.appendChild($canvas);
        $canvas.setAttribute('width', node.offsetWidth);
        $canvas.setAttribute('height', node.offsetHeight);
        $canvas.style.position = 'absolute';
        $canvas.style.top = 0;
        $canvas.style.left = 0;
        $canvas.style.zIndex = '999';
        graph.createGraph(node, $canvas.getContext('2d'), this.props.actions);
    }

    componentWillReceiveProps (newProps) {
        graph.refreshNodes(newProps.modules);
        graph.setLinkMode(newProps.linkMode);
    }

    render () {
        return (
            <div style={{ position: 'relative' }}/>
        )
    }
}

export default Graph;
