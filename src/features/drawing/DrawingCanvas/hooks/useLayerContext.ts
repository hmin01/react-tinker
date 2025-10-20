import { useContext } from "react";

import { LayerContext } from "../model";

export function useLayerContext() {
  return useContext(LayerContext);
}
