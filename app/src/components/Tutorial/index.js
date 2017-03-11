import React from 'react';

import icon from '../../../img/icon.png';

const Tutorial = () => {
    return (
        <div id="tutorial" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header modal-pre-hide">
                        <div className="logo no-select cursor-default">
                            <div className="pull-left icon">
                                <img src={icon} alt="icon"/>
                            </div>
                            <div className="pull-left">
                                <span className="capital">H</span>ow
                                <span className="capital">T</span>o
                                <span className="capital">U</span>se
                            </div>
                        </div>
                        <div className="menu hidden-xs">
                            <ul className="no-select">
                                <li className="menu-item active"
                                    data-target="#carousel-slides" data-slide-to="0">
                                    <a className="cursor-pointer">
                                        <i className="ion-information-circled"/>
                                        <span className="menu-label">Intro</span>
                                    </a>
                                </li>
                                <li className="menu-item"
                                    data-target="#carousel-slides" data-slide-to="1">
                                    <a>
                                        <i className="ion-fork-repo"/>
                                        <span className="menu-label">Add</span>
                                    </a>
                                </li>
                                <li className="menu-item"
                                    data-target="#carousel-slides" data-slide-to="2">
                                    <a>
                                        <i className="ion-pull-request"/>
                                        <span className="menu-label">Link</span>
                                    </a>
                                </li>
                                <li className="menu-item"
                                    data-target="#carousel-slides" data-slide-to="3">
                                    <a>
                                        <i className="icon-piano" style={{ fontSize: '18px' }}/>
                                        <span className="menu-label">Play</span>
                                    </a>
                                </li>
                                <li className="menu-item"
                                    data-target="#carousel-slides" data-slide-to="4">
                                    <a>
                                        <i className="ion-levels"/>
                                        <span className="menu-label">Control</span>
                                    </a>
                                </li>
                                <li className="menu-item"
                                    data-target="#carousel-slides" data-slide-to="5">
                                    <a>
                                        <i className="ion-trash-b"/>
                                        <span className="menu-label">Delete</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="modal-body modal-pre-hide">
                        <div id="carousel-slides"
                             className="carousel slide"
                             data-interval="false"
                             data-ride="carousel">
                            <div className="carousel-inner" role="listbox">

                                <div className="item active" data-index="0">
                                    <div className="intro">
                                        <h4>Welcome to ElectroPhone</h4>
                                        <p className="sub-title">
                                            Learn how to start building and playing your custom syntesizer.
                                        </p>
                                        <p>
                                            Based on Web Audio API.
                                        </p>
                                        <p>
                                            Add modules and link them each other.
                                        </p>
                                        <p>
                                            Master module lets sound coming out your sound card.
                                        </p>
                                        <p>
                                            User you keyboard to play notes.
                                        </p>
                                        <p>
                                            Change between graph and control view.
                                        </p>
                                        <p>
                                            Turn knobs to change module properties.
                                        </p>
                                    </div>
                                </div>

                                <div className="item" data-index="1">
                                    <div className="anim-slide add-modules-slide"/>
                                    <div className="carousel-caption">
                                        <i className="badge-icon ion-ios-information-outline"/>
                                        <span className="badge-txt">
                                            Add modules and build your synthesizer.<br/>
                                            Oscillator and Noise can make sounds.
                                        </span>
                                    </div>
                                </div>
                                <div className="item" data-index="2">
                                    <div className="anim-slide link-modules-slide"/>
                                    <div className="carousel-caption">
                                        <i className="badge-icon ion-ios-information-outline"/>
                                        <span className="badge-txt">
                                            Link modules. Sound comes out from Master.<br/>
                                            Press <b className="key">SHIFT</b> to quick toggle link mode.
                                        </span>
                                    </div>
                                </div>
                                <div className="item" data-index="3">
                                    <div className="anim-slide play-slide"/>
                                    <div className="carousel-caption top-caption">
                                        <i className="badge-icon ion-ios-information-outline"/>
                                        <span className="badge-txt">
                                            Play with your keyboard.<br/>
                                            Press <b className="key">Z</b> <b className="key">X</b> to change octave.
                                        </span>
                                    </div>
                                </div>
                                <div className="item" data-index="4">
                                    <div className="anim-slide control-slide"/>
                                    <div className="carousel-caption">
                                        <i className="badge-icon ion-ios-information-outline"/>
                                        <span className="badge-txt">
                                            Control module properties.<br/>
                                            Press <b className="key">TAB</b> to switch view.
                                        </span>
                                    </div>
                                </div>
                                <div className="item" data-index="5">
                                    <div className="anim-slide delete-slide"/>
                                    <div className="carousel-caption">
                                        <i className="badge-icon ion-ios-information-outline"/>
                                        <span className="badge-txt">
                                            Delete modules.<br/>
                                            press <b className="key">DELETE</b> to remove selected modules.
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <a className="cursor-pointer left carousel-control"
                               data-target="#carousel-slides"
                               role="button"
                               data-slide="prev">
                                <span className="carousel-control-icon ion-chevron-left"/>
                            </a>
                            <a className="cursor-pointer right carousel-control"
                               data-target="#carousel-slides"
                               role="button"
                               data-slide="next">
                                <span className="carousel-control-icon ion-chevron-right"/>
                            </a>
                        </div>
                    </div>
                    <div className="modal-footer modal-pre-hide">
                        <button className="btn" data-dismiss="modal">Got It!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
