import { useStore } from "@nanostores/react";

import BundledPackagesStore from "./store";
import { ComputedTotalBundledSizePackagesStore, ComputedTotalBundledDownloadTimePackagesStore } from "./computed";

function useBundledPackages() {
  return useStore(BundledPackagesStore);
}

function useTotalBundledSizePackages() {
  return useStore(ComputedTotalBundledSizePackagesStore);
}

function useTotalBundledDownloadTimePackages() {
  return useStore(ComputedTotalBundledDownloadTimePackagesStore);
}

export { useBundledPackages };
export { useTotalBundledSizePackages, useTotalBundledDownloadTimePackages };
