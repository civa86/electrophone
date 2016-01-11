'use strict';

import angular from 'angular';
import SynthManager from './SynthManager';

angular.module('WS.Synth', [])
    .factory('SynthManager', [SynthManager]);
