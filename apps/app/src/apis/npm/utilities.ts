import type { Package } from "~/types";

import type { NPMAPIData } from "./api";

function convertNPMAPISearchToPackages(data: NPMAPIData["search"]): Package[] {
  return data.objects.map(
    ({
      package: {
        name,
        version,
        description,
        links: { npm },
      },
    }) => {
      return {
        name,
        version,
        description,
        links: { npm },
      };
    }
  );
}

export { convertNPMAPISearchToPackages };
