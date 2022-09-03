import { useStore } from "@nanostores/react";

import SettingsStore from "./store";

function useSettings() {
  return useStore(SettingsStore);
}

export { useSettings };
