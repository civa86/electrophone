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
                width: 80,
                height: 80,
                'overlay-opacity': 0
            }
        },
        {
            selector: 'node.selected',
            style: {
                'background-color': 'green'
            }
        }
    ],
    zoomingEnabled: true,
    userZoomingEnabled: true,
    boxSelectionEnabled: false
};

export default style;
