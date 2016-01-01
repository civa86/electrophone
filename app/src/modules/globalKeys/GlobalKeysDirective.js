import angular from 'angular'

function GlobalKeysDirective ($rootScope, $window) {
    return {
        restrict: 'A',
        link: function () {
            angular.element($window).on('keydown', (e) => {
                let keyCode = e.which || e.keyCode;
                if (e.shiftKey && keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_DOWN');
                }
            });

            angular.element($window).on('keyup', (e) => {
                let keyCode = e.which || e.keyCode;
                if (keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_UP');
                }
            });

            angular.element($window).on('resize', () => $rootScope.$broadcast('GLOBKEYS_WINDOW_RESIZE'));
        }
    }
}

export default GlobalKeysDirective
