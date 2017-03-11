import style from './GraphStyle';

const GraphService = (graphLibrary, window) => {
    const graphLib = graphLibrary;
    const windowObject = window || null;
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
        linkAreaCtx.fillStyle = '#666';
        linkAreaCtx.strokeStyle = '#666';
        linkAreaCtx.lineWidth = 4;
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
        }
    }

    function onTapOver (e) {
        if (linkMode && sourceLinkNode && e.cyTarget.id() !== sourceLinkNode.id() && isDragging) {
            targetLinkNode = e.cyTarget;
        }
    }

    function onTapOut () {
        if (linkMode && targetLinkNode) {
            targetLinkNode = null;
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

            if (sourceLinkNode && sourceLinkNode.data('isMaster') === false) {
                drawLink(e.cyRenderedPosition.x, e.cyRenderedPosition.y);
            }
        }
    }

    function onTapEnd () {
        if (linkMode) {
            mouseDown = false;
            if (isDragging) {
                resetLinkArea();
                if (sourceLinkNode && sourceLinkNode.data('isMaster') === false && targetLinkNode) {
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

    function bindGraph (windowObject) {
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

        if (windowObject && typeof windowObject.addEventListener === 'function') {
            windowObject.addEventListener('focus', () => resize());
        }
    }

    function createGraph (domNode, linkAreaContext, applicationActions, synthState = {}, uiState = {}) {
        const config = { ...style, container: domNode };
        if (graphLib && typeof graphLib === 'function') {
            graph = graphLib(config);
            domElement = domNode;
            linkAreaCtx = linkAreaContext;
            actions = { ...applicationActions };

            bindGraph(windowObject);
            graph.minZoom(0.2);
            graph.maxZoom(4);
            graph.pan({ x: 0, y: 0 });
            graph.zoom(1);
            resize();

            refreshGraph(synthState, uiState);

            if (actions && actions.onGraphCreated && typeof actions.onGraphCreated === 'function') {
                actions.onGraphCreated(graph);
            }

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
                    e.addClass('link-mode');
                } else {
                    e.removeClass('link-mode');
                }
            });
            resize();
        }
    }

    function createNodes (newNodes) {
        newNodes.forEach(e => {
            const node = graph.$('#' + e.id);

            if (e.position.x === 'center') {
                e.position.x = parseInt(domElement.offsetWidth / 2, 10);
            }
            if (e.position.y === 'center') {
                e.position.y = parseInt(domElement.offsetHeight / 2, 10);
            }

            if (node.length === 0) {
                graph.add({
                    group: 'nodes',
                    data: {
                        id: e.id,
                        isMaster: e.isMaster
                    },
                    position: {
                        x: e.position.x,
                        y: e.position.y
                    },
                    classes: e.type.toLowerCase()
                });
            }
        });
    }

    function refreshNodeSelection (e, node) {
        if (e.isSelected === true) {
            node.addClass('selected');
        } else {
            node.removeClass('selected');
        }
    }

    function refreshNodePosition (e, node) {
        node.position({ x: e.position.x, y: e.position.y });
    }

    function refreshNodeEdges (e, node) {
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

    function refreshGraph (synthState, uiState) {
        const newNodes = synthState.modules || [],
            newGraph = uiState.graph || { pan: { x: 0, y: 0 }, zoom: 1 },
            newLinkMode = newGraph.linkMode || false;

        if (graph) {
            //REMOVE ALL EXISTING EDGES
            graph.edges().forEach(e => {
                graph.remove(e);
            });

            //CREATE NOT EXISTENT MODULES
            createNodes(newNodes);
            //SET NODES PROPERTIES
            newNodes.forEach(e => {
                const node = graph.$('#' + e.id);
                refreshNodeSelection(e, node);
                refreshNodePosition(e, node);
                refreshNodeEdges(e, node);
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
