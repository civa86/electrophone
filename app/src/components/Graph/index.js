import React from 'react';
import Graph from './Graph';

const GraphPanel = (props) => {

    const {
        isVisible,
        synth,
        ui,
        graphWidth,
        graphHeight
        } = props;

    return (
        <div id="graph-panel" style={{ display: (isVisible) ? 'block' : 'none' }}>
            <Graph
                synthState={synth}
                uiState={ui}
                width={graphWidth}
                height={graphHeight}
            />
        </div>
    );
};

export default GraphPanel;
