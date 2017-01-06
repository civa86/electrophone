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
                shape: 'heptagon',
                'border-width': 0,
                // 'background-color': 'purple',
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
                'shape-polygon-points': '0, -0.7, 0, -0.7, 1, 1, -1, 1',
                'background-image': '../../../img/envelope.svg',
                'background-position-y': '95%',
                'background-width': '50%',
                'background-height': '50%'
            }
        },
        {
            selector: 'node.pan',
            style: {
                shape: 'polygon',
                'shape-polygon-points': '0, -0.7, 0, -0.7, 1, 1, -1, 1',
                'background-image': '../../../img/pan.svg',
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
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.modulator',
            style: {
                'background-image': '../../../img/modulator.svg',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.noise',
            style: {
                'background-image': '../../../img/noise.svg',
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
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.moogfilter',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/moogfilter.svg',
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
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.pingpongdelay',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/pingpongdelay.svg',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.tremolo',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/tremolo.svg',
                'background-width': '80%',
                'background-height': '80%'
            }
        },
        {
            selector: 'node.overdrive',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/overdrive.svg',
                'background-width': '75%',
                'background-height': '75%'
            }
        },
        {
            selector: 'node.bitcrusher',
            style: {
                shape: 'roundrectangle',
                'background-image': '../../../img/bitcrusher.svg',
                'background-width': '75%',
                'background-height': '75%'
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
