'use strict';

import $ from 'jquery';
import graphStyle from './GraphStyle';

function GraphDirective ($rootScope, $window, GraphManager) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div id="graph" class="col-xs-12"></div>',
        scope: {
            linkMode: '='
        },
        link: function ($scope, element) {
            let graphHeight = $($window).height() - $('header').height() - $('#menu').height(),
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
                    $rootScope.$broadcast('GRAPH_MOD_SELECTED', { moduleId: selectedModule });
                }
            }

            function onFreeModule (e) {
                let ele = e.cyTarget;
                $rootScope.$broadcast('GRAPH_MOD_MOVED', { module: ele });
            }

            function onTapStart (e) {
                if ($scope.linkMode) {
                    mouseDown = true;
                    startX = e.cyRenderedPosition.x;
                    startY = e.cyRenderedPosition.y;
                    sourceLinkNode = e.cyTarget;
                    targetLinkNode = null;

                    if (sourceLinkNode && sourceLinkNode.id() !== 'master') {
                        $rootScope.$broadcast('GRAPH_SET_LINK_SOURCE', {
                            linkSourceType: sourceLinkNode.data('type'),
                            linkSourceId: sourceLinkNode.id()
                        });
                    }
                }
            }

            function onTapOver (e) {
                if ($scope.linkMode && sourceLinkNode && e.cyTarget.id() !== sourceLinkNode.id()  && isDragging) {
                    targetLinkNode = e.cyTarget;
                    $rootScope.$broadcast('GRAPH_SET_LINK_TARGET', {
                        linkTargetType: targetLinkNode.data('type'),
                        linkTargetId: targetLinkNode.id()
                    });
                }
            }

            function onTapOut (e) {
                if ($scope.linkMode && targetLinkNode) {
                    targetLinkNode = null;
                    $rootScope.$broadcast('GRAPH_SET_LINK_TARGET', null);
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

            function onTapEnd () {
                if ($scope.linkMode) {
                    mouseDown = false;
                    if (isDragging) {
                        resetLinkArea();

                        if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                            GraphManager.addEdge(sourceLinkNode, targetLinkNode);
                            $rootScope.$broadcast('GRAPH_MOD_LINK', {
                                source: sourceLinkNode.id(),
                                target: targetLinkNode.id()
                            });
                        }
                        isDragging = false;
                    }
                    sourceLinkNode = null;
                    targetLinkNode = null;
                    $rootScope.$broadcast('GRAPH_RESET_LINKS');
                }
            }

            function bindGraph (instance) {
                resetLinkStatus();

                instance.on('click', 'node', onClickModule);
                instance.on('free', 'node', onFreeModule);
                instance.on('tapstart', 'node', onTapStart);
                instance.on('tapdragover', 'node', onTapOver);
                instance.on('tapdragout', 'node', onTapOut);
                instance.on('tapdrag', onTapDrag);
                instance.on('tapend', onTapEnd);
            }

            function init () {
                $(element).height(graphHeight);

                GraphManager.createGraph(element, graphStyle).then(
                    function (graph) {
                        createLinkArea();
                        bindGraph(graph);
                        $rootScope.$broadcast('GRAPH_CREATED');
                    }
                );
            }

            init();
        }
    };
}

export default GraphDirective;
