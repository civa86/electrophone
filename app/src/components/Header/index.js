import React from 'react';

const Header = (props) => {

    const {
        height,
        repoUrl,
        libVersion,
        viewActions,
        visiblePanel
        } = props;

    return (
        <div id="header" style={{ height: height }}>
            <div className="header-top container">
                <div className="logo pull-left">
                    <span className="capital">W</span>eb<span className="capital">S</span>ynth
                    <span className="version">{libVersion}</span>
                </div>

                <div className="links pull-right">
                    <a className="link-left"
                       href="./docs"
                       target="_blank"
                       data-toggle="tooltip"
                       data-placement="bottom"
                       title="Documentation">
                        <i className="ion-ios-book"></i>
                    </a>
                    <a href={repoUrl}
                       target="_blank"
                       data-toggle="tooltip"
                       data-placement="bottom"
                       title="GitHub">
                        <i className="ion-social-github"></i>
                    </a>
                </div>
            </div>

            <div className="menu">
                <ul className="container">
                    <li className="pull-left">
                        <a className="cursor-pointer"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Reset Synth"><i className="ion-loop"></i></a>
                    </li>
                    <li className="pull-left">
                        <a className="cursor-pointer"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Load Synth"><i className="ion-upload"></i></a>
                    </li>
                    <li className="pull-left">
                        <a className="cursor-pointer"
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Save Synth"><i className="ion-archive"></i></a>
                    </li>

                    <li className="pull-right" style={{ paddingRight: '0px' }}>
                        <a className={'cursor-pointer' + ((visiblePanel === 'graph') ? ' selected' : '')}
                           onClick={() => viewActions.setViewPanel('graph')}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Graph view"><i className="ion-network"></i></a>
                    </li>
                    <li className="pull-right">
                        <a className={'cursor-pointer' + ((visiblePanel === 'control') ? ' selected' : '')}
                           onClick={() => viewActions.setViewPanel('control')}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Control view"><i className="ion-levels"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;

/*
 <div className="col-xs-8">
 <button onClick={() => dispatch(SynthActions.toggleLinkMode())}>
 LINK MODE
 </button>
 <button onClick={() => localCache.saveState(localCacheKey, synth)}>
 SAVE SYNTH
 </button>
 <button onClick={() => dispatch(SynthActions.loadState(localCache.loadState(localCacheKey)))}>
 LOAD SYNTH
 </button>
 <button onClick={() => dispatch(SynthActions.resetState())}>
 RESET SYNTH
 </button>
 <br/>
 OCTAVE: {synth.octave}
 <br/>
 <button onClick={() => dispatch(SynthActions.setViewPanel('add'))}>
 ADD MODULE
 </button>

 <button onClick={() => dispatch(SynthActions.setViewPanel('graph'))}>
 GRAPH PANEL
 </button>

 <button onClick={() => dispatch(SynthActions.setViewPanel('control'))}>
 CONTROL PANEL
 </button>

 </div>
 */
