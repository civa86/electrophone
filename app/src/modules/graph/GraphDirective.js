import $ from 'jquery'

function GraphDirective ($rootScope, graphManager) {
    return {
        restrict: 'EA',
        replace:  true,
        template: '<div id="graph" class="col-xs-12"></div>',
        scope:    {
            graphReady:  '=',
            currentNode: '='
        },
        link:     function ($scope, element) {
            let graphHeight = $(window).height() - $('header').height() - $('#menu').height(),
                screenCenter = {
                    x: $(window).width() / 2,
                    y: graphHeight / 2
                };

            function onNodeClicked (event, params) {
                $scope.currentNode = (params && params.node) ? params.node : null;
                $scope.$apply();
            }

            $(element).height(graphHeight);
            graphManager.createGraph(element, screenCenter).then(
                function () {
                    $scope.graphReady = true;
                }
            );

            $rootScope.$on('nodeClicked', onNodeClicked);

        }
    }
}

export default GraphDirective
