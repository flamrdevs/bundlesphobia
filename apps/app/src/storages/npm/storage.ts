import type { Package } from "~/types";

import { createStorage } from "../@utilities";

type NPMStorageData = {
  packages: Package[];
  created: number;
};

const NPMStorage = createStorage<NPMStorageData>("npm");

export type { NPMStorageData };
export default NPMStorage;
