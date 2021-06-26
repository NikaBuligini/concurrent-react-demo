const cache = new Map();

const Pending = 0;
const Resolved = 1;

type FetchFn<TKey, TReturn> = (key: TKey) => Promise<TReturn>;

type Resource<TKey, TReturn> = {
  read: (key: TKey) => TReturn;
  preload: (key: TKey) => void;
}

function access<TKey, TReturn>(
  resource: Resource<TKey, TReturn>,
  key: TKey,
  fetch: FetchFn<TKey, TReturn>
) {
  let cacheForResource = cache.get(resource);

  if (cacheForResource === undefined) {
    cacheForResource = new Map();
    cache.set(resource, cacheForResource);
  }

  const entry = cacheForResource.get(key);

  if (entry === undefined) {
    const thenable = fetch(key);
    thenable.then((value) => {
      cacheForResource.set(key, value);
    });

    const result = {
      status: Pending,
      value: thenable,
    };

    return result;
  }

  return {
    status: Resolved,
    value: entry,
  };
}

function createResource<TKey, TReturn>(fetch: FetchFn<TKey, TReturn>) {
  const resource: Resource<TKey, TReturn> = {
    read: (key) => {
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

    preload: (key) => {
      access(resource, key, fetch);
    },
  };

  return resource;
}

export default createResource;
