import { useRef } from "react";
import type { PropsWithChildren } from "react";

import { IconContext } from "phosphor-react";
import type { IconProps } from "phosphor-react";

type PhosphorProviderProps = PropsWithChildren<{}>;

function PhosphorProvider(props: PhosphorProviderProps) {
  const value = useRef<IconProps>({
    size: 18,
    weight: "light",
    color: "currentColor",
  });

  return <IconContext.Provider value={value.current}>{props.children}</IconContext.Provider>;
}

export type { PhosphorProviderProps };
export default PhosphorProvider;
