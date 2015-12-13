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

        config = {
            container: element,
            elements: [
                {
                    group: 'nodes',
                    data: {
                        id: 'master'
                    },
                    position: {
                        x: screenCenterX,
                        y: screenCenterY
                    },
                    style: {
                        width: 100,
                        height: 100
                    },
                    locked: true
                }
            ],
            ready: function () {
                graph = this;
                bindGraph();
                def.resolve();
            }
        };
        cytoscape(Object.assign(config, style));

        return def.promise;
    }

    function bindGraph () {
        graph.on('click', 'node', function(e) {
            let ele = e.cyTarget;
            if (ele.hasClass('selected')) {
                ele.removeClass('selected');
            } else {
                graph.$('node.selected').removeClass('selected');
                ele.addClass('selected')
            }
        });
    }

    service.createGraph = createGraph;

    return service;
}

export default GraphManager
