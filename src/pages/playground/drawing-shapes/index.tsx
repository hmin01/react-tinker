import {
  Canvas,
  Circle,
  Line,
  Polyline,
  Rectangle,
} from "@features/drawingCanvas";

import { PageHeader, PageLayout } from "./ui";

export function DrawingShapes() {
  return (
    <PageLayout header={<PageHeader>Drawing Shapes</PageHeader>}>
      <Canvas>
        <Line from={[100, 100]} to={[200, 100]} />
        <Circle center={[100, 400]} radius={50} />
        <Polyline
          points={[
            [300, 200],
            [350, 250],
            [300, 300],
            [250, 250],
          ]}
        />
        <Rectangle from={[200, 300]} to={[100, 150]} rounded={10} />
      </Canvas>
    </PageLayout>
  );
}
