import { computed } from "nanostores";

import type { Bundle } from "~/types";

import BundledPackagesStore from "./store";

const getInitialComputedTotalBundledSizePackagesValue = () => {
  return { min: 0, minGzip: 0 } as Bundle["size"];
};

const getInitialComputedTotalBundledDownloadTimePackagesValue = () => {
  return { min: { n3G: 0, n4G: 0, n5G: 0 }, minGzip: { n3G: 0, n4G: 0, n5G: 0 } } as Bundle["downloadTime"];
};

const ComputedTotalBundledSizePackagesStore = computed(BundledPackagesStore, (list) =>
  list.reduce((prev, curr) => {
    if (curr.bundle) {
      prev.min = prev.min + curr.bundle.size.min;
      prev.minGzip = prev.minGzip + curr.bundle.size.minGzip;
    }

    return prev;
  }, getInitialComputedTotalBundledSizePackagesValue())
);

const ComputedTotalBundledDownloadTimePackagesStore = computed(BundledPackagesStore, (list) =>
  list.reduce((prev, curr) => {
    if (curr.bundle) {
      prev.min.n3G = prev.min.n3G + curr.bundle.downloadTime.min.n3G;
      prev.min.n4G = prev.min.n4G + curr.bundle.downloadTime.min.n4G;
      prev.min.n5G = prev.min.n5G + curr.bundle.downloadTime.min.n5G;

      prev.minGzip.n3G = prev.minGzip.n3G + curr.bundle.downloadTime.minGzip.n3G;
      prev.minGzip.n4G = prev.minGzip.n4G + curr.bundle.downloadTime.minGzip.n4G;
      prev.minGzip.n5G = prev.minGzip.n5G + curr.bundle.downloadTime.minGzip.n5G;
    }

    return prev;
  }, getInitialComputedTotalBundledDownloadTimePackagesValue())
);

export { ComputedTotalBundledSizePackagesStore, ComputedTotalBundledDownloadTimePackagesStore };
