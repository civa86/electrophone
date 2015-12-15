function ApplicationController ($rootScope, webSynth, graphManager) {
    let ctrl = this;

    ctrl.graphReady = false;
    ctrl.linkMode = false;
    ctrl.currentNode = null;

    function addNode () {
        graphManager.addNode({
            group: 'nodes'
        });
    }

    function toggleLinkMode () {
        ctrl.linkMode = !ctrl.linkMode;
        graphManager.setLinkMode(ctrl.linkMode);
    }

    ctrl.addNode = addNode;
    ctrl.toggleLinkMode = toggleLinkMode;
}

export default ApplicationController;

