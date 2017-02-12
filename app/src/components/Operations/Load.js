import React from 'react';

import SavedList from './SavedList';

const LoadOperation = (props) => {
    const
        { savedItems, windowHeight, loadAction, removeAction } = props,
        h = (windowHeight) ? +windowHeight / 2 : 400;

    return (
        <div id="load-operation" className="operation-modal modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Load Synth</h3>
                    </div>
                    <div className="modal-body">
                        <div className="savedItemsList" style={{ height: h + 'px' }}>
                            <SavedList id="load-op-modal"
                                       items={savedItems}
                                       operationIcon="ion-ios-upload"
                                       confirmMessage="Load?"
                                       onConfirmHandler={id => loadAction(id)}
                                       onRemoveHandler={id => removeAction(id)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadOperation;
