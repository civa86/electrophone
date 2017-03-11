const initState = {
    synth: {
        modules: [
            {
                id: 'master',
                type: 'Master',
                properties: [
                    {
                        name: 'level',
                        type: 'number',
                        bounds: [0, 100],
                        defaultValue: 100,
                        value: 100
                    },
                    {
                        name: 'attack',
                        type: 'number',
                        bounds: [0, 100],
                        defaultValue: 0,
                        value: 0

                    },
                    {
                        name: 'decay',
                        type: 'number',
                        bounds: [1, 100],
                        defaultValue: 1,
                        value: 1

                    },
                    {
                        name: 'sustain',
                        type: 'number',
                        bounds: [0, 100],
                        defaultValue: 100,
                        value: 100
                    },
                    {
                        name: 'release',
                        type: 'number',
                        bounds: [0, 100],
                        defaultValue: 5,
                        value: 5
                    }

                ],
                isMaster: true,
                isSelected: false,
                link: null,
                position: {
                    x: 'center',
                    y: 'center'
                }
            }
        ],
        octave: 4,
        playingVoices: []
    },
    ui: {
        graph: {
            instance: null,
            linkMode: false,
            pan: {
                x: 0,
                y: 0
            },
            zoom: 1
        },
        viewPanel: 'graph',
        isPianoVisible: false,
        isSpectrumVisible: false
    },
    app: {
        savedList: []
    }
};

export default initState;
