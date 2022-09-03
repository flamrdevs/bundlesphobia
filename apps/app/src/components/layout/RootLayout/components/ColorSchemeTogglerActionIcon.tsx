import { forwardRef } from "react";

import { ActionIcon } from "@mantine/core";
import type { ActionIconProps } from "@mantine/core";

import { Moon, Sun } from "phosphor-react";

import { useSettings, toggleColorScheme } from "~/stores/settings";

type ColorSchemeTogglerActionIconProps = Omit<ActionIconProps, "children">;

const ColorSchemeTogglerActionIcon = forwardRef<HTMLButtonElement, ColorSchemeTogglerActionIconProps>((props, ref) => {
  const { colorScheme } = useSettings();

  function handleClick() {
    toggleColorScheme();
  }

  return (
    <ActionIcon ref={ref} {...props} onClick={handleClick}>
      {colorScheme === "dark" ? <Sun /> : <Moon />}
    </ActionIcon>
  );
});

export type { ColorSchemeTogglerActionIconProps };
export default ColorSchemeTogglerActionIcon;
