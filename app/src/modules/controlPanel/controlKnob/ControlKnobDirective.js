import $ from 'jquery'
import tpl from './ControlKnobTpl.html'
import knob from 'jquery-knob'

function ControlKnobDirective ($rootScope) {
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
        link: function ($scope, element) {

            function init () {
                $(element)
                    .knob({
                        min: $scope.propBounds[0],
                        max: $scope.propBounds[1],
                        change: onChange
                    });
            }

            function onChange (v) {
                $rootScope.$broadcast('CTRL_MOD_SET_PROP', {
                    module: $scope.moduleId,
                    prop: $scope.propName,
                    value: v
                });
            }

            function setKnobValue () {
                $(element)
                    .val($scope.propValue)
                    .trigger('change');
            }

            $scope.$watch('moduleId', setKnobValue);

            init();
        }
    }
}

export default ControlKnobDirective
