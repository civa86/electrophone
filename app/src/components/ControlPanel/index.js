import React, { Component } from 'react';

import Knob from './Knob';
import Select from './Select'

class ControlPanel extends Component {
    getControlProperty (module, prop) {
        const { updateModule } = this.props;

        if (prop.type === 'number') {
            return <Knob property={prop} module={module} onUpdate={updateModule}/>;
        } else if (prop.type === 'string') {
            return <Select property={prop} module={module} onUpdate={updateModule}/>;
        }
    }

    render () {
        const
            { isVisible, modules, destroyModule } = this.props,
            display = isVisible ? 'block' : 'none';

        return (
            <div id="control-panel" className="row" style={{ display: display }}>
                <div className="col-xs-10 col-xs-offset-1">
                    {modules.map(module =>
                        <div className="row" key={module.id} style={{ marginTop: '10px' }}>
                            <div className="col-xs-12">

                                <div className="row bg-primary"
                                     style={{ border: '1px solid #333', borderBottom: 'none' }}>
                                    <div className="col-xs-12"  style={{ padding: '10px' }}>
                                        {module.type + ' -- ' + module.id}

                                        {(() => {
                                            if (!module.isMaster) {
                                                return (
                                                    <div className="glyphicon glyphicon-remove pull-right"
                                                         style={{ cursor: 'pointer' }}
                                                         onClick={() => destroyModule(module.id)}>
                                                    </div>
                                                );
                                            }
                                        })()}
                                    </div>
                                </div>

                                <div className="row"
                                     style={{ border: '1px solid #333', borderTop: 'none', paddingTop: '20px' }}>
                                    {
                                        module.properties
                                            .filter(prop => prop.name !== 'link')
                                            .map(prop =>
                                                <div className="col-xs-2"
                                                     key={module.id + prop.name}>
                                                    {this.getControlProperty(module.id, { ...prop })}
                                                </div>
                                            )
                                    }
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
