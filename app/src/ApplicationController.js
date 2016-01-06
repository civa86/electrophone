import angular from 'angular'

function ApplicationController ($rootScope, $scope, SynthManager, GraphManager) {
    let ctrl = this;

    function init () {
        ctrl.graphReady = false;
        ctrl.linkMode = false;
        ctrl.currentNode = null;
        ctrl.currentModuleProperties = null;
        ctrl.builderModuleList = SynthManager.listAllModules(true);
        //TODO refactor with an indexed object...
        ctrl.modules = getInitModulesState();
    }

    function getInitModulesState () {
        let initialSynthModules = SynthManager.listModules(),
            initNode = {
                props: {},
                group: 'nodes',
                data: {
                    id: 'master',
                    type: 'Master'
                }
            };

        Object.keys(initialSynthModules).forEach((e) => {
            let props = initialSynthModules[e].props;
            if (e === 'adsr') {
                delete props.link;
                delete props.target;
                delete props.level;
            }
            initNode.props = Object.assign(initNode.props, props);
        });

        return [initNode];
    }

    function getModuleNode (moduleId) {
        return ctrl.modules
            .filter((e) => e.data.id === moduleId)
            .pop();
    }

    function createModule (event, params) {
        //TODO manage all params...like id
        let type = (params && params.type) ? params.type : null,
            module;
        if (type) {
            //TODO set properties with default values!!!!!
            module = {
                props: {},
                group: 'nodes',
                data: { type: type }
            };

            ctrl.modules.push(module);
            SynthManager.createModule(type);
            GraphManager.addNode(module, ctrl.linkMode);
        }

    }

    function updateModule (event, params) {
        if (params && params.module && params.prop) {
            ctrl.modules.forEach((e) => {
                if (e.data.id === params.module) {
                    e.props[params.prop] = params.value;
                }
            });
            //TODO update also synth module....
        }
    }

    function moduleSelected (event, params) {
        //TODO this is a reset....check if you can pass the right object to watch.
        // TODO problem comes with envelop and master...they are the same object and watcher not start....
        ctrl.currentNode = null;
        ctrl.currentModuleProperties = null;
        $scope.$digest();

        //TODO remove all cytoscape logic like id() and move it to GraphManager methods
        let selectedModule = (params && params.module) ? params.module.id() : null,
            currentModuleType;

        ctrl.currentNode = getModuleNode(selectedModule);
        currentModuleType = (ctrl.currentNode && ctrl.currentNode.data) ? ctrl.currentNode.data.type : null;
        ctrl.currentModuleProperties = SynthManager.getModuleProperties(currentModuleType);
        $scope.$digest();
        GraphManager.resizeGraph();
    }

    function moduleMoved (event, params) {
        //TODO remove all cytoscape logic like id() and move it to GraphManager methods
        let movedModule = (params && params.module) ? params.module : null;

        //TODO update ctrl.modules with new position. also graph setting like zoom, pan??
        console.log('moved', movedModule.id(), movedModule.position());
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

    function playNote (e, note) {
        console.log('play', note);
    }

    function stopNote (e, note) {
        console.log('stop', note);
    }

    init();

    //APP MODULES EVENTS
    $rootScope.$on('MODULE_BUILD', createModule);

    //CONTROL PANEL EVENTS
    $rootScope.$on('CTRL_MOD_SET_PROP', updateModule);

    //GRAPH EVENTS
    $rootScope.$on('GRAPH_MOD_SELECTED', moduleSelected);
    $rootScope.$on('GRAPH_MOD_MOVED', moduleMoved);
    $rootScope.$on('GRAPH_LINK_MODE_TOGGLE', linkModeToggle);

    //GLOBAL EVENTS
    $rootScope.$on('GLOBKEYS_SHIFT_DOWN', linkModeOn);
    $rootScope.$on('GLOBKEYS_SHIFT_UP', linkModeOff);
    $rootScope.$on('GLOBKEYS_NOTE_DOWN', playNote);
    $rootScope.$on('GLOBKEYS_NOTE_UP', stopNote);

    $rootScope.$on('GLOB_WINDOW_RESIZE', () => GraphManager.resetGraph());
}

export default ApplicationController;

