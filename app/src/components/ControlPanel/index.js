import React, { Component } from 'react';
import $ from 'jquery';

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

    componentDidMount () {
        $('.collapse').on('hidden.bs.collapse', function () {
            const id = $(this).attr('id').replace('collapse', 'title');
            $('#' + id).addClass('collapsed');
        });
        $('.collapse').on('show.bs.collapse', function () {
            const id = $(this).attr('id').replace('collapse', 'title');
            $('#' + id).removeClass('collapsed');
        });
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
                                <div className="row module-title" id={'module-title-' + module.id}>
                                    <div className="col-xs-2 col-lg-1 vcenter module-elem-container">
                                        <div className={'module-elem ' + module.type.toLowerCase()}
                                             data-toggle="collapse"
                                             data-target={'#module-collapse-' + module.id}/>
                                    </div>
                                    <div className="col-xs-8 col-lg-10 vcenter">
                                        <div className="module-title-text">
                                            {module.type}
                                            {
                                                !module.isMaster &&
                                                ' #' + module.id.replace('node', '')
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xs-2 col-lg-1 vcenter module-delete-container">
                                        {
                                            !module.isMaster &&
                                            <i className="ion-trash-b pull-right"
                                               onClick={() => destroyModule(module.id)}/>
                                        }
                                    </div>
                                </div>

                                <div className="row properties-container collapse in"
                                     id={'module-collapse-' + module.id}>
                                    <div className="col-xs-12" style={{ paddingBottom: '20px' }}>
                                        <div className="row">
                                            {
                                                module.properties
                                                      .filter(prop => prop.name !== 'link' && prop.name !== 'level')
                                                      .map(prop =>
                                                          <div className="col-xs-6 col-md-3"
                                                               style={{ paddingTop: '20px', height: '100px' }}
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
                                                                   style={{ paddingTop: '20px', height: '100px' }}
                                                                   key={module.id + prop.name}>
                                                                  {this.getControlProperty(module.id, { ...prop })}
                                                              </div>
                                                          );
                                                      })
                                            }
                                        </div>
                                    </div>
                                    {
                                        !module.isMaster &&
                                        <div className="col-xs-12">
                                            <div className="link-text">
                                                <i className="ion-pull-request"/>
                                                {(module.link ? '#' + module.link.replace('node', '') : 'no link')}
                                            </div>
                                        </div>
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
