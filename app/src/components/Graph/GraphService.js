import style from './GraphStyle';

const GraphService = (graphLibrary) => {
    const graphLib = graphLibrary;
    let graph = null,
        linkAreaCtx = null,
        linkMode = false,
        actions = {},
        domElement = null,
        mouseDown,
        isDragging,
        sourceLinkNode,
        targetLinkNode,
        startX,
        startY;

    function resize () {
        if (graph) {
            graph.resize();
        }
    }

    function reset () {
        if (graph) {
            graph.reset();
        }
    }

    function resetLinkArea () {
        linkAreaCtx.clearRect(0, 0, parseInt(domElement.offsetWidth, 10), parseInt(domElement.offsetHeight, 10));
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
        linkAreaCtx.fillStyle = '#000';
        linkAreaCtx.strokeStyle = '#000';
        linkAreaCtx.lineWidth = 6;
        linkAreaCtx.setLineDash([6, 5]);
        linkAreaCtx.beginPath();
        linkAreaCtx.moveTo(startX, startY);
        linkAreaCtx.lineTo(targetX, targetY);
        linkAreaCtx.stroke();
    }

    function onClickHandler (e) {
        const node = e.cyTarget;
        if (!linkMode) {
            actions.onClickHandler(node.id(), !node.hasClass('selected'));
        }
    }

    function onFreeHandler (e) {
        const node = e.cyTarget;
        if (!linkMode) {
            //TODO refactor graph pan...zoom....move from here?
            actions.onFreeHandler(
                node.id(),
                node.position(),
                graph.pan(),
                graph.zoom()
            );
        }
    }

    function onTapStart (e) {
        if (linkMode) {
            mouseDown = true;
            startX = e.cyRenderedPosition.x;
            startY = e.cyRenderedPosition.y;
            sourceLinkNode = e.cyTarget;
            targetLinkNode = null;

            //TODO check master....
            //if (sourceLinkNode && sourceLinkNode.id() !== 'master') {
            //    //$rootScope.$broadcast('GRAPH_SET_LINK_SOURCE', {
            //    //    linkSourceType: sourceLinkNode.data('type'),
            //    //    linkSourceId: sourceLinkNode.id()
            //    //});
            //    //actions.onSetLinkSource();
            //}
        }
    }

    function onTapOver (e) {
        if (linkMode && sourceLinkNode && e.cyTarget.id() !== sourceLinkNode.id() && isDragging) {
            targetLinkNode = e.cyTarget;

            //$rootScope.$broadcast('GRAPH_SET_LINK_TARGET', {
            //    linkTargetType: targetLinkNode.data('type'),
            //    linkTargetId: targetLinkNode.id()
            //});
            //actions.onSetLinkTarget();
        }
    }

    function onTapOut () {
        if (linkMode && targetLinkNode) {
            targetLinkNode = null;
            //$rootScope.$broadcast('GRAPH_SET_LINK_TARGET', null);
            //actions.onSetLinkTarget(null);
        }
    }

    function onTapDrag (e) {
        if (
            linkMode &&
            mouseDown &&
            (Math.abs(startX - e.cyPosition.x) > 10 || Math.abs(startY - e.cyPosition.y))
        ) {
            isDragging = true;
            resetLinkArea();

            //TODO check master....
            if (sourceLinkNode && sourceLinkNode.id() !== 'master') {
                drawLink(e.cyRenderedPosition.x, e.cyRenderedPosition.y);
            }
        }
    }

    function onTapEnd () {
        if (linkMode) {
            mouseDown = false;
            if (isDragging) {
                resetLinkArea();
                //TODO check master...
                if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                    actions.linkHandler(sourceLinkNode.id(), targetLinkNode.id());
                }
                isDragging = false;
            }
            sourceLinkNode = null;
            targetLinkNode = null;
        }
    }

    function onZoom () {
        if (actions && actions.onZoomHandler && typeof actions.onZoomHandler === 'function') {
            actions.onZoomHandler(graph.zoom());
        }
    }

    function onPan () {
        if (actions && actions.onPanHandler && typeof actions.onPanHandler === 'function') {
            actions.onPanHandler({
                ...graph.pan()
            });
        }
    }

    function bindGraph () {
        resetLinkStatus();

        graph.on('click', 'node', onClickHandler);
        graph.on('free', 'node', onFreeHandler);
        graph.on('tapstart', 'node', onTapStart);
        graph.on('tapdragover', 'node', onTapOver);
        graph.on('tapdragout', 'node', onTapOut);
        graph.on('tapdrag', onTapDrag);
        graph.on('tapend', onTapEnd);
        graph.on('zoom', onZoom);
        graph.on('pan', onPan);
    }

    function createGraph (domNode, linkAreaContext, applicationActions, graphState = {}) {
        const config = { ...style, container: domNode };
        if (graphLib && typeof graphLib === 'function') {
            graph = graphLib(config);
            domElement = domNode;
            linkAreaCtx = linkAreaContext;
            actions = { ...applicationActions };

            bindGraph();
            graph.minZoom(0.2);
            graph.maxZoom(4);
            graph.pan({ x: 0, y: 0 });
            graph.zoom(1);
            resize();

            refreshGraph(graphState);

        } else {
            throw new Error('Missing Graph Library');
        }

    }

    function setLinkMode (mode) {
        if (graph) {
            linkMode = mode;
            graph.autoungrabify(mode);
            graph.nodes().forEach(function (e) {
                if (mode) {
                    if (e.id() === 'master') {
                        e.addClass('link-mode-master');
                    } else {
                        e.addClass('link-mode');
                    }
                } else {
                    e.removeClass('link-mode-master');
                    e.removeClass('link-mode');
                }
            });
            resize();
        }
    }

    function refreshGraph (graphState) {
        const newNodes = graphState.modules || [],
            newGraph = graphState.graph || { pan: { x: 0, y: 0 }, zoom: 1 },
            newLinkMode = newGraph.linkMode || false;

        if (graph) {
            //ADD
            newNodes.forEach(e => {
                const node = graph.$('#' + e.id);

                if (node.length === 0) {
                    graph.add({
                        // TODO refactor above...
                        group: 'nodes',
                        data: {
                            id: e.id,
                            isMaster: e.isMaster
                        },
                        position: {
                            x: e.position.x,
                            y: e.position.y
                        }
                    });
                } else if (node.length === 1) {
                    //TODO create methodes...
                    // UPDATE SELECTION
                    if (e.isSelected === true) {
                        node.addClass('selected');
                    } else {
                        node.removeClass('selected');
                    }

                    //UPDATE EDGES
                    if (e.link) {
                        let edgesFromSource = node.connectedEdges();
                        if (edgesFromSource.length > 0) {
                            edgesFromSource.forEach((edge) => {
                                if (edge.source().id() === node.id()) {
                                    graph.remove(edge);
                                }
                            });
                        }
                        graph.add({
                            group: 'edges',
                            data: {
                                source: node.id(),
                                target: e.link
                            }
                        });
                    }
                }
            });

            //DELETE
            graph.nodes().forEach(e => {
                const found = newNodes.filter(ee => ee.id === e.id()).pop();
                if (!found) {
                    graph.remove(e);
                }
            });

            graph.zoom(newGraph.zoom);
            graph.pan(newGraph.pan);

            setLinkMode(newLinkMode);

            resize();
        }
    }

    return {
        createGraph,
        resize,
        reset,
        setLinkMode,
        refreshGraph
    }

};

export default GraphService;
