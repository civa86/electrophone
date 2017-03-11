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
                                    <h1>Intro</h1>
                                </div>

                                <div className="item" data-index="1">
                                    <div className="anim-slide add-modules-slide"/>
                                    <div className="carousel-caption">
                                        <h6>Add Modules</h6>
                                        <p>
                                            <span className="badge"><i className="ion-information"></i></span>
                                            <span className="badge-txt">Oscillator and Noise can make sounds</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="item" data-index="2">
                                    <div className="anim-slide link-modules-slide"/>
                                    <div className="carousel-caption">
                                        <h6>Link Modules</h6>
                                        <p>
                                            <span className="badge"><i className="ion-information"></i></span>
                                            <span className="badge-txt">Press SHIFT to quick toggle link mode</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="item" data-index="3">
                                    <div className="anim-slide play-slide"/>
                                    <div className="carousel-caption top-caption">
                                        <h6>Play</h6>
                                        <p>
                                            <span className="badge"><i className="ion-information"></i></span>
                                            <span className="badge-txt">
                                                Press Z X to change octave. Play with your keyboard
                                            </span>
                                        </p>
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
