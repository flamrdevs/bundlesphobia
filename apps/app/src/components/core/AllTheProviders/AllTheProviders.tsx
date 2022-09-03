import type { PropsWithChildren } from "react";

import ThemeProvider from "../ThemeProvider";
import PhosphorProvider from "../PhosphorProvider";
import NotificationsLayerProvider from "../NotificationsLayerProvider";

type AllTheProvidersProps = PropsWithChildren<{}>;

function AllTheProviders(props: AllTheProvidersProps) {
  return (
    <ThemeProvider>
      <PhosphorProvider>
        <NotificationsLayerProvider>{props.children}</NotificationsLayerProvider>
      </PhosphorProvider>
    </ThemeProvider>
  );
}

export type { AllTheProvidersProps };
export default AllTheProviders;
