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
            let graphHeight = $(window).height() - $('header').height() - $('#menu').height();

            function onNodeClicked (event, params) {
                $scope.currentNode = (params && params.node) ? params.node : null;
                $scope.$apply();
            }

            $(element).height(graphHeight);
            graphManager.createGraph(element, graphHeight).then(
                function () {
                    $scope.graphReady = true;
                }
            );

            $rootScope.$on('nodeClicked', onNodeClicked);

        }
    }
}

export default GraphDirective
