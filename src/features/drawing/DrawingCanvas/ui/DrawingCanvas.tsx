import { classNames } from "@/shared";
import { useDrawing } from "../hooks";
import type { DrawingCanvasProps } from "../types";
import { Canvas } from "./Canvas";
import { Line } from "./Line";
import { Tool } from "./Tool";
import { ScopeProvider } from "../model";
export function DrawingCanvas({
  className,
  onComplete,
  polygon,
  ...props
}: DrawingCanvasProps) {
  return (
    <ScopeProvider>
      <div
        className={classNames(
          "border border-solid border-black",
          "h-[600px] w-[800px]",
          className,
        )}
        {...props}
      >
        <Canvas
          // ref={canvasRef}
          // onDoubleClick={handleDoubleClick}
          onLoad={(scope) => {
            console.log("loaded", scope);
          }}
        >
          {/* <DrawingTool polygon={polygon} onComplete={onComplete} /> */}
          {/* 테스트용 도형 */}
          <Line dashArray={[10, 4]} from={[50, 50]} to={[200, 200]} />
          <Line from={[200, 50]} strokeColor="red" to={[50, 200]} />
        </Canvas>
      </div>
    </ScopeProvider>
  );
}

function DrawingTool({ onComplete, polygon }: DrawingCanvasProps) {
  // 캔버스 관리
  const { handleMouseDown, handleMouseMove } = useDrawing({
    onComplete,
    polygon,
  });

  return <Tool onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} />;
}
