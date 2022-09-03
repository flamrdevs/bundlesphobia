import type { Bundle } from "~/types";

import { createStorage } from "../@utilities";

type BundlesStorageData = {
  bundle: Bundle;
  created: number;
};

const BundlesStorage = createStorage<BundlesStorageData>("bundles");

export type { BundlesStorageData };
export default BundlesStorage;
