import React from 'react';
import moment from 'moment';
import $ from 'jquery';

const ItemsList = (props) => {
    const {
            id,
            items,
            operationIcon,
            confirmMessage,
            onConfirmHandler,
            onRemoveHandler
        } = props,
        selector = $('#' + id);

    function sortByTime (a, b) {
        function asc (a, b) {
            return a < b ? -1 : (b < a) ? 1 : 0;
        }

        if (a && a.time && b && b.time) {
            return -1 * asc(a.time, b.time);
        }
    }

    return (
        <div id={id} className="saved-list">
            {
                items.length === 0 &&
                <div>No saved synths</div>
            }
            {
                items.length > 0 &&
                items
                    .sort((a, b) => sortByTime(a, b))
                    .map((e, i) => (
                        <div key={i}>
                            <div id={'item-' + i} className="saved-item">
                                <div className="row">
                                    <div className="col-xs-8 name">{e.id}</div>
                                    <div className="col-xs-4 text-right">
                                        <div className="operations">
                                            <i className={operationIcon}
                                               onClick={() => selector
                                                            .find('#item-' + i)
                                                            .find('.action-confirm').fadeIn()}
                                            />
                                            <i className="ion-trash-b"
                                               onClick={() => selector
                                                            .find('#item-' + i)
                                                            .find('.remove-confirm').fadeIn()}
                                            />
                                        </div>
                                        <div className="time">
                                            {moment(e.time).calendar()}
                                        </div>
                                    </div>
                                </div>
                                <div className="remove-confirm confirm-operation">
                                    <div className="col-xs-8 question">Remove?</div>
                                    <div className="col-xs-4 text-right">
                                        <div className="operations">
                                            <i className="ion-ios-checkmark"
                                               onClick={() => {
                                                   selector.find('.confirm-operation').fadeOut();
                                                   onRemoveHandler(e.id);
                                               }}
                                            />
                                            <i className="ion-ios-close"
                                               onClick={() => selector
                                                   .find('#item-' + i)
                                                   .find('.remove-confirm').fadeOut()
                                               }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="action-confirm confirm-operation">
                                    <div className="col-xs-8 question">{confirmMessage}</div>
                                    <div className="col-xs-4 text-right">
                                        <div className="operations">
                                            <i className="ion-ios-checkmark"
                                               onClick={() => {
                                                   selector.find('.confirm-operation').fadeOut();
                                                   onConfirmHandler(e.id);
                                               }}
                                            />
                                            <i className="ion-ios-close"
                                               onClick={() => selector
                                                            .find('#item-' + i)
                                                            .find('.action-confirm').fadeOut()}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            }
        </div>
    );
};

export default ItemsList;
