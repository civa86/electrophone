import $ from 'jquery'

function GraphDirective (graphManager) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div id="graph"></div>',
        scope: {
            graphReady: '='
        },
        link: function ($scope, element) {
            graphManager.createGraph(element).then(
                function () {
                    $scope.graphReady = true;
                }
            );
        }
    }
}

export default GraphDirective
