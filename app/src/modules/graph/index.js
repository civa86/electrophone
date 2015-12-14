import angular from 'angular'
import GraphManager from './GraphManager'
import GraphDirective from './GraphDirective'
import UpdateGraphBtnDirective from './UpdateGraphBtnDirective'

angular.module('WS.Graph', [])
    .factory('GraphManager', ['$q', GraphManager])
    .directive('updateGraphBtn', ['GraphManager', UpdateGraphBtnDirective])
    .directive('graph', ['GraphManager', GraphDirective]);
