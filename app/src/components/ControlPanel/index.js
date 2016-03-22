import React, { Component } from 'react';

import Knob from './Knob';
import Select from './Select'

class ControlPanel extends Component {
    getControlProperty (prop) {
        if (prop.type === 'number') {
            return <Knob property={prop}/>;
        } else if (prop.type === 'string') {
            return <Select property={prop}/>;
        }
    }

    render () {
        const
            { isVisible, modules } = this.props,
            display = isVisible ? 'block' : 'none';

        return (
            <div id="control-panel" className="row" style={{ display: display }}>
                <div className="col-xs-10 col-xs-offset-1">
                    {modules.map(module =>
                        <div className="row" key={module.id}>
                            <div className="col-xs-12">
                                <div style={{ border: '1px solid #333' }}>
                                    <p className="bg-primary" style={{ padding: '10px' }}>
                                        {module.type + ' -- ' + module.id}
                                    </p>
                                    <div className="row">
                                        {
                                            module.properties
                                                .filter(prop => prop.name !== 'link')
                                                .map(prop =>
                                                    <div className="col-xs-2"
                                                         key={module.id + prop.name}>
                                                        {this.getControlProperty({ ...prop })}
                                                    </div>
                                                )
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default ControlPanel;
