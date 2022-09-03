import type { PropsWithChildren } from "react";

import { NotificationsProvider } from "@mantine/notifications";

type NotificationsLayerProviderProps = PropsWithChildren<{}>;

function NotificationsLayerProvider(props: NotificationsLayerProviderProps) {
  return <NotificationsProvider position="top-center">{props.children}</NotificationsProvider>;
}

export type { NotificationsLayerProviderProps };
export default NotificationsLayerProvider;
