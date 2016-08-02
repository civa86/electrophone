import React from 'react';

const NoAudioWarning = () => {

    return (
        <div id="no-audio-warning" className="modal fade" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Audio Context Not Found</h4>
                    </div>
                    <div className="modal-body">
                        <p>This application is based on WebAudio API features.</p>
                        <p>You have to visit this page with a browser <b>HTML5 Web Audio API</b> compatible.</p>
                        <p className="text-centered">
                            <a href="http://caniuse.com/#feat=audio-api">
                                Click here for a full list.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoAudioWarning;
