import angular from 'angular'
import GraphManager from './GraphManager'
import GraphDirective from './GraphDirective'

angular.module('WS.Graph', [])
    .factory('GraphManager', ['$q', '$rootScope', GraphManager])
    .directive('graph', ['$rootScope', 'GraphManager', GraphDirective]);
