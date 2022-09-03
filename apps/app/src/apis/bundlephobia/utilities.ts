import type { Bundle } from "~/types";

import type { BundlephobiaAPIData } from "./api";

function calculateDownloadTime(size: Bundle["size"]): Bundle["downloadTime"] {
  return {
    min: {
      n3G: size.min,
      n4G: size.min / 2,
      n5G: size.min / 5,
    },
    minGzip: {
      n3G: size.min,
      n4G: size.min / 2,
      n5G: size.min / 5,
    },
  };
}

function convertBundlephobiaAPISizeToBundle(data: BundlephobiaAPIData["size"]): Bundle {
  const size: Bundle["size"] = {
    min: data.size,
    minGzip: data.gzip,
  };
  return {
    name: data.name,
    version: data.version,
    description: data.description,
    size: size,
    downloadTime: calculateDownloadTime(size),
  };
}

export { convertBundlephobiaAPISizeToBundle };
