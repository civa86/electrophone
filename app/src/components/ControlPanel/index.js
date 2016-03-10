import React, { Component } from 'react';

class ControlPanel extends Component {

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
                                {module.type + ' -- ' + module.id}
                                <div>
                                    {
                                        module.properties
                                            .filter(prop => prop.name !== 'link')
                                            .map(prop =>
                                                <div key={module.id + prop.name}>
                                                    {prop.name}: {prop.value}
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default ControlPanel;
