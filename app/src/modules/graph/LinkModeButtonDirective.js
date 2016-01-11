'use strict';

import angular from 'angular';

function LinkModeButtonDirective ($rootScope) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<button class="btn btn-info" ' +
                    'ng-class="{\'btn-info\': !appCtrl.linkMode, \'btn-danger\': appCtrl.linkMode}" ' +
                    'type="button" ' +
                    'ng-click="toggleLinkMode()">Link Nodes</button>',
        scope: true,
        link: function ($scope) {
            $scope.toggleLinkMode = function () {
                $rootScope.$broadcast('GRAPH_LINK_MODE_TOGGLE');
            };
        }
    };
}

export default LinkModeButtonDirective;
