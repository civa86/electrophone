//TEXT FILES
import '../humans.txt'
import '../robots.txt'

//BOOTSTRAP
import 'bootstrap-webpack'

//STYLES
import '../less/screen.less'

//JAVASCRIPT
import angular from 'angular'

//ANGULAR MODULES
import './modules/websynth'
import './modules/graph'

//CONTROLLER FUNCTION
import ApplicationController from './ApplicationController'

angular.module('myApp', [
        'WS.WebSynth',
        'WS.Graph'
    ])
    .controller('ApplicationController', [
        '$rootScope', 'WebSynthManager', 'GraphManager', ApplicationController
    ]);
