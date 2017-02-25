import React from 'react';

import { ActionHandler } from '../../components/ActionHandler';

const Footer = (props) => {

    const {
        height,
        octave,
        actions,
        isPianoVisible,
        isSpectrumVisible
    } = props;

    return (
        <div id="footer" style={{ height: height }}>
            <div className="container-fluid">
                <div className="octave pull-left">
                    <a className="cursor-pointer"
                       onClick={() => actions.octaveDecrease()}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Decrease Octave (Z)">
                        <i className="ion-minus-circled"></i>
                    </a>

                    <span className="octave-elem no-select cursor-default"> OCTAVE: {octave} </span>

                    <a className="cursor-pointer"
                       onClick={() => actions.octaveIncrease()}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Increase Octave (X)">
                        <i className="ion-plus-circled"></i>
                    </a>
                </div>
                <div className="footer-menu pull-right">
                    <a className={'cursor-pointer' + ((isPianoVisible) ? ' selected' : '')}
                       style={{ marginRight: '20px' }}
                       onClick={() => actions.setPianoVisibility(!isPianoVisible)}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Piano Keyboard">
                        <i className="icon-piano"/>
                    </a>
                    <a className={'cursor-pointer' + ((isSpectrumVisible) ? ' selected' : '')}
                       onClick={() => actions.setSpectrumVisibility(!isSpectrumVisible)}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Wave Spectrum">
                        <i className="ion-ios-pulse-strong"/>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ActionHandler(Footer);
