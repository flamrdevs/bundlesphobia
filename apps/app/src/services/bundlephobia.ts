import type { AxiosRequestConfig } from "axios";

import type { Bundle } from "~/types";

import BundlesStorage, { createBundleStorageData } from "~/storages/bundles";

import BundlephobiaAPI, { convertBundlephobiaAPISizeToBundle } from "~/apis/bundlephobia";

import { versionedName } from "~/utilities/package";

const BundlephobiaService = {
  size: async (data: { name: string; version: string }, config?: AxiosRequestConfig): Promise<Bundle> => {
    const key = versionedName(data.name, data.version);

    const local = await BundlesStorage.get(key);
    if (local) {
      return local.bundle;
    }

    const response = await BundlephobiaAPI.size({ package: key }, config);
    const converted = convertBundlephobiaAPISizeToBundle(response.data);
    await BundlesStorage.set(key, createBundleStorageData({ bundle: converted }));

    return converted;
  },
};

export default BundlephobiaService;
