import React from 'react';

const Tutorial = () => {
    return (
        <div id="tutorial" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header modal-pre-hide">
                        <h4 className="modal-title">Welcome to ElectroPhone</h4>
                    </div>
                    <div className="modal-body modal-pre-hide">
                        <div id="carousel-slides"
                             className="carousel slide"
                             data-interval="false"
                             data-ride="carousel">
                            <div className="carousel-inner" role="listbox">
                                <div className="item active">
                                    <div className="anim-slide add-modules-slide"/>
                                    <div className="carousel-caption">
                                        <h6>Add Modules</h6>
                                        <p>
                                            <span className="badge"><i className="ion-information"></i></span>
                                            <span className="badge-txt">Oscillator and Noise can make sounds</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="anim-slide link-modules-slide"/>
                                    <div className="carousel-caption">
                                        <h6>Link Modules</h6>
                                        <p>
                                            <span className="badge"><i className="ion-information"></i></span>
                                            <span className="badge-txt">Press SHIFT to quick toggle link mode</span>
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
                        <button className="btn btn-default" data-dismiss="modal">Got It!</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tutorial;
