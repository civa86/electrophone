import angular from 'angular'

function ApplicationController ($rootScope, $scope, $window, webSynth, graphManager) {
    let ctrl = this;

    ctrl.graphReady = false;
    ctrl.linkMode = false;
    ctrl.currentNode = null;
    ctrl.synthModules = webSynth.listModules();

    function addNode (className) {
        console.log('new synth module', className);
        graphManager.addNode({
            group: 'nodes',
            data:  { type: className }
        });
    }

    function toggleLinkMode () {
        ctrl.linkMode = !ctrl.linkMode;
        graphManager.setLinkMode(ctrl.linkMode);
    }

    ctrl.addNode = addNode;
    ctrl.toggleLinkMode = toggleLinkMode;

    angular.element($window).on('keydown', (e) => {
        let keyCode = e.which || e.keyCode;
        if (e.shiftKey && keyCode === 16) {
            ctrl.linkMode = true;
            graphManager.setLinkMode(ctrl.linkMode);
            $scope.$digest();
        }
    });

    angular.element($window).on('keyup', (e) => {
        let keyCode = e.which || e.keyCode;
        if (keyCode === 16) {
            ctrl.linkMode = false;
            graphManager.setLinkMode(ctrl.linkMode);
            $scope.$digest();
        }
    });

    angular.element($window).on('resize', () => graphManager.resetGraph());
}

export default ApplicationController;

