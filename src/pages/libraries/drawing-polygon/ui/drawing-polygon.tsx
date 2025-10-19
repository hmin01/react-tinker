import { DrawingCanvas } from "@/features/drawing";

export function DrawingPolygon() {
  return (
    <div>
      <DrawingCanvas onComplete={(points) => console.log("complete", points)} />
    </div>
  );
}
