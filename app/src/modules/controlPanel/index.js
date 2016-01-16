'use strict';

import angular from 'angular';
import ControlPanelDirective from './ControlPanelDirective';
import ControlKnobDirective from './controlKnob/ControlKnobDirective';
import ControlSelectDirective from './controlSelect/ControlSelectDirective';

angular.module('WS.ControlPanel', [])
    .directive('controlPanel', ['$rootScope', ControlPanelDirective])
    .directive('controlKnob', ['$rootScope', ControlKnobDirective])
    .directive('controlSelect', ['$rootScope', ControlSelectDirective]);
