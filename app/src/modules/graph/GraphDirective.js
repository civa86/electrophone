import $ from 'jquery'

function GraphDirective (graphManager) {
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
                mouseDown = false,
                isDragging = false,
                sourceLinkNode = null,
                targetLinkNode = null,
                startX,
                startY;

            function setCurrentNode (node) {
                $scope.currentNode = node;
                $scope.$apply();
            }

            function bindGraph (graph) {
                graph.on('click', 'node', function (e) {
                    if (!isDragging) {
                        let ele = e.cyTarget;
                        if (ele.hasClass('selected')) {
                            ele.removeClass('selected');
                            if(ele.locked() && ele.id() !== 'master') {
                                ele.unlock();
                            }
                            setCurrentNode(null);
                        } else {
                            graph.$('node.selected').removeClass('selected');
                            ele.addClass('selected');
                            if (!ele.locked()) {
                                ele.lock();
                            }
                            setCurrentNode(ele);
                        }
                    }
                });

                graph.on('tapstart', 'node', function (e) {
                    mouseDown = true;
                    startX = e.cyPosition.x;
                    startY = e.cyPosition.y;
                    sourceLinkNode = e.cyTarget;
                    targetLinkNode = null;
                });

                graph.on('tapdragover', 'node', function (e) {
                    targetLinkNode = e.cyTarget;
                });

                graph.on('tapdragout', 'node', function (e) {
                    targetLinkNode = null;
                });

                graph.on('tapdrag', function (e) {
                    if (mouseDown && (Math.abs(startX - e.cyPosition.x) > 10 || Math.abs(startY - e.cyPosition.y))) {
                        isDragging = true;
                    }
                });

                graph.on('tapend', function (e) {
                    mouseDown = false;
                    if (isDragging) {
                        if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                            console.log('from', sourceLinkNode.id(), 'to', targetLinkNode.id());
                            var edge = sourceLinkNode.connectedEdges();
                            if (edge && edge[0]) {
                                graphManager.removeElem(edge[0]);
                            }
                            graphManager.addEdge(sourceLinkNode.id(), targetLinkNode.id());
                        }
                        setTimeout(function () {
                            isDragging = false;
                        }, 150);
                    }
                    sourceLinkNode = null;
                    targetLinkNode = null;
                });

            }

            $(element).height(graphHeight);
            graphManager.createGraph(element, graphHeight).then(
                function (graph) {
                    $scope.graphReady = true;
                    bindGraph(graph);
                }
            );

        }
    }
}

export default GraphDirective
