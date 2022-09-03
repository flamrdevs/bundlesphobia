import { useState } from "react";
import type { PropsWithChildren } from "react";

import { ActionIcon, Anchor, Box, Center, Container, Group, Text, Tooltip } from "@mantine/core";

import { Gear, GithubLogo } from "phosphor-react";

import CONST from "~/const";
import { useSettings } from "~/stores/settings";

import ColorSchemeTogglerActionIcon from "./components/ColorSchemeTogglerActionIcon";
import SettingsDrawer from "./components/SettingsDrawer";

type RootLayoutProps = PropsWithChildren<{}>;

function RootLayout(props: RootLayoutProps) {
  const { containerSize } = useSettings();

  const [settingsDrawer, setSettingsDrawer] = useState(false);

  function handleCloseSettingsDrawer() {
    setSettingsDrawer(false);
  }

  function handleOpenSettingsDrawer() {
    setSettingsDrawer(true);
  }

  return (
    <>
      <header>
        <Container size={containerSize} my="lg">
          <Box px="0.2rem" py="0.4rem">
            <Group>
              <Text size="xl" weight="bold">
                Bundlesphobia
              </Text>

              <div style={{ flexGrow: 1 }} />

              <Tooltip label="Color Scheme" withinPortal>
                <ColorSchemeTogglerActionIcon />
              </Tooltip>

              <Tooltip label="Settings" withinPortal>
                <ActionIcon onClick={handleOpenSettingsDrawer}>
                  <Gear />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Github" withinPortal>
                <ActionIcon component="a" href={CONST.url.repository}>
                  <GithubLogo />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Box>
        </Container>
      </header>

      <main>
        <Container size={containerSize} my="lg">
          <Box px="0.2rem" py="0.4rem">
            {props.children}
          </Box>
        </Container>
      </main>

      <footer>
        <Container size={containerSize} my="lg">
          <Box px="0.2rem" py="0.4rem">
            <Center>
              <Group spacing="xs">
                <Text>API powered by</Text>
                <Anchor href={CONST.url.npm}>NPM</Anchor>
                <Text>&</Text>
                <Anchor href={CONST.url.bundlephobia}>Bundlephobia</Anchor>
              </Group>
            </Center>
          </Box>
        </Container>
      </footer>

      <SettingsDrawer opened={settingsDrawer} onClose={handleCloseSettingsDrawer} position="right" padding="xl" size="xl" />
    </>
  );
}

export type { RootLayoutProps };
export default RootLayout;
