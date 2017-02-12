import React from 'react';

const SavedList = (props) => {
    const { items, onClickHandler } = props;

    function sortByTime(a, b) {
        function asc (a, b) {
            return a < b ? -1 : (b < a) ? 1 : 0;
        }

        if (a && a.time && b && b.time) {
            return -1 * asc(a.time, b.time);
        }
    }

    return (
        <div className="saved-list">
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
                        <div>{e.id}</div>
                        <div>{e.time}</div>
                    </div>
                ))
            }
        </div>
    );
};

export default SavedList;
