import type { RouteObject } from "react-router-dom";

import { DrawingPolygon, DrawingShapes } from "@pages";

export const PlaygroundRoutes: RouteObject[] = [
  {
    path: "/playground",
    children: [
      {
        path: "drawing-polygon",
        element: <DrawingPolygon />,
      },
      {
        path: "drawing-shapes",
        element: <DrawingShapes />,
      },
    ],
  },
];
