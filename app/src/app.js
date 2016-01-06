//TEXT FILES
import '../humans.txt'
import '../robots.txt'

//BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.css'
import 'imports?jQuery=jquery!bootstrap/dist/js/bootstrap'

//STYLES
import '../less/screen.less'

//JAVASCRIPT
import angular from 'angular'

//ANGULAR MODULES
import './modules/synth'
import './modules/graph'
import './modules/controlPanel'
import './modules/globalKeys'
import './modules/moduleBuilder'

//CONTROLLER FUNCTION
import ApplicationController from './ApplicationController'

angular.module('myApp', [
        'WS.Synth',
        'WS.Graph',
        'WS.GlobalKeys',
        'WS.ControlPanel',
        'WS.ModuleBuilder'
    ])
    //TODO manage filters...
    .filter('nodename', function () {
        return function (input) {
            return (input) ? input.data.id : ' ... ';
        }
    })
    .controller('ApplicationController', [
        '$rootScope', '$scope',
        'SynthManager', 'GraphManager',
        ApplicationController
    ]);
