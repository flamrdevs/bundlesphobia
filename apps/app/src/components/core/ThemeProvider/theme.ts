import type { ColorScheme, MantineThemeOverride } from "@mantine/core";

const SHARED: MantineThemeOverride = {
  defaultRadius: "md",
  activeStyles: {
    transform: "scale(0.98)",
  },
};

const LIGHT: MantineThemeOverride = {
  ...SHARED,
  colorScheme: "light",
};

const DARK: MantineThemeOverride = {
  ...SHARED,
  colorScheme: "dark",
};

function getTheme(colorScheme: ColorScheme) {
  return colorScheme === "light" ? LIGHT : DARK;
}

export { getTheme };
