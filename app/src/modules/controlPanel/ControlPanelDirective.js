import $ from 'jquery'

function ControlPanelDirective (webSynth) {
    return {
        restrict: 'EA',
        replace:  true,
        template: '<div>asd</div>',
        scope:    {
            currentNode: '='
        },
        link: function ($scope, element) {
            let synthModules = webSynth.listModules();
            console.log(synthModules);
        }
    }
}

export default ControlPanelDirective
