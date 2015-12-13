function UpdateGraphBtnDirective (graphManager) {
    return {
        restrict: 'A',
        link: function ($scope, element) {
            element.on('click', function () {
                graphManager.resizeGraph();
            });

        }
    }
}

export default UpdateGraphBtnDirective
