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
        //Master
        {
            selector: 'node.master',
            style: {
                width: 140,
                height: 140,
                shape: 'hexagon',
                'border-width': 0,
                'background-image': '../../../img/master.svg',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        //Sound Shapers
        {
            selector: 'node.envelope',
            style: {
                shape: 'polygon',
                'shape-polygon-points': '0, -0.7, 1, 1, -1, 1',
                'background-image': '../../../img/envelope.svg',
                'background-color': '#f6cde6',
                'background-position-y': '95%',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        {
            selector: 'node.pan',
            style: {
                shape: 'polygon',
                'shape-polygon-points': '0, -0.7, 1, 1, -1, 1',
                'background-image': '../../../img/pan.svg',
                'background-color': '#f6cde6',
                'background-position-y': '95%',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        //SoundSources
        {
            selector: 'node.oscillator',
            style: {
                'background-image': '../../../img/oscillator.svg',
                'background-color': '#add9fe',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.modulator',
            style: {
                'background-image': '../../../img/modulator.svg',
                'background-color': '#add9fe',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.noise',
            style: {
                'background-image': '../../../img/noise.svg',
                'background-color': '#add9fe',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        //Filters
        {
            selector: 'node.filter',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/filter.svg',
                'background-color': '#ddf9d9',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.moogfilter',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/moogfilter.svg',
                'background-color': '#ddf9d9',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        //Effects
        {
            selector: 'node.delay',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/delay.svg',
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.pingpongdelay',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/pingpongdelay.svg',
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.tremolo',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/tremolo.svg',
                'background-color': '#ffe5bc',
                'background-width': '80%',
                'background-height': '80%'
            }
        },
        {
            selector: 'node.overdrive',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/overdrive.svg',
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.bitcrusher',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/bitcrusher.svg',
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.selected',
            style: {
                'border-width': 4,
                'border-color': '#333'
            }
        },
        {
            selector: 'node.link-mode',
            style: {
                'border-width': 4,
                'border-color': '#ccc',
                'border-style': 'double'
            }
        },
        {
            selector: 'edge',
            style: {
                width: 4,
                'line-color': '#333',
                'line-style': 'dashed'
            }
        }
    ],
    zoomingEnabled: true,
    userZoomingEnabled: true,
    boxSelectionEnabled: false
};

export default style;
