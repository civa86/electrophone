const screen = () => {
    let factory = {};

    function getWindowSize () {
        let res = { width: 0, height: 0 };
        if (window && document) {
            res.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            res.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
        return res;
    }

    function getSizeById (id) {
        let res = { width: 0, height: 0 },
            node;
        if (document && id) {
            node = document.getElementById(id);
            if (node) {
                res.width = node.clientWidth;
                res.height = node.clientHeight;
            }
        }

        return res;
    }

    factory.getWindowSize = getWindowSize;
    factory.getSizeById = getSizeById;

    return factory;
};

export default screen;
