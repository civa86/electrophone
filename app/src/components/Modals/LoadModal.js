import React from 'react';
import $ from 'jquery';

import { ActionHandler } from '../../components/ActionHandler';

import ItemsList from './ItemsList';

const LoadModal = (props) => {
    const
        { items, actions, localCacheKey } = props,
        h = $(window).height() / 2; //TODO use screen service?

    return (
        <div id="load-operation" className="operation-modal modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Load Synth</h3>
                    </div>
                    <div className="modal-body">
                        <div className="savedItemsList" style={{ height: h + 'px' }}>
                            <ItemsList id="load-op-modal"
                                       items={items}
                                       mainOperation={{
                                           icon: 'ion-ios-upload',
                                           handler: id => actions.loadSynth(id, localCacheKey),
                                           confirm: false
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

export default ActionHandler(LoadModal);
