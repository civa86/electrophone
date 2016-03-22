import React, { Component } from 'react';

class Select extends Component {

    render () {
        const
            { property } = this.props;

        return (
            <div className="dropdown">
                <div>{property.name.toUpperCase()}</div>
                <button className="btn btn-default dropdown-toggle"
                        type="button"
                        id="dropdownMenu1"
                        data-toggle="dropdown">
                    {property.value}
                    <span className="caret"></span>
                </button>
                <ul className="dropdown-menu">
                    {property.bounds
                        .filter(val => val !== property.value)
                        .map(val =>
                            <li key={val}>
                                <a>{val}</a>
                            </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Select;
