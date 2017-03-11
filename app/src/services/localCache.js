const localCache = (storageInput) => {
    let factory = {},
        storage = storageInput,
        hasStorage;

    function init () {
        if (storage &&
            typeof storage.setItem === 'function' &&
            typeof storage.getItem === 'function' &&
            typeof storage.clear === 'function'
        ) {
            hasStorage = true;
        }
    }

    function setItem (stateName, obj) {
        if (hasStorage) {
            if (typeof obj !== 'string') {
                storage.setItem(stateName, JSON.stringify(obj));
            } else {
                storage.setItem(stateName, obj);
            }
        }
    }

    function saveState (stateName, state) {
        if (hasStorage) {
            setItem(stateName, state);
        }
    }

    function loadState (stateName) {
        let cache = null;
        if (hasStorage && stateName) {
            cache = storage.getItem(stateName);
            if (cache && typeof cache === 'string') {
                try {
                    cache = JSON.parse(cache);
                } catch (e) {
                    cache = null;
                }
            }
        }
        return cache;
    }

    function itemsList (storageKey) {
        const storage = loadState(storageKey);

        if (!storageKey) {
            throw new Error('no storage key provided');
        }

        if (storage) {
            return storage;
        } else {
            return [];
        }
    }

    function getItem (storageKey, itemId) {
        const storage = loadState(storageKey) || [];
        return storage.filter(e => e.id === itemId).pop();
    }

    function addItem (storageKey, itemId, item) {
        const
            storage = loadState(storageKey) || [],
            found = storage.filter(e => e.id === itemId).pop(),
            element = {
                id: itemId,
                item: item,
                time: + new Date()
            };

        if (!found) {
            saveState(storageKey, [ ...storage, element ]);
            return loadState(storageKey);
        } else {
            throw new Error(itemId + ' already exists');
        }
    }

    function updateItem (storageKey, itemId, item) {
        const
            storage = loadState(storageKey) || [],
            found = storage.filter(e => e.id === itemId).pop();

        if (found) {
            saveState(storageKey, storage.map(e => {
                if (e.id !== itemId) {
                    return e;
                }

                return {
                    ...e,
                    time: + new Date(),
                    item: {
                        ...e.item,
                        ...item
                    }
                }
            }));

            return loadState(storageKey);
        } else {
            throw new Error(itemId + ' not found');
        }
    }

    function removeItem (storageKey, itemId) {
        const
            storage = loadState(storageKey) || [],
            found = storage.filter(e => e.id === itemId).pop();

        if (found) {
            saveState(storageKey, storage.filter(e => e.id !== itemId));
            return loadState(storageKey);
        } else {
            throw new Error(itemId + ' not found');
        }
    }

    function reset () {
        storage.clear();
    }

    factory.itemsList = itemsList;
    factory.getItem = getItem;
    factory.addItem = addItem;
    factory.updateItem = updateItem;
    factory.removeItem = removeItem;
    factory.reset = reset;

    init();

    return factory;
};

export default localCache;
