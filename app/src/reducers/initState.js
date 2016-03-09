const initState = {
    modules: [
        {
            id: 'node0',
            type: 'Master',
            properties: {
                level: {
                    type: 'number',
                    bounds: [0, 100],
                    defaultValue: 100
                },
                attack: {
                    type: 'number',
                    bounds: [0, 100],
                    defaultValue: 0
                },
                decay: {
                    type: 'number',
                    bounds: [1, 100],
                    defaultValue: 1
                },
                sustain: {
                    type: 'number',
                    bounds: [0, 100],
                    defaultValue: 100
                },
                release: {
                    type: 'number',
                    bounds: [0, 100],
                    defaultValue: 5
                }
            },
            isMaster: true,
            isSelected: false,
            link: null,
            position: {
                x: 100,
                y: 100
            }
        }
    ],
    graph: {
        linkMode: false,
        pan: {
            x: 0,
            y: 0
        },
        zoom: 1
    },
    octave: 4,
    viewPanel: 'graph'
};

export default initState;
