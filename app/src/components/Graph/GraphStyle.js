'use strict';

import master from '../../../img/master.svg';
import envelope from '../../../img/envelope.svg';
import pan from '../../../img/pan.svg';
import modulator from '../../../img/modulator.svg';
import oscillator from '../../../img/oscillator.svg';
import noise from '../../../img/noise.svg';
import filter from '../../../img/filter.svg';
import moogfilter from '../../../img/moogfilter.svg';
import delay from '../../../img/delay.svg';
import pingpongdelay from '../../../img/pingpongdelay.svg';
import tremolo from '../../../img/tremolo.svg';
import overdrive from '../../../img/overdrive.svg';
import bitcrusher from '../../../img/bitcrusher.svg';

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
                'background-image': master,
                'background-color': '#ccc',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        //Control Modules
        {
            selector: 'node.envelope',
            style: {
                shape: 'polygon',
                'shape-polygon-points': '0, -0.7, 1, 1, -1, 1',
                'background-image': envelope,
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
                'shape-polygon-points': '-1, -1, 1, -1, 0, 0.7',
                'background-image': pan,
                'background-color': '#f6cde6',
                'background-position-y': '5%',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        {
            selector: 'node.modulator',
            style: {
                shape: 'polygon',
                'shape-polygon-points': '-1, -1, 0.7, 0, -1, 1',
                'background-image': modulator,
                'background-color': '#f6cde6',
                'background-position-x': '20%',
                'background-position-y': '50%',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        //Sound Modules
        {
            selector: 'node.oscillator',
            style: {
                'background-image': oscillator,
                'background-color': '#add9fe',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.noise',
            style: {
                'background-image': noise,
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
                'background-image': filter,
                'background-color': '#ddf9d9',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.moogfilter',
            style: {
                shape: 'roundrectangle',
                'background-image': moogfilter,
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
                'background-image': delay,
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.pingpongdelay',
            style: {
                shape: 'roundrectangle',
                'background-image': pingpongdelay,
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.tremolo',
            style: {
                shape: 'roundrectangle',
                'background-image': tremolo,
                'background-color': '#ffe5bc',
                'background-width': '80%',
                'background-height': '80%'
            }
        },
        {
            selector: 'node.overdrive',
            style: {
                shape: 'roundrectangle',
                'background-image': overdrive,
                'background-color': '#ffe5bc',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.bitcrusher',
            style: {
                shape: 'roundrectangle',
                'background-image': bitcrusher,
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
