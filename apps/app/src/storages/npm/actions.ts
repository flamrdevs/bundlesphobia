import type { Package } from "~/types";

import type { NPMStorageData } from "./storage";

function now() {
  return new Date().getTime();
}

function createNPMStorageData(options: { packages: Package[] }): NPMStorageData {
  return { packages: options.packages, created: now() };
}

const ONE_DAY = 24 * 60 * 60 * 1000;

function isLessThanOneDay(test: number) {
  return test < ONE_DAY;
}

function isNPMStorageDataReliable(data: NPMStorageData) {
  return isLessThanOneDay(now() - data.created);
}

export { createNPMStorageData, isNPMStorageDataReliable };
