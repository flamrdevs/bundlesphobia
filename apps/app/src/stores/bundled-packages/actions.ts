import type { Bundle, BundledPackage } from "~/types";

import BundledPackagesStore from "./store";

function hasByName(name: string) {
  const index = BundledPackagesStore.get().findIndex((item) => item.name === name);
  return index >= 0 ? true : false;
}

function insert(data: BundledPackage) {
  BundledPackagesStore.set([...BundledPackagesStore.get(), data]);
}

function updateBundleByName(name: string, bundle: Bundle) {
  BundledPackagesStore.set(
    BundledPackagesStore.get().map((item) => {
      if (item.name === name) {
        return {
          name: item.name,
          version: item.version,
          description: item.description,
          links: item.links,
          bundle: bundle,
        };
      }
      return item;
    })
  );
}

function removeByName(name: string) {
  BundledPackagesStore.set(BundledPackagesStore.get().filter((item) => item.name !== name));
}

function clear() {
  BundledPackagesStore.set([]);
}

export { hasByName, insert, updateBundleByName, removeByName, clear };
