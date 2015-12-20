import $ from 'jquery'
import cytoscape from 'cytoscape'
import style from './GraphStyle'

function GraphManager ($rootScope, $q) {
    let service = {},
        linkMode = false,
        mouseDown,
        isDragging,
        sourceLinkNode,
        targetLinkNode,
        screenCenter,
        startX,
        startY,
        pan,
        canvasCtx,
        graph;

    function resetLinks () {
        mouseDown = false;
        isDragging = false;
        sourceLinkNode = null;
        targetLinkNode = null;
        startX = null;
        startY = null;
    }

    function resizeGraph () {
        if (graph) {
            graph.resize();
        }
    }

    function resetGraph () {
        if (graph) {
            graph.reset();
            graph.center();
        }
    }

    function resetZoom () {
        if (graph && graph.zoom() !== 1) {
            graph.zoom(1);
            graph.center();
            resizeGraph();
        }
    }

    function resetCanvas () {
        canvasCtx.clearRect(0, 0, $('#graph').width(), $('#graph').height());
    }

    //function reloadLayout () {
    //    if (graph) {
    //        graph.layout(style.layout);
    //        resizeGraph();
    //    }
    //}

    function bindGraph () {
        resetLinks();

        graph.on('click', 'node', function (e) {
            if (!linkMode) {
                let ele = e.cyTarget;
                if (ele.hasClass('selected')) {
                    ele.removeClass('selected');
                    $rootScope.$emit('nodeClicked', { node: null });
                } else {
                    graph.$('node.selected').removeClass('selected');
                    ele.addClass('selected');
                    $rootScope.$emit('nodeClicked', { node: ele });
                }
            }
        });

        graph.on('tapstart', 'node', function (e) {
            if (linkMode) {
                mouseDown = true;
                startX = e.cyRenderedPosition.x;
                startY = e.cyRenderedPosition.y;
                pan = graph.pan();
                sourceLinkNode = e.cyTarget;
                targetLinkNode = null;
            }
        });

        graph.on('tapdragover', 'node', function (e) {
            if (linkMode) {
                targetLinkNode = e.cyTarget;
            }
        });

        graph.on('tapdragout', 'node', function (e) {
            if (linkMode) {
                targetLinkNode = null;
            }
        });

        graph.on('tapdrag', function (e) {
            if (linkMode && mouseDown && (Math.abs(startX - e.cyPosition.x) > 10 || Math.abs(startY - e.cyPosition.y))) {
                isDragging = true;
                resetCanvas();
                if (sourceLinkNode && sourceLinkNode.id() !== 'master') {
                    canvasCtx.fillStyle = '#ccc';
                    canvasCtx.strokeStyle = '#ccc';
                    canvasCtx.lineWidth = 6;
                    canvasCtx.setLineDash([6, 5]);
                    canvasCtx.beginPath();
                    canvasCtx.moveTo(startX, startY);
                    canvasCtx.lineTo(e.cyRenderedPosition.x, e.cyRenderedPosition.y);
                    canvasCtx.stroke();
                }
            }
        });

        graph.on('tapend', function (e) {
            if (linkMode) {
                mouseDown = false;
                if (isDragging) {
                    resetCanvas();
                    if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                        console.log('from', sourceLinkNode.id(), 'to', targetLinkNode.id());
                        var edge = sourceLinkNode.connectedEdges();
                        if (edge && edge[0]) {
                            removeElem(edge[0]);
                        }
                        addEdge(sourceLinkNode.id(), targetLinkNode.id());
                    }
                    isDragging = false;
                }
                sourceLinkNode = null;
                targetLinkNode = null;
            }
        });

    }

    function createGraph (element, screenC) {
        let def = $q.defer(),
            config;

        if (graph) {
            def.reject();
        } else {
            screenCenter = screenC || { x: 0, y: 0 };
            config = {
                container: element,
                elements:  [
                    {
                        group:    'nodes',
                        data:     {
                            id: 'master'
                        },
                        style:    {
                            width:  100,
                            height: 100,
                            'background-color': '#000'
                        }
                        //,
                        //locked:   true
                    }
                ],
                ready:     function () {
                    let $canvas = $('<canvas></canvas>');
                    canvasCtx = $canvas[0].getContext('2d');
                    $(element).append($canvas);
                    $canvas
                        .attr('height', $(element).height())
                        .attr('width', $(element).width())
                        .css({
                            position:  'absolute',
                            top:       0,
                            left:      0,
                            'z-index': 999
                        });

                    graph = this;

                    bindGraph();
                    resetGraph();
                    def.resolve();
                }
            };
            cytoscape(Object.assign(config, style));
        }

        return def.promise;
    }

    function setLinkMode (mode) {
        if (graph) {
            linkMode = mode;
            graph.autoungrabify(linkMode);
            graph.nodes().forEach(function (e) {
                if (linkMode) {
                    if (e.id() === 'master') {
                        e.addClass('link-mode-master');
                    } else {
                        e.addClass('link-mode');
                    }
                } else {
                    e.removeClass('link-mode-master');
                    e.removeClass('link-mode');
                    resetLinks()
                }
            });
            resizeGraph();
        }
    }

    function addEdge (source, target) {
        if (graph) {
            graph.add({
                group: 'edges',
                data:  {
                    source: source,
                    target: target
                }
            });
        }

        resizeGraph();
    }

    function addNode (elem) {
        if (graph) {
            let e = elem || {},
                delta = 0,
                finalX,
                busy = true;

            while (busy && delta >= 0) {
                let present = false;

                graph.nodes().forEach(function (n) {
                    if (
                        n.position().x === screenCenter.x + delta &&
                        n.position().y === screenCenter.y + (Math.floor(graph.nodes().length / 6) + 1) * 150
                    ) {
                        present = true;
                    }
                });

                if (present) {
                    delta = delta + 100;
                } else {
                    busy = false;
                }
            }

            if (graph.nodes().length % 2 === 0) {
                finalX = screenCenter.x + delta;
            } else {
                finalX = screenCenter.x - (delta + 100);
            }

            e.position = {
                x: finalX,
                y: screenCenter.y + (Math.floor(graph.nodes().length / 6) + 1) * 150
            };

            if (linkMode) {
                e.classes = 'link-mode'
            }
            graph.add(e);
        }

        resizeGraph();
    }

    function removeElem (elem) {
        if (graph) {
            graph.remove(elem);
        }
    }

    service.createGraph = createGraph;
    service.resizeGraph = resizeGraph;
    service.resetGraph = resetGraph;
    service.resetZoom = resetZoom;
    service.setLinkMode = setLinkMode;
    service.addNode = addNode;
    service.addEdge = addEdge;
    service.removeElem = removeElem;

    return service;
}

export default GraphManager
