import React from 'react';

const Header = (props) => {

    const {
        height,
        repoUrl,
        libVersion,
        viewActions,
        linkMode,
        visiblePanel,
        numSelectedNodes,
        synthModules
        } = props;

    return (
        <div id="header" style={{ height: height }}>
            <div className="header-top container-fluid">
                <div className="logo no-select cursor-default pull-left">
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
                <ul className="container-fluid no-select">
                    <li className="pull-left">
                        <a className="cursor-pointer"
                           onClick={() => viewActions.resetSynth()}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Reset Synth">
                            <i className="ion-android-refresh"></i> <span className="menu-label hidden-xs">Reset</span>
                        </a>
                    </li>
                    <li className="pull-left">
                        <a className="cursor-pointer"
                           onClick={() => viewActions.saveSynth()}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Save Synth">
                            <i className="ion-android-download"></i> <span className="menu-label hidden-xs">Save</span>
                        </a>
                    </li>
                    <li className="pull-left">
                        <a className="cursor-pointer"
                           onClick={() => viewActions.loadSynth()}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Load Synth">
                            <i className="ion-android-upload"></i> <span className="menu-label hidden-xs">Load</span>
                        </a>
                    </li>
                    <li className="pull-left dropdown module-builder"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Create New Modules">
                        <a className="cursor-pointer dropdown-toggle"
                           role="button"
                           data-toggle="dropdown">
                            <i className="ion-fork-repo"></i> <span className="menu-label hidden-xs">Add</span>
                        </a>

                        <ul className="dropdown-menu">
                            {synthModules.map(e => {
                                return (
                                    <li key={e.type}>
                                        <a className="cursor-pointer"
                                            onClick={() => viewActions.addModule(e.type)}>
                                            {e.type}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                    <li className="pull-left"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Toggle Link Mode (SHIFT)">
                        <a className={'cursor-pointer' + ((linkMode) ? ' selected' : '')}
                           onClick={() => viewActions.toggleLinkMode()}>
                            <i className="ion-pull-request"></i> <span className="menu-label hidden-xs">Link</span>
                        </a>
                    </li>
                    <li className="pull-left"
                        style={{ display: (visiblePanel === 'graph' && numSelectedNodes > 0) ? 'block' : 'none' }}
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Delete Selected Nodes">
                        <a className="cursor-pointer"
                           onClick={() => viewActions.deleteSelectedNodes()}>
                            <i className="ion-trash-b"></i> <span className="menu-label hidden-xs">Delete</span>
                            <span className="delete-counter"
                                  style={{ display: (numSelectedNodes > 1) ? 'inline-block' : 'none' }}>&nbsp;
                                {'(' + numSelectedNodes + ')'}
                            </span>
                        </a>
                    </li>

                    <li className="pull-right last-right-item">
                        <a className={'cursor-pointer' + ((visiblePanel === 'control') ? ' selected' : '')}
                           onClick={() => viewActions.setViewPanel('control')}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Control view (TAB)"><i className="ion-levels"></i></a>
                    </li>
                    <li className="pull-right">
                        <a className={'cursor-pointer' + ((visiblePanel === 'graph') ? ' selected' : '')}
                           onClick={() => viewActions.setViewPanel('graph')}
                           data-toggle="tooltip"
                           data-placement="bottom"
                           title="Graph view (TAB)"><i className="ion-network"></i></a>
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

 </div>
 */
