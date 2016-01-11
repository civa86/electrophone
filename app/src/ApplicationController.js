'use strict';

import angular from 'angular';

function ApplicationController ($rootScope, $scope, SynthManager, GraphManager) {
    let ctrl = this;

    function init () {
        ctrl.graphReady = false;
        ctrl.linkMode = false;
        ctrl.currentNode = null;
        ctrl.builderModuleList = SynthManager.listAllModules(true);
        //TODO refactor with obj??
        ctrl.modules = [];
    }

    function initModules () {
        //TODO introduce here loading presets etc..
        $rootScope.$emit('MODULE_BUILD', {
            id: 'master',
            type: 'Master'
        });

        //TODO set master prop values with synth listModules....
        //GraphManager.resetGraph();
    }

    function getModule (moduleId) {
        return ctrl.modules.filter((e) => e.id === moduleId).pop();
    }

    function getGraphNode (module) {
        return {
            group: 'nodes',
            data: {
                id: module.id,
                type: module.type
            }
        };
    }

    function createModule (event, params) {
        const type = (params && params.type) ? params.type : null,
            id = (params && params.id) ? params.id : null;
        let newModule = {},
            graphNode;

        if (type) {
            if (id) {
                newModule.id = id;
            }
            newModule.type = type;
            newModule.props = SynthManager.getModuleProperties(type);
        }
        //Synth mod creation
        SynthManager.createModule(newModule);

        //Graph node creation
        graphNode = GraphManager.addNode(getGraphNode(newModule), ctrl.linkMode);

        //App module registerd
        ctrl.modules.push(Object.assign({}, newModule, graphNode));
    }

    function setModuleProperty (event, params) {
        let module;
        if (params && params.module && params.prop) {
            module = getModule(params.module);
            if (module.props[params.prop]) {
                module.props[params.prop].currentValue = params.value;
                SynthManager.updateModule(module);
            }
            $scope.$digest();
        }
        console.log(ctrl.modules);
    }

    function moduleSelected (event, params) {
        const moduleId = (params && params.moduleId) ? params.moduleId : null;
        ctrl.currentNode = getModule(moduleId);
        $scope.$digest();
        GraphManager.resizeGraph();
    }

    function moduleMoved (event, params) {
        ////TODO method needed??
        ////TODO remove all cytoscape logic like id() and move it to GraphManager methods
        //let movedModule = (params && params.module) ? params.module : null;
        //
        ////TODO module position is already right set....
        //
        ////TODO update status saving graph setting like zoom, pan??
        //console.log('moved', movedModule.id(), movedModule.position());
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
    $rootScope.$on('CTRL_MOD_SET_PROP', setModuleProperty);

    //GRAPH EVENTS
    $rootScope.$on('GRAPH_CREATED', initModules);
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

