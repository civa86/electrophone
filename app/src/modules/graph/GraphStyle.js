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
                width: 50,
                height: 50,
                'overlay-opacity': 0
            }
        },
        {
            selector: 'node.selected',
            style: {
                'background-color': 'black'
            }
        }
    ],
    zoomingEnabled: false,
    userZoomingEnabled: false,
    boxSelectionEnabled: false
};

export default style;
