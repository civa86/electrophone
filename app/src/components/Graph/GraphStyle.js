'use strict';

const style = {
    layout: {
        name: 'circle'
    },
    style: [
        {
            selector: 'core',
            style: {
                'active-bg-opacity': 0
            }
        },
        {
            selector: 'node',
            style: {
                width: 100,
                height: 100,
                'overlay-opacity': 0,
                'background-color': '#ccc'
            }
        },
        {
            selector: 'node.master',
            style: {
                width: 140,
                height: 140,
                shape: 'heptagon',
                'border-width': 0,
                'background-color': 'purple'
            }
        },
        {
            selector: 'node.oscillator',
            style: {
                'background-image': '../../../img/osc.svg',
                'background-fit': 'cover'
            }
        },
        {
            selector: 'node.filter',
            style: {
                shape: 'roundrectangle'
            }
        },
        {
            selector: 'node.selected',
            style: {
                'background-color': 'green'
            }
        },
        {
            selector: 'node.link-mode',
            style: {
                'background-color': 'purple'
            }
        },
        {
            selector: 'node.link-mode-master',
            style: {
                'background-color': 'black'
            }
        },
        {
            selector: 'edge',
            style: {
                width: 6,
                'line-color': '#666',
                'line-style': 'dashed'
            }
        }
    ],
    zoomingEnabled: true,
    userZoomingEnabled: true,
    boxSelectionEnabled: false
};

export default style;
