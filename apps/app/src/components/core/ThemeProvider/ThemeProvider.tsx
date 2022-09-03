import { useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";

import { useSettings } from "~/stores/settings";

import { getTheme } from "./theme";

type ThemeProviderProps = PropsWithChildren<{}>;

function ThemeProvider(props: ThemeProviderProps) {
  const { colorScheme } = useSettings();

  const theme = useMemo(() => getTheme(colorScheme), [colorScheme]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

export type { ThemeProviderProps };
export default ThemeProvider;
