const cache = new Map();

const Pending = 0;
const Resolved = 1;

function access(resource, key, fetch) {
  let cacheForResource = cache.get(resource);

  if (cacheForResource === undefined) {
    cacheForResource = new Map();
    cache.set(resource, cacheForResource);
  }

  const entry = cacheForResource.get(key);

  if (entry === undefined) {
    const thenable = fetch(key);
    thenable.then(value => {
      if (newResult.status === Pending) {
        newResult.status = Resolved;
        newResult.value = value;
        cacheForResource.set(key, value);
      }
    });

    const newResult = {
      status: Pending,
      value: thenable,
    };

    return newResult;
  }

  return {
    status: Resolved,
    value: entry,
  };
}

function createResource(fetch) {
  const resource = {
    read: key => {
      const result = access(resource, key, fetch);

      switch (result.status) {
        case Pending: {
          throw result.value;
        }
        case Resolved: {
          return result.value;
        }
        default:
          return undefined;
      }
    },

    preload: key => {
      access(resource, key, fetch);
    },
  };

  return resource;
}

export default createResource;
