import { useState } from "react";

import { Button, Drawer, Group, SegmentedControl, Stack, Text } from "@mantine/core";
import type { ColorScheme, MantineSize, ButtonProps, DrawerProps, SegmentedControlProps } from "@mantine/core";

import { useSettings, setColorScheme, setContainerSize } from "~/stores/settings";

import BundlesStorage from "~/storages/bundles";
import NPMStorage from "~/storages/npm";

function ColorSchemeSegmentedControl(props: Omit<SegmentedControlProps, "value" | "onChange" | "data">) {
  const { colorScheme } = useSettings();

  function handleChange(value: ColorScheme) {
    setColorScheme(value);
  }

  const segmentedControlData: {
    label: string;
    value: ColorScheme;
  }[] = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  return <SegmentedControl {...props} value={colorScheme} onChange={handleChange} data={segmentedControlData} />;
}

function ContainerSizeSegmentedControl(props: Omit<SegmentedControlProps, "value" | "onChange" | "data">) {
  const { containerSize } = useSettings();

  function handleChange(value: MantineSize) {
    setContainerSize(value);
  }

  const segmentedControlData: {
    label: string;
    value: MantineSize;
  }[] = [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
  ];

  return <SegmentedControl {...props} value={containerSize} onChange={handleChange} data={segmentedControlData} />;
}

function CacheClearerButton(props: Omit<ButtonProps, "onClick">) {
  const [cleared, setCleared] = useState(false);

  async function handleClick() {
    await BundlesStorage.clear();
    await NPMStorage.clear();
    setCleared(true);
  }

  return (
    <Button color="red" {...props} disabled={cleared} onClick={handleClick}>
      Clear
    </Button>
  );
}

type SettingsDrawerProps = DrawerProps;

function SettingsDrawer(props: SettingsDrawerProps) {
  return (
    <Drawer title="Settings" {...props}>
      <Stack spacing="xl" p="sm">
        <Group position="apart">
          <Text>Color Scheme</Text>
          <ColorSchemeSegmentedControl size="xs" />
        </Group>

        <Group position="apart">
          <Text>Container Size</Text>
          <ContainerSizeSegmentedControl size="xs" />
        </Group>

        <Group position="apart">
          <Text>Cache</Text>
          <CacheClearerButton compact />
        </Group>
      </Stack>
    </Drawer>
  );
}

export type { SettingsDrawerProps };
export default SettingsDrawer;
