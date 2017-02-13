import React from 'react';
import $ from 'jquery';

import SavedList from './SavedList';

const SaveOperation = (props) => {
    const
        { savedItems, windowHeight, saveAction, removeAction, updateAction } = props,
        h = (windowHeight) ? +windowHeight / 2 : 400;

    function saveSynth (e) {
        e.preventDefault();

        const val = e.target.newSynth.value;

        if (!val) {
            $('.newSynthGroup').addClass('has-error');
        } else {
            try {
                e.target.newSynth.value = '';
                saveAction(val);
            } catch (e) {
                //TODO manage duplicate message??
                $('.newSynthGroup').addClass('has-error');
            }
        }
    }

    function removeError () {
        if ($('.newSynthGroup').hasClass('has-error')) {
            $('.newSynthGroup').removeClass('has-error')
        }
    }

    return (
        <div id="save-operation" className="operation-modal modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Save Synth</h3>
                    </div>
                    <div className="modal-body">
                        <div className="save-new">
                            <form onSubmit={(e) => saveSynth(e)}>
                                <div className="form-group">
                                    <div className="input-group newSynthGroup">
                                        <input type="text"
                                               autoComplete="off"
                                               name="newSynth"
                                               className="form-control"
                                               onChange={() => removeError()}
                                               placeholder="Save New Synth"/>
                                        <div className="input-group-addon">
                                            <button type="submit">
                                                <i className="ion-ios-download"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="savedItemsList" style={{ height: h + 'px' }}>
                            <h5 className="modal-title">Overwrite existing</h5>
                            <SavedList id="save-op-modal"
                                       items={savedItems}
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

export default SaveOperation;
