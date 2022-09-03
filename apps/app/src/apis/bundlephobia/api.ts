import type { AxiosRequestConfig } from "axios";

import { createURLWithSearchParams } from "./../@utilities";

import { BundlephobiaAxios } from "./const";

type BundlephobiaAPIData = {
  size: {
    assets: { gzip: number; name: string; size: number; type: string }[];
    dependencyCount: number;
    dependencySizes: { approximateSize: number; name: string }[];
    description: string;
    gzip: number;
    hasJSModule: boolean;
    hasJSNext: boolean;
    hasSideEffects: boolean;
    ignoredMissingDependencies: string[];
    isModuleType: boolean;
    name: string;
    peerDependencies: string[];
    repository: string;
    scoped: boolean;
    size: number;
    version: string;
  };
};

const BundlephobiaAPI = {
  size: async (data: { package: string }, config?: AxiosRequestConfig) => {
    const url = createURLWithSearchParams("/api/size", { package: data.package });
    return await BundlephobiaAxios.get<BundlephobiaAPIData["size"]>(url, config);
  },
};

export type { BundlephobiaAPIData };
export default BundlephobiaAPI;
