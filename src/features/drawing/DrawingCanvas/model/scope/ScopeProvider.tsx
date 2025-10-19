import { useRef, type PropsWithChildren } from "react";

import { ScopeContext } from "./ScopeContext";

export function ScopeProvider({ children }: PropsWithChildren) {
  const scope = useRef(new paper.PaperScope());

  return (
    <ScopeContext.Provider value={{ scope }}>{children}</ScopeContext.Provider>
  );
}
