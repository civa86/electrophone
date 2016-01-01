import angular from 'angular'

function ApplicationController ($rootScope, $scope, SynthManager, GraphManager) {
    let ctrl = this;

    ctrl.graphReady = false;
    ctrl.linkMode = false;
    ctrl.currentNode = null;
    ctrl.currentModuleProperties = null;
    ctrl.synthModules = SynthManager.listModules();
    //TODO use creaeModule in init method....
    ctrl.modules = [
        {
            group: 'nodes',
            data: {
                id: 'master',
                type: 'Master'
            },
            style: {
                width: 100,
                height: 100
            }
        }
    ];

    console.log(SynthManager)

    function createModule (event, params) {
        //TOOD manage all params...like id
        let type = (params && params.type) ? params.type : null,
            module;
        if (type) {
            module = {
                group: 'nodes',
                data: { type: type }
            };

            ctrl.modules.push(module);
            GraphManager.addNode(module, ctrl.linkMode);
        }

    }

    function moduleSelected (event, params) {
        let selectedModule = (params && params.module) ? params.module : null;

        ctrl.currentNode = null;
        ctrl.currentModuleProperties = null;

        if (selectedModule) {
            ctrl.currentNode = ctrl.modules.filter((e) => {
                return e.data.id === selectedModule.id();
            });
            if(ctrl.currentNode.length === 1) {
                //TODO manage master and adsr in the same module
                ctrl.currentNode = ctrl.currentNode[0];
                ctrl.currentModuleProperties = ctrl.synthModules.reduce((res, e) => {
                    if (e.name === ctrl.currentNode.data.type) {
                        res = e;
                    }
                    return res;
                }, null);
            }
        }
        $scope.$digest();
    }

    function linkModeToggle () {
        ctrl.linkMode = !ctrl.linkMode;
        GraphManager.setLinkMode(ctrl.linkMode);
    }

    function linkModeOn () {
        ctrl.linkMode = true;
        GraphManager.setLinkMode(ctrl.linkMode);
        $scope.$digest();
    }

    function linkModeOff () {
        ctrl.linkMode = false;
        GraphManager.setLinkMode(ctrl.linkMode);
        $scope.$digest();
    }

    //APP MODULES EVENTS
    $rootScope.$on('MODULE_BUILD', createModule);

    //GRAPH EVENTS
    $rootScope.$on('GRAPH_MOD_SELECTED', moduleSelected);
    $rootScope.$on('GRAPH_LINK_MODE_TOGGLE', linkModeToggle);

    //GLOBAL EVENTS
    $rootScope.$on('GLOBKEYS_SHIFT_DOWN', linkModeOn);
    $rootScope.$on('GLOBKEYS_SHIFT_UP', linkModeOff);
    $rootScope.$on('GLOBKEYS_WINDOW_RESIZE', () => GraphManager.resetGraph());
}

export default ApplicationController;

