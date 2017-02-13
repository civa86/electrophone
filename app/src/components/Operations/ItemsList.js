import React from 'react';
import moment from 'moment';
import $ from 'jquery';

const ItemsList = (props) => {
    const {
            id,
            items,
            mainOperation,
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

    function showConfirm (i, elem) {
        selector
            .find('#item-' + i)
            .find(elem).fadeIn();
    }

    function hideConfirm (i, elem) {
        selector
            .find('#item-' + i)
            .find(elem).fadeOut();
    }

    function hideAll () {
        selector.find('.confirm-operation').fadeOut();
    }

    function removeItem (id) {
        hideAll();
        onRemoveHandler(id);
    }

    function confirmOperation (id) {
        hideAll();
        mainOperation.handler(id);
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
                                            <i className={mainOperation.icon}
                                               onClick={() => {
                                                   if (mainOperation.confirm === true) {
                                                       showConfirm(i, '.action-confirm');
                                                   } else {
                                                       confirmOperation(e.id);
                                                   }
                                               }}
                                            />
                                            <i className="ion-trash-b"
                                               onClick={() => showConfirm(i, '.remove-confirm')}
                                            />
                                        </div>
                                        <div className="time">
                                            {moment(e.time).calendar()}
                                        </div>
                                    </div>
                                </div>
                                <div className="remove-confirm confirm-operation">
                                    <div className="col-xs-8 question">Delete?</div>
                                    <div className="col-xs-4 text-right">
                                        <div className="operations">
                                            <i className="ion-ios-checkmark"
                                               onClick={() => removeItem(e.id)}
                                            />
                                            <i className="ion-ios-close"
                                               onClick={() => hideConfirm(i, '.remove-confirm')}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="action-confirm confirm-operation">
                                    <div className="col-xs-8 question">{mainOperation.question}</div>
                                    <div className="col-xs-4 text-right">
                                        <div className="operations">
                                            <i className="ion-ios-checkmark"
                                               onClick={() => confirmOperation(e.id)}
                                            />
                                            <i className="ion-ios-close"
                                               onClick={() => hideConfirm(i, '.action-confirm')}
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
