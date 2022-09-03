import type { BundledPackage } from "~/types";

import { createPersistentAtom } from "./../@utilities";

type BundledPackagesStoreState = BundledPackage[];

const BundledPackagesStore = createPersistentAtom<BundledPackagesStoreState>("bundled-packages", []);

export type { BundledPackagesStoreState };
export default BundledPackagesStore;
