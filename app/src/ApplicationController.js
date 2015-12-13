function ApplicationController ($rootScope, webSynth, graphManager) {
    let ctrl = this;

    ctrl.graphReady = false;
    ctrl.currentNode = null;

    function addNode () {
        graphManager.addNode({
            group: 'nodes'
        });
    }

    ctrl.addNode = addNode;
}

export default ApplicationController;

