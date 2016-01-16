'use strict';

import angular from 'angular';

function GlobalKeysDirective ($rootScope, $window) {
    return {
        restrict: 'A',
        link: function () {
            let notes = {
                    65: 'C',
                    83: 'D',
                    68: 'E'
                };

            function getKeyCode (e) {
                const keyCode = e.which || e.keyCode;
                return keyCode;
            }

            angular.element($window).on('keydown keypress', (e) => {
                const keyCode = getKeyCode(e);

                if (e.shiftKey && keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_DOWN');
                } else if (keyCode === 8) {
                    e.preventDefault();
                    $rootScope.$broadcast('GLOBKEYS_DELETE_PRESSED');
                } else if (notes[keyCode]) {
                    $rootScope.$broadcast('GLOBKEYS_NOTE_DOWN', notes[keyCode]);
                }
            });

            angular.element($window).on('keyup', (e) => {
                const keyCode = getKeyCode(e);

                if (keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_UP');
                } else if (notes[keyCode]) {
                    $rootScope.$broadcast('GLOBKEYS_NOTE_UP', notes[keyCode]);
                }
            });

            angular.element($window).on('resize', () => $rootScope.$broadcast('GLOB_WINDOW_RESIZE'));
        }
    };
}

export default GlobalKeysDirective;
