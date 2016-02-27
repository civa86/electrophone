const localCache = () => {
    let factory = {},
        hasStorage;

    function init () {
        if (typeof(Storage) !== "undefined" && localStorage) {
            hasStorage = true;
        }
    }

    function setItem (stateName, obj) {
        if (hasStorage) {
            if (typeof obj !== 'string') {
                localStorage.setItem(stateName, JSON.stringify(obj));
            } else {
                localStorage.setItem(stateName, obj);
            }
        }
    }

    function saveState (stateName, state) {
        console.log(stateName, state);
        if (hasStorage) {
            setItem(stateName, state);
        }
    }

    function loadState (stateName) {
        let cache = null;
        if (hasStorage && stateName) {
            cache = localStorage.getItem(stateName);
            if (cache && typeof cache === 'string') {
                cache = JSON.parse(cache);
            }
        }
        return cache;
    }

    factory.saveState = saveState;
    factory.loadState = loadState;

    init();

    return factory;
};

export default localCache;
