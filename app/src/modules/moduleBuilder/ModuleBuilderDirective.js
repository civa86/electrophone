function ModuleBuilderDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace:  true,
        scope: {
            allModules: '='
        },
        template: '<div role="tabpanel" class="tab-pane active" id="module-builder">' +
                    '<div>' +
                        '<button ng-repeat="mod in allModules" ' +
                                'class="btn btn-info" ' +
                                'ng-click="buildModule(mod.name)">{{::mod.name}}</button>' +
                    '</div></div>',
        link: function ($scope) {
            $scope.buildModule = function (type) {
                $rootScope.$emit('MODULE_BUILD', { type: type });
            }
        }
    }
}

export default ModuleBuilderDirective
