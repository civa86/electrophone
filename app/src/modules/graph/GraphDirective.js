import $ from 'jquery'

function GraphDirective ($rootScope, graphManager) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div id="graph" class="col-xs-12"></div>',
        scope: {
            graphReady: '=',
            currentNode: '='
        },
        link: function ($scope, element) {
            let graphHeight = $(window).height() - $('header').height();

            function setCurrentNode (node) {
                $scope.currentNode = node;
                $scope.$apply();
            }

            function openControlPanel () {
                $('#control-panel').collapse('show');
            }

            function closeControlPanel () {
                $('#control-panel').collapse('hide');
            }

            function bindGraph (graph) {
                graph.on('click', 'node', function(e) {
                    let ele = e.cyTarget;
                    if (ele.hasClass('selected')) {
                        ele.removeClass('selected');
                        setCurrentNode(null);
                        closeControlPanel();
                    } else {
                        graph.$('node.selected').removeClass('selected');
                        ele.addClass('selected');
                        setCurrentNode(ele.id());
                        openControlPanel();
                    }
                    $rootScope.$emit('graphResize');
                });
            }

            $(element).height(graphHeight);
            graphManager.createGraph(element).then(
                function (graph) {
                    $scope.graphReady = true;
                    bindGraph(graph);
                }
            );

        }
    }
}

export default GraphDirective
