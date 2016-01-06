import $ from 'jquery'
import cytoscape from 'cytoscape'

function GraphManager ($q) {
    let service = {},
        graph;

    //function reloadLayout () {
    //    if (graph) {
    //        graph.layout(style.layout);
    //        resizeGraph();
    //    }
    //}

    function createGraph (element, modules, graphStyle) {
        let def = $q.defer(),
            config;

        if (graph) {
            def.reject();
        } else {
            config = {
                container: element,
                elements: modules,
                ready: function () {
                    graph = this;
                    def.resolve(graph);
                }
            };
            cytoscape(Object.assign(config, graphStyle));
        }
        return def.promise;
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

    function setLinkMode (mode) {
        if (graph) {
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
            resizeGraph();
        }
    }

    function removeElem (elem) {
        if (graph) {
            graph.remove(elem);
        }
    }

    function removeAllEdgesFromSourceNode (source) {
        let edgesFromSource = source.connectedEdges();
        if (edgesFromSource.length > 0) {
            edgesFromSource.forEach((e) => {
                if (e.source().id() === source.id()) {
                    removeElem(e);
                }
            });
        }
    }

    function edgeExists (source, target) {
        let edgesFromSource = source.connectedEdges(),
            ret = false;
        if (edgesFromSource.length > 0) {
            edgesFromSource.forEach((e) => {
                if (e.source().id() === source.id() && e.target().id() === target.id()) {
                    ret = true;
                }
            });
        }
        return ret;
    }

    function addEdge (source, target) {
        if (graph && source && target) {
            if (!edgeExists(source, target)) {
                removeAllEdgesFromSourceNode(source, target);
                graph.add({
                    group: 'edges',
                    data: {
                        source: source.id(),
                        target: target.id()
                    }
                });
            }
        }

        resizeGraph();
    }

    function selectNode (node) {
        let ret = null;
        if (graph) {
            if (node.hasClass('selected')) {
                node.removeClass('selected');
            } else {
                graph.$('node.selected').removeClass('selected');
                node.addClass('selected');
                ret = node;
            }
        }
        return ret;
    }

    function addNode (elem, linkMode) {
        if (graph) {
            let e = elem || {};

            e.position = {
                x: 100,
                y: 100
            };

            if (linkMode) {
                e.classes = 'link-mode'
            }
            graph.add(e);
        }

        resizeGraph();
    }

    service.createGraph = createGraph;
    service.resetGraph = resetGraph;
    service.resizeGraph = resizeGraph;
    service.resetZoom = resetZoom;

    service.setLinkMode = setLinkMode;

    service.selectNode = selectNode;
    service.addNode = addNode;
    service.addEdge = addEdge;
    service.removeElem = removeElem;

    return service;
}

export default GraphManager
