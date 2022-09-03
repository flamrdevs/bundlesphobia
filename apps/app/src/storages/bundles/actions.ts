import type { Bundle } from "~/types";

import type { BundlesStorageData } from "./storage";

function createBundleStorageData(options: { bundle: Bundle }): BundlesStorageData {
  return { bundle: options.bundle, created: new Date().getTime() };
}

export { createBundleStorageData };
