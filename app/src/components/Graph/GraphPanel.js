import React from 'react';
import Graph from './index';

const GraphPanel = (props) => {

    const {
        isVisible,
        synth,
        ui,
        graphWidth,
        graphHeight,
        viewActions
        } = props;

    return (
        <div id="graph-panel" style={{ display: (isVisible) ? 'block' : 'none' }}>
            <Graph
                synthState={synth}
                uiState={ui}
                width={graphWidth}
                height={graphHeight}
                actions={viewActions}
            />
        </div>
    );
};

export default GraphPanel;
