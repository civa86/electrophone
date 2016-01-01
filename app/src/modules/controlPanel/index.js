import angular from 'angular'
import ControlPanelDirective from './ControlPanelDirective'

angular.module('WS.ControlPanel', [])
    .directive('controlPanel', ['$rootScope', ControlPanelDirective]);
