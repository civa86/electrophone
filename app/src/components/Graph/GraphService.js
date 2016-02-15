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

    //function onTapOver (e) {
    //    if (linkMode && sourceLinkNode && e.cyTarget.id() !== sourceLinkNode.id()  && isDragging) {
    //        targetLinkNode = e.cyTarget;
    //
    //        //$rootScope.$broadcast('GRAPH_SET_LINK_TARGET', {
    //        //    linkTargetType: targetLinkNode.data('type'),
    //        //    linkTargetId: targetLinkNode.id()
    //        //});
    //        //actions.onSetLinkTarget();
    //    }
    //}
    //
    //function onTapOut (e) {
    //    if (linkMode && targetLinkNode) {
    //        targetLinkNode = null;
    //        //$rootScope.$broadcast('GRAPH_SET_LINK_TARGET', null);
    //        //actions.onSetLinkTarget(null);
    //    }
    //}

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
                //TODO check master....
                if (sourceLinkNode && sourceLinkNode.id() !== 'master' && targetLinkNode) {
                    console.log('link', sourceLinkNode, targetLinkNode);
                    //GraphManager.addEdge(sourceLinkNode, targetLinkNode);
                    //$rootScope.$broadcast('GRAPH_MOD_LINK', {
                    //    source: sourceLinkNode.id(),
                    //    target: targetLinkNode.id()
                    //});
                }
                isDragging = false;
            }
            sourceLinkNode = null;
            targetLinkNode = null;
        }
    }

    function bindGraph () {
        resetLinkStatus();

        graph.on('click', 'node', onClickHandler);
        graph.on('tapstart', 'node', onTapStart);
        //graph.on('tapdragover', 'node', onTapOver);
        //graph.on('tapdragout', 'node', onTapOut);
        graph.on('tapdrag', onTapDrag);
        graph.on('tapend', onTapEnd);
    }

    function createGraph (domNode, linkAreaContext, applicationActions, initialNodes = []) {
        const config = { ...style, container: domNode };
        if (graphLib && typeof graphLib === 'function') {
            config.elements = initialNodes.map(e => ({
                //TODO refactor using a method....same of line 173
                group: 'nodes',
                data: {
                    id: e.id
                }
            }));

            graph = graphLib(config);
            domElement = domNode;
            linkAreaCtx = linkAreaContext;
            actions = { ...applicationActions };

            bindGraph();
            resize();
            //TODO avoid call reset...use props to set right zoom and node positions....
            reset();
        } else {
            throw new Error('Missing Graph Library');
        }

    }

    function refreshNodes (newNodes) {
        if (graph) {
            //ADD
            newNodes.forEach(e => {
                const node = graph.$('#' + e.id);

                if (node.length === 0) {
                    graph.add({
                        // TODO refactor above...
                        group: 'nodes',
                        data: {
                            id: e.id
                        }
                    });
                } else if (node.length === 1) {
                    // UPDATE LINK, SELECTION on else???
                    if (e.isSelected === true) {
                        node.addClass('selected');
                    } else {
                        node.removeClass('selected');
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

            resize();
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

    return {
        createGraph,
        resize,
        reset,
        refreshNodes,
        setLinkMode
    }

};

export default GraphService;
