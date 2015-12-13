import cytoscape from 'cytoscape'
import $ from 'jquery'
import style from './GraphStyle'

function GraphManager ($q) {
    let service = {},
        graph;

    function createGraph (element) {
        let def = $q.defer(),
            screenCenterX = ($(window).width() / 2),
            screenCenterY = ($(window).height() / 2),
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
                        locked:   true
                    }
                ],
                ready:     function () {
                    graph = this;
                    def.resolve(graph);
                }
            };
            cytoscape(Object.assign(config, style));
        }

        return def.promise;
    }

    function addNode (elem) {
        graph.add(elem);
        graph.layout(style.layout);
    }

    service.createGraph = createGraph;
    service.addNode = addNode;

    return service;
}

export default GraphManager
