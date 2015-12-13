function ApplicationController ($rootScope, webSynth, graphManager) {
    let ctrl = this;

    ctrl.graphReady = false;
    ctrl.currentNode = null;

    function addNode () {
        graphManager.addNode({
            group: 'nodes'
        });
    }

    function updateGraph () {
        $rootScope.$emit('graphResize');
    }

    ctrl.addNode = addNode;
    ctrl.updateGraph = updateGraph;
}

export default ApplicationController;

