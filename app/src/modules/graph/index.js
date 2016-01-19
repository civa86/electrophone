'use strict';

import angular from 'angular';
import GraphManager from './GraphManager';
import GraphDirective from './GraphDirective';
import UpdateGraphBtnDirective from './UpdateGraphBtnDirective';
import LinkModeButtonDirective from './LinkModeButtonDirective';

angular.module('WS.Graph', [])
    .constant('GRAPH_MASTER_NODE', 'master')
    .factory('GraphManager', ['$q', 'GRAPH_MASTER_NODE', GraphManager])
    .directive('graph', ['$rootScope', '$window', 'GRAPH_MASTER_NODE', 'GraphManager', GraphDirective])
    .directive('updateGraphBtn', ['GraphManager', UpdateGraphBtnDirective])
    .directive('linkModeButton', ['$rootScope', LinkModeButtonDirective]);
