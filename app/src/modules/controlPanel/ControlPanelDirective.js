'use strict';

import $ from 'jquery';
import tpl from './ControlPanelTpl.html';

function ControlPanelDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace:  true,
        template: tpl,
        scope:    {
            module: '='
        },
        link: function ($scope, element) {
            function countProperties () {
                let cnt,
                    numProps;
                if ($scope.module) {
                    numProps = Object.keys($scope.module.props).length;
                    cnt = Math.floor(12 / numProps);
                }
                return 'col-xs-' + cnt;
            }

            $scope.countProperties = countProperties;
        }
    };
}

export default ControlPanelDirective;
