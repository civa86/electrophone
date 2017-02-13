import React from 'react';
import $ from 'jquery';

import SaveForm from './SaveForm';
import ItemsList from './ItemsList';

const SaveModal = (props) => {
    const
        { items, saveAction, updateAction, removeAction } = props,
        h = $(window).height() / 2;

    return (
        <div id="save-operation" className="operation-modal modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Save Synth</h3>
                    </div>
                    <div className="modal-body">
                        <SaveForm submitAction={saveAction}
                                  items={items}/>

                        <div className="savedItemsList" style={{ height: h + 'px' }}>
                            <h5 className="modal-title">Overwrite existing</h5>
                            <ItemsList id="save-op-modal"
                                       items={items}
                                       operationIcon="ion-ios-download"
                                       confirmMessage="Overwrite?"
                                       onConfirmHandler={id => updateAction(id)}
                                       onRemoveHandler={id => removeAction(id)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaveModal;
