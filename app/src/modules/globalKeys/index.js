import angular from 'angular'
import GlobalKeysDirective from './GlobalKeysDirective'

angular.module('WS.GlobalKeys', [])
    .directive('globalKeys', ['$rootScope', '$window', GlobalKeysDirective]);
