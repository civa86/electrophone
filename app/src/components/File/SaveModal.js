import React from 'react';
import $ from 'jquery';

import { ActionHandler } from '../../components/ActionHandler';

import SaveForm from './SaveForm';
import ItemsList from './ItemsList';

const SaveModal = (props) => {
    const
        { items, actions, localCacheKey } = props,
        h = $(window).height() / 2;

    return (
        <div id="save-operation" className="operation-modal modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Save Synth</h3>
                    </div>
                    <div className="modal-body">
                        <SaveForm submitAction={ values => actions.saveSynth(values, localCacheKey)}
                                  items={items}/>

                        <div className="savedItemsList" style={{ height: h + 'px' }}>
                            <h5 className="modal-title">Overwrite existing</h5>
                            <ItemsList id="save-op-modal"
                                       items={items}
                                       mainOperation={{
                                           icon: 'ion-ios-download',
                                           question: 'Overwrite?',
                                           handler: id => actions.updateSavedSynth(id, localCacheKey),
                                           confirm: true
                                       }}
                                       onRemoveHandler={id => actions.removedSavedSynth(id, localCacheKey)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActionHandler(SaveModal);
