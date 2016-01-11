'use strict';

function ModuleBuilderDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace:  true,
        scope: {
            modulesList: '='
        },
        template: '<div role="tabpanel" class="tab-pane active" id="module-builder">' +
                    '<div>' +
                        '<button ng-repeat="mod in modulesList" ' +
                                'class="btn btn-info" ' +
                                'ng-click="buildModule(mod.type)">{{::mod.type}}</button>' +
                    '</div></div>',
        link: function ($scope) {

            function buildModule (type) {
                $rootScope.$emit('MODULE_BUILD', { type: type });
            }

            $scope.buildModule = buildModule;
        }
    };
}

export default ModuleBuilderDirective;
