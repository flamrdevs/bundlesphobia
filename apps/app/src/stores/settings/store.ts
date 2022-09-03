import type { ColorScheme, MantineSize } from "@mantine/core";

import { createPersistentMap } from "./../@utilities";

type SettingsStoreState = {
  appVersion: string;
  colorScheme: ColorScheme;
  containerSize: MantineSize;
};

const SettingsStore = createPersistentMap<SettingsStoreState>("settings", {
  appVersion: "1.0.0",
  colorScheme: "light",
  containerSize: "md",
});

export type { SettingsStoreState };
export default SettingsStore;
