'use strict';

import $ from 'jquery';
import tpl from './ControlSelectTpl.html';

function ControlSelectDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        template: tpl,
        scope: {
            moduleId: '=',
            propValue: '=',
            propBounds: '=',
            propName: '='
        },
        link: function ($scope) {
            function changeValue (val) {
                $rootScope.$broadcast('CTRL_MOD_SET_PROP', {
                    module: $scope.moduleId,
                    prop: $scope.propName,
                    value: val
                });
            }

            $scope.changeValue = changeValue;
        }
    };
}

export default ControlSelectDirective;
