import { createInstance } from "localforage";

function createStorageName(name: string) {
  return `bundlesphobia-storage@${name}`;
}

function createStorage<T>(name: string) {
  const instance = createInstance({ name: createStorageName(name) });

  return {
    async get(key: string) {
      return await instance.getItem<T>(key);
    },
    async set(key: string, value: T) {
      return await instance.setItem<T>(key, value);
    },
    async clear() {
      return await instance.clear();
    },
    async length() {
      return await instance.length();
    },
  };
}

export { createStorage };
