import SettingsStore from "./store";
import type { SettingsStoreState } from "./store";

function setColorScheme(colorScheme: SettingsStoreState["colorScheme"]) {
  SettingsStore.setKey("colorScheme", colorScheme);
}

function toggleColorScheme() {
  SettingsStore.setKey("colorScheme", SettingsStore.get().colorScheme === "dark" ? "light" : "dark");
}

function setContainerSize(containerSize: SettingsStoreState["containerSize"]) {
  SettingsStore.setKey("containerSize", containerSize);
}

export { setColorScheme, toggleColorScheme, setContainerSize };
