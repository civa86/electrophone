'use strict';

import angular from 'angular';
import ModuleBuilderDirective from './ModuleBuilderDirective';

angular.module('WS.ModuleBuilder', [])
    .directive('moduleBuilder', ['$rootScope', ModuleBuilderDirective]);
