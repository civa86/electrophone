import $ from 'jquery'
import graphStyle from './GraphStyle'

function GraphDirective ($rootScope, GraphManager) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div id="graph" class="col-xs-12"></div>',
        scope: {
            linkMode: '=',
            appModules: '='
        },
        link: function ($scope, element) {
            let graphHeight = $(window).height() - $('header').height() - $('#menu').height(),
                mouseDown,
                isDragging,
                sourceLinkNode,
                targetLinkNode,
                startX,
                startY,
                linkAreaCtx;

            function createLinkArea () {
                let $canvas = $('<canvas></canvas>');
                linkAreaCtx = $canvas[0].getContext('2d');
                $(element).append($canvas);
                $canvas
                    .attr('height', $(element).height())
                    .attr('width', $(element).find('div').width())
                    .css({
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        'z-index': 999
                    });
            }

            function resetLinkArea () {
                linkAreaCtx.clearRect(0, 0, $(element).find('div').width(), $(element).height());
            }

            function resetLinkStatus () {
                mouseDown = false;
                isDragging = false;
                sourceLinkNode = null;
                targetLinkNode = null;
                startX = null;
                startY = null;
            }

            function drawLink (targetX, targetY) {
                linkAreaCtx.fillStyle = '#ccc';
                linkAreaCtx.strokeStyle = '#ccc';
                linkAreaCtx.lineWidth = 6;
                linkAreaCtx.setLineDash([6, 5]);
                linkAreaCtx.beginPath();
                linkAreaCtx.moveTo(startX, startY);
                linkAreaCtx.lineTo(targetX, targetY);
                linkAreaCtx.stroke();
            }

            function onClickModule (e) {
                if (!$scope.linkMode) {
                    let ele = e.cyTarget,
                        selectedModule = GraphManager.selectNode(ele);
                    $rootScope.$broadcast('GRAPH_MOD_SELECTED', { module: selectedModule });
                }
            }

            function onTapStart (e) {
                if ($scope.linkMode) {
                    mouseDown = true;
                    startX = e.cyRenderedPosition.x;
                    startY = e.cyRenderedPosition.y;
                    sourceLinkNode = e.cyTarget;
                    targetLinkNode = null;
                }
            }

            function onTapOver (e) {
                if ($scope.linkMode) {
                    targetLinkNode = e.cyTarget;
                }
            }

            function onTapOut (e) {
                if ($scope.linkMode) {
                    targetLinkNode = null;
                }
            }

            function onTapDrag (e) {
                if (
                    $scope.linkMode &&
                    mouseDown &&
                    (Math.abs(startX - e.cyPosition.x) > 10 || Math.abs(startY - e.cyPosition.y))
                ) {
                    isDragging = true;
                    resetLinkArea();

                    if (sourceLinkNode && sourceLinkNode.id() !== 'master') {
                        drawLink(e.cyRenderedPosition.x, e.cyRenderedPosition.y);
                    }
                }
            }

            function onTapEnd (e) {
                if ($scope.linkMode) {
                    mouseDown = false;
                    if (isDragging) {
                        resetLinkArea();

                        if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                            GraphManager.addEdge(sourceLinkNode, targetLinkNode);
                        }
                        isDragging = false;
                    }
                    sourceLinkNode = null;
                    targetLinkNode = null;
                }
            }

            function bindGraph (instance) {
                resetLinkStatus();

                instance.on('click', 'node', onClickModule);
                instance.on('tapstart', 'node', onTapStart);
                instance.on('tapdragover', 'node', onTapOver);
                instance.on('tapdragout', 'node', onTapOut);
                instance.on('tapdrag', onTapDrag);
                instance.on('tapend', onTapEnd);
            }

            function init () {
                $(element).height(graphHeight);

                GraphManager.createGraph(element, $scope.appModules, graphStyle).then(
                    function (graph) {
                        createLinkArea();
                        bindGraph(graph);
                        GraphManager.resetGraph();
                    }
                );
            }

            init();
        }
    }
}

export default GraphDirective
