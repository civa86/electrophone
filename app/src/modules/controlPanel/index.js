import angular from 'angular'
import ControlPanelDirective from './ControlPanelDirective'
import ControlKnobDirective from './controlKnob/ControlKnobDirective'

angular.module('WS.ControlPanel', [])
    .directive('controlPanel', ['$rootScope', ControlPanelDirective])
    .directive('controlKnob', ['$rootScope', ControlKnobDirective]);
