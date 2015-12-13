import angular from 'angular'
import GraphManager from './GraphManager'
import GraphDirective from './GraphDirective'

angular.module('WS.Graph', [])
    .factory('synthGraphManager', ['$q', GraphManager])
    .directive('synthGraph', ['synthGraphManager', GraphDirective]);
