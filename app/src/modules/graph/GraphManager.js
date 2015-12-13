import cytoscape from 'cytoscape'
import $ from 'jquery'
import style from './GraphStyle'

function GraphManager ($q, $rootScope) {
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

    function addNode (elem) {
        let collection = graph.add(elem),
            oldZoom = graph.zoom(),
            oldPos = graph.$('#master').position();

        console.log(oldPos);
        graph.add({
            group: 'edges',
            data: {
                source: collection[0].id(),
                target: 'master'
            }

        });

        reloadLayout();
        graph.zoom({
            level: oldZoom,
            position: oldPos
        });
    }

    service.createGraph = createGraph;
    service.resizeGraph = resizeGraph;
    service.addNode = addNode;

    //$rootScope.$on('graphResize', resizeGraph);

    return service;
}

export default GraphManager
