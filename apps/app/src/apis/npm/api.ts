import type { AxiosRequestConfig } from "axios";

import { createURLWithSearchParams } from "./../@utilities";

import { NPMAxios } from "./const";

type NPMAPIData = {
  search: {
    objects: {
      package: {
        name: string;
        scope: string;
        version: string;
        description: string;
        links: {
          npm: string;
          homepage?: string;
          repository?: string;
          bugs?: string;
        };
      };
      score: {
        final: number;
        detail: {
          quality: number;
          popularity: number;
          maintenance: number;
        };
      };
      searchScore: number;
    }[];
    total: number;
  };
};

const NPMAPI = {
  search: async (data: { text: string }, config?: AxiosRequestConfig) => {
    const url = createURLWithSearchParams("/-/v1/search", { text: data.text });
    return await NPMAxios.get<NPMAPIData["search"]>(url, config);
  },
};

export type { NPMAPIData };
export default NPMAPI;
