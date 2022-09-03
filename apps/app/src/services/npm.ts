import type { AxiosRequestConfig } from "axios";

import type { Package } from "~/types";

import NPMStorage, { createNPMStorageData, isNPMStorageDataReliable } from "~/storages/npm";

import NPMAPI, { convertNPMAPISearchToPackages } from "~/apis/npm";

const NPMService = {
  search: async (data: { text: string }, config?: AxiosRequestConfig): Promise<Package[]> => {
    const key = data.text;

    const local = await NPMStorage.get(key);
    if (local && isNPMStorageDataReliable(local)) {
      return local.packages;
    }

    const response = await NPMAPI.search({ text: key }, config);
    const converted = convertNPMAPISearchToPackages(response.data);
    await NPMStorage.set(key, createNPMStorageData({ packages: converted }));

    return converted;
  },
};

export default NPMService;
