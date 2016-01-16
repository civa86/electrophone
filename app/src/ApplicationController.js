'use strict';

import angular from 'angular';

function ApplicationController ($rootScope, $scope, SynthManager, GraphManager) {
    let ctrl = this;

    function initLinks () {
        ctrl.linkSource = '';
        ctrl.linkTarget = '';
    }

    function init () {
        ctrl.linkMode = false;
        ctrl.graphReady = false;
        ctrl.currentNode = null;
        ctrl.builderModuleList = SynthManager.listAllModules(true);
        ctrl.modules = [];

        initLinks();
    }

    function initModules () {
        //TODO introduce here loading presets etc..
        $rootScope.$emit('MODULE_BUILD', {
            id: 'master',
            type: 'Master'
        });
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
            newModule.linkedTo = null;
            newModule.props = SynthManager.getModuleDefaultProperties(type);
        }

        //Graph node creation
        graphNode = GraphManager.addNode(getGraphNode(newModule), ctrl.linkMode);

        //Update module with graph data
        newModule.id = graphNode.id;
        newModule.position = graphNode.position;

        //Synth mod creation
        SynthManager.createModule(newModule);

        //App module registration
        ctrl.modules.push(Object.assign({}, newModule, graphNode));
    }

    function destroyModule () {
        if (ctrl.currentNode && ctrl.currentNode.id !== 'master') {
            //Graph node deletion
            GraphManager.deleteNode(ctrl.currentNode.id);

            //Synth mod deletion
            SynthManager.destroyModule(ctrl.currentNode.id);

            //App module unregistration
            ctrl.modules = ctrl.modules.filter((e) => e.id !== ctrl.currentNode.id);

            ctrl.currentNode = null;
            $scope.$digest();
        }
    }

    function setModuleProperty (event, params) {
        let module;
        if (params && params.module && params.prop) {
            module = getModule(params.module);
            if (module.props[params.prop]) {
                module.props[params.prop].currentValue = params.value;
                SynthManager.updateModule(module, params);
            }
            $scope.$digest();
        }
    }

    function moduleSelected (event, params) {
        const moduleId = (params && params.moduleId) ? params.moduleId : null;
        ctrl.currentNode = getModule(moduleId);
        $scope.$digest();
        GraphManager.resizeGraph();
    }

    function moduleLinked (event, params) {
        var source = null,
            target = null,
            mod = null;

        if (params && params.source && params.target) {
            source = params.source;
            target = params.target;
            mod = getModule(source);
            if (mod) {
                mod.linkedTo = target;
                SynthManager.linkModules(source, target);
            }
        }
    }

    function linkModeToggle () {
        if (ctrl.linkMode === true) {
            linkModeOff(true);
        } else {
            linkModeOn(true);
        }
    }

    function linkModeOn (noDigest) {
        ctrl.linkMode = true;
        GraphManager.setLinkMode(ctrl.linkMode);
        if (noDigest !== true) {
            $scope.$digest();
        }
    }

    function linkModeOff (noDigest) {
        ctrl.linkMode = false;
        GraphManager.setLinkMode(ctrl.linkMode);
        ctrl.linkSource = '';
        ctrl.linkTarget = '';
        if (noDigest !== true) {
            $scope.$digest();
        }
    }

    function setLinkSource (event, params) {
        const linkSourceType = (params && params.linkSourceType) ? params.linkSourceType : null,
              linkSourceId = (params && params.linkSourceId) ? params.linkSourceId : null;

        ctrl.linkSource = (linkSourceType && linkSourceId) ? linkSourceType + ' - ' + linkSourceId : '';
        $scope.$digest();
    }

    function setLinkTarget (event, params) {
        const linkTargetType = (params && params.linkTargetType) ? params.linkTargetType : null,
              linkTargetId = (params && params.linkTargetId) ? params.linkTargetId : null;

        ctrl.linkTarget = (linkTargetType && linkTargetId) ? linkTargetType + ' - ' + linkTargetId : '';
        $scope.$digest();
    }

    function resetLinks () {
        initLinks();
        $scope.$digest();
    }

    function playNote (e, note) {
        SynthManager.play(note);
    }

    function stopNote (e, note) {
        SynthManager.stop(note);
    }

    init();

    //APP MODULES EVENTS
    $rootScope.$on('MODULE_BUILD', createModule);

    //CONTROL PANEL EVENTS
    $rootScope.$on('CTRL_MOD_SET_PROP', setModuleProperty);

    //GRAPH EVENTS
    $rootScope.$on('GRAPH_CREATED', initModules);
    $rootScope.$on('GRAPH_MOD_SELECTED', moduleSelected);
    $rootScope.$on('GRAPH_MOD_LINK', moduleLinked);
    $rootScope.$on('GRAPH_LINK_MODE_TOGGLE', linkModeToggle);
    $rootScope.$on('GRAPH_SET_LINK_SOURCE', setLinkSource);
    $rootScope.$on('GRAPH_SET_LINK_TARGET', setLinkTarget);
    $rootScope.$on('GRAPH_RESET_LINKS', resetLinks);

    //GLOBAL EVENTS
    $rootScope.$on('GLOBKEYS_SHIFT_DOWN', linkModeOn);
    $rootScope.$on('GLOBKEYS_SHIFT_UP', linkModeOff);
    $rootScope.$on('GLOBKEYS_NOTE_DOWN', playNote);
    $rootScope.$on('GLOBKEYS_NOTE_UP', stopNote);
    $rootScope.$on('GLOBKEYS_DELETE_PRESSED', destroyModule);

    $rootScope.$on('GLOB_WINDOW_RESIZE', () => GraphManager.resetGraph());
}

export default ApplicationController;

