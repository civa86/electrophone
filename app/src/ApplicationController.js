function ApplicationController (webSynth, graphManager) {
    this.graphReady = false;
    this.currentNode = null;

    function addNode () {
        graphManager.addNode({
            group: 'nodes'
        });
    }

    this.addNode = addNode;
}

export default ApplicationController;

