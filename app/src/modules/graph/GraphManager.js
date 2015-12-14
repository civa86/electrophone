import $ from 'jquery'
import cytoscape from 'cytoscape'
import style from './GraphStyle'

function GraphManager ($q) {
    let service = {},
        graph;

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

    function createGraph (element, graphHeight) {
        let def = $q.defer(),
            screenCenterX = ($(window).width() / 2),
            screenCenterY = (graphHeight / 2),
            config;

        if (graph) {
            def.reject();
        } else {
            config = {
                container: element,
                elements:  [
                    {
                        group:    'nodes',
                        data:     {
                            id: 'master'
                        },
                        position: {
                            x: screenCenterX,
                            y: screenCenterY
                        },
                        style:    {
                            width:  100,
                            height: 100
                        },
                        locked: true
                    }
                ],
                ready: function () {
                    graph = this;
                    resetGraph();
                    def.resolve(graph);
                }
            };
            cytoscape(Object.assign(config, style));
        }

        return def.promise;
    }

    function addEdge (source, target) {
        graph.add({
            group: 'edges',
            data: {
                source: source,
                target: target
            }
        });

        resizeGraph();
    }

    function addNode (elem) {
        let oldZoom = graph.zoom(),
            oldPos = graph.$('#master').position();

        graph.add(elem)

        reloadLayout();
        graph.zoom({
            level: oldZoom,
            position: oldPos
        });
    }

    function removeElem (elem) {
        graph.remove(elem)
    }

    service.createGraph = createGraph;
    service.resizeGraph = resizeGraph;
    service.addNode = addNode;
    service.addEdge = addEdge;
    service.removeElem = removeElem;

    return service;
}

export default GraphManager
