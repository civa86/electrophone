'use strict';

import angular from 'angular';

function GlobalKeysDirective ($rootScope, $window) {
    return {
        restrict: 'A',
        link: function () {
            //'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
            let notes = {
                    65: 'C',    //a
                    87: 'C#',   //w
                    83: 'D',    //s
                    69: 'D#',   //e
                    68: 'E',    //d
                    70: 'F',    //f
                    84: 'F#',   //t
                    71: 'G',    //g
                    89: 'G#',   //y
                    72: 'A',    //h
                    85: 'A#',   //u
                    74: 'B'     //j
                };

            function getKeyCode (e) {
                const keyCode = e.which || e.keyCode;
                return keyCode;
            }

            angular.element($window).on('keydown', (e) => {
                const keyCode = getKeyCode(e);

                if (e.shiftKey && keyCode === 16) {
                    $rootScope.$broadcast('GLOBKEYS_SHIFT_DOWN');
                } else if (keyCode === 8) {
                    e.preventDefault();
                    $rootScope.$broadcast('GLOBKEYS_DELETE_PRESSED');
                } else if (keyCode === 90) {
                    $rootScope.$broadcast('GLOBKEYS_OCTAVE_DECREASE');
                } else if (keyCode === 88) {
                    $rootScope.$broadcast('GLOBKEYS_OCTAVE_INCREASE');
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
