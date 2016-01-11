'use strict';

import angular from 'angular';
import GraphManager from './GraphManager';
import GraphDirective from './GraphDirective';
import UpdateGraphBtnDirective from './UpdateGraphBtnDirective';
import LinkModeButtonDirective from './LinkModeButtonDirective';

angular.module('WS.Graph', [])
    .factory('GraphManager', ['$q', GraphManager])
    .directive('updateGraphBtn', ['GraphManager', UpdateGraphBtnDirective])
    .directive('linkModeButton', ['$rootScope', LinkModeButtonDirective])
    .directive('graph', ['$rootScope', '$window', 'GraphManager', GraphDirective]);
