import deepEqual from "fast-deep-equal";

type PromiseCache<Response, Args extends any[]> = {
  promise: Promise<void>;
  args: Args;
  error?: any;
  response?: Response;
};

type PromiseFn<Response, Args extends any[]> = (
  ...args: Args
) => Promise<Response>;

function handleAsset<Response, Args extends any[]>(
  fn: PromiseFn<Response, Args>,
  cache: PromiseCache<Response, Args>[],
  args: Args,
  preload = false
) {
  for (const entry of cache) {
    if (deepEqual(args, entry.args)) {
      if (preload) {
        return;
      }

      if (entry.error) {
        throw entry.error;
      }

      if (entry.response) {
        return entry.response;
      }

      throw entry.promise;
    }
  }

  const entry: PromiseCache<Response, Args> = {
    args,
    promise:
      fn(...args)
        .then((response) => {
          entry.response = (response ?? true) as Response;
          return entry.response;
        })
        .catch((e) => (entry.error = e ?? "unknown error")),
  };

  cache.push(entry);

  if (!preload) {
    throw entry.promise;
  }
}

function clear<Response, Args extends any[]>(
  cache: PromiseCache<Response, Args>[],
  ...args: Args
) {
  if (args === undefined || args.length === 0) {
    cache.splice(0, cache.length);
  } else {
    const entry = cache.find((entry) => deepEqual(args, entry.args));
    if (entry) {
      const index = cache.indexOf(entry);
      if (index !== -1) {
        cache.splice(index, 1);
      }
    }
  }
}

export function createAsset<Response, Args extends any[]>(
  fn: PromiseFn<Response, Args>,
) {
  const cache: PromiseCache<Response, Args>[] = [];

  return {
    read: (...args: Args): Response => {
      return handleAsset(fn, cache, args) as Response;
    },
    preload: (...args: Args): void => {
      handleAsset(fn, cache, args, true);
    },
    clear: (...args: Args) => clear(cache, ...args),
  };
}
