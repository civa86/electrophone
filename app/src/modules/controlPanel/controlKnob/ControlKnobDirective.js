import $ from 'jquery'
import tpl from './ControlKnobTpl.html'
import knob from 'jquery-knob'

function ControlKnobDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        template: tpl,
        scope: {
            controlKnob: '=',
            controlName: '=',
            controlModule: '='
        },
        link: function ($scope, element) {
            function onChange (v) {
                $rootScope.$broadcast('CTRL_MOD_SET_PROP', {
                    module: $scope.controlModule.data.id,
                    prop: $scope.controlName,
                    value: v
                });
            }

            function init () {
                let initVal = $scope.controlModule.props[$scope.controlName];
                $scope.inputVal = Math.round(initVal);
                $(element).val(initVal);
                $(element)
                    .knob({
                        min: $scope.controlKnob.bounds[0],
                        max: $scope.controlKnob.bounds[1],
                        change: onChange
                    });
            }

            init();
        }
    }
}

export default ControlKnobDirective
