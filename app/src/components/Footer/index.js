import React from 'react';

const Footer = (props) => {

    const {
        height,
        viewActions,
        octave,
        isPianoVisible
        } = props;

    return (
        <div id="footer" style={{ height: height }}>
            <div className="container-fluid">
                <div className="octave pull-left">
                    <a className="cursor-pointer"
                       onClick={() => viewActions.octaveDecrease()}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Decrease Octave (Z)">
                        <i className="ion-minus-circled"></i>
                    </a>

                    <span className="octave-elem no-select cursor-default"> OCTAVE: {octave} </span>

                    <a className="cursor-pointer"
                       onClick={() => viewActions.octaveIncrease()}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Increase Octave (X)">
                        <i className="ion-plus-circled"></i>
                    </a>
                </div>
                <div className="footer-menu pull-right">
                    <a className={'cursor-pointer' + ((isPianoVisible) ? ' selected' : '')}
                       onClick={() => viewActions.setPianoVisibility(!isPianoVisible)}
                       data-toggle="tooltip"
                       data-placement="top"
                       title="Piano Keyboard">
                        <i className="icon-piano"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
