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
        }
    }

    function reloadLayout () {
        if (graph) {
            graph.layout(style.layout);
            resizeGraph();
        }
    }

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
                startX = e.cyPosition.x;
                startY = e.cyPosition.y;
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
            }
        });

        graph.on('tapend', function (e) {
            if (linkMode) {
                mouseDown = false;
                if (isDragging) {
                    if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                        console.log('from', sourceLinkNode.id(), 'to', targetLinkNode.id());
                        var edge = sourceLinkNode.connectedEdges();
                        if (edge && edge[0]) {
                            removeElem(edge[0]);
                        }
                        addEdge(sourceLinkNode.id(), targetLinkNode.id());
                    }
                    setTimeout(function () {
                        isDragging = false;
                    }, 150);
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
            screenCenter = screenC || {x: 0, y: 0};
            config = {
                container: element,
                elements:  [
                    {
                        group:    'nodes',
                        data:     {
                            id: 'master'
                        },
                        position: {
                            x: screenCenter.x,
                            y: screenCenter.y
                        },
                        style:    {
                            width:  100,
                            height: 100
                        },
                        locked:   true
                    }
                ],
                ready:     function () {
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
        graph.add({
            group: 'edges',
            data:  {
                source: source,
                target: target
            }
        });

        resizeGraph();
    }

    function addNode (elem) {
        if (graph) {
            let e = elem || {};
            e.position = {
                x: screenCenter.x,
                y: screenCenter.y - 150
            };
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
    service.setLinkMode = setLinkMode;
    service.addNode = addNode;
    service.addEdge = addEdge;
    service.removeElem = removeElem;

    return service;
}

export default GraphManager
