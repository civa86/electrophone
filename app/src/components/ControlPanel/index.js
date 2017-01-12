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
            { modules, destroyModule } = this.props,
            display = this.props.isVisible ? 'block' : 'none';

        return (
            <div id="control-panel" className="row" style={{ display: display }}>
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
                    {modules.map(module =>
                        <div className="row synth-module" key={module.id}>
                            <div className="col-xs-12">
                                <div className="row module-title">
                                    <div className="col-xs-2">
                                        <div className={'module-elem ' + module.type.toLowerCase()}/>
                                    </div>
                                    <div className="col-xs-8">
                                        {module.type + ' -- ' + module.id}
                                    </div>
                                    <div className="col-xs-2" style={{ padding: '10px' }}>

                                        {
                                            !module.isMaster &&
                                            <div className="ion-trash-b pull-right"
                                                 style={{ cursor: 'pointer', fontSize: '24px' }}
                                                 onClick={() => destroyModule(module.id)}>
                                            </div>
                                        }
                                    </div>
                                </div>

                                <div className="row properties-container">
                                    {
                                        module.properties
                                            .filter(prop => prop.name !== 'link' && prop.name !== 'level')
                                            .map(prop =>
                                                <div className="col-xs-6 col-md-3"
                                                     style={{ paddingBottom: '20px', height: '100px' }}
                                                     key={module.id + prop.name}>
                                                    {this.getControlProperty(module.id, { ...prop })}
                                                </div>
                                            )
                                    }
                                    {
                                        module.properties
                                              .filter(prop => prop.name === 'level')
                                              .map(prop => {
                                                  return (
                                                      <div className="col-xs-6 col-md-3"
                                                           style={{ paddingBottom: '20px', height: '100px' }}
                                                           key={module.id + prop.name}>
                                                          {this.getControlProperty(module.id, { ...prop })}
                                                      </div>
                                                  );
                                              })
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
