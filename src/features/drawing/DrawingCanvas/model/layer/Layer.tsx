import paper from "paper";
import { useEffect, useRef, type PropsWithChildren } from "react";

import { useScopeContext } from "../scope";

import { LayerContext } from "./LayerContext";

export function Layer({ children }: PropsWithChildren) {
  // Scope 컨텍스트
  const { scope } = useScopeContext();
  // 레이어 참조 객체
  const layer = useRef(new paper.Layer());

  /** 레이어 관리 */
  useEffect(() => {
    const _scope = scope.current;
    // 새로운 레이어 생성
    const layer = new _scope.Layer();
    layer.activate();

    return () => {
      // 레이어 삭제
      layer.remove();
    };
  }, [scope]);

  return (
    <LayerContext.Provider value={{ layer }}>{children}</LayerContext.Provider>
  );
}
