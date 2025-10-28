import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

export interface CanvasScopeContextValue {
  /** 스코프 */
  scope: paper.PaperScope | null;
  /** 스코프 수정 함수 */
  setScope: Dispatch<SetStateAction<paper.PaperScope | null>>;
}

export const CanvasScopeContext = createContext<CanvasScopeContextValue>({
  scope: null,
  setScope: () => {},
});

export function useCanvasScope() {
  const context = useContext(CanvasScopeContext);
  if (!context) {
    console.warn("Canvas scope is not available");
  }
  return context;
}
