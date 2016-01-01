import $ from 'jquery'

function ControlPanelDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace:  true,
        template: '<div>{{moduleProperties}}</div>',
        scope:    {
            moduleProperties: '='
        },
        link: function ($scope, element) {

        }
    }
}

export default ControlPanelDirective
