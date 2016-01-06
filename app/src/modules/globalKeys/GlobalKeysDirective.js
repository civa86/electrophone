import angular from 'angular'

function GlobalKeysDirective ($rootScope, $window) {
    return {
        restrict: 'A',
        link: function () {
            let notes = {
                    65: 'C',
                    83: 'D',
                    68: 'E'
                };

            angular.element($window).on('keydown', (e) => {
                let keyCode = e.which || e.keyCode;

                if (e.shiftKey && keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_DOWN');
                } else if (notes[keyCode]) {
                    $rootScope.$broadcast('GLOBKEYS_NOTE_DOWN', notes[keyCode]);
                }
            });

            angular.element($window).on('keyup', (e) => {
                let keyCode = e.which || e.keyCode;
                if (keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_UP');
                } else if (notes[keyCode]) {
                    $rootScope.$broadcast('GLOBKEYS_NOTE_UP', notes[keyCode]);
                }
            });

            angular.element($window).on('resize', () => $rootScope.$broadcast('GLOB_WINDOW_RESIZE'));
        }
    }
}

export default GlobalKeysDirective
