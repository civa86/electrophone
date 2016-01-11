'use strict';

function UpdateGraphBtnDirective (GraphManager) {
    return {
        restrict: 'A',
        link: function ($scope, element) {
            element.on('click', function () {
                GraphManager.resizeGraph();
            });

        }
    };
}

export default UpdateGraphBtnDirective;
