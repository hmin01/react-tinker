import { DrawingCanvas, Line } from "@features/drawing";

import { PageHeader, PageLayout } from "./ui";

export function DrawingShapes() {
  return (
    <PageLayout header={<PageHeader>Drawing Shapes</PageHeader>}>
      <DrawingCanvas>
        <Line from={[100, 100]} to={[200, 100]} />
      </DrawingCanvas>
    </PageLayout>
  );
}
