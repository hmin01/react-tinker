import type { RouteObject } from "react-router-dom";

import { DebounceThrottlePlayground, DrawingPolygon } from "@pages";

export const PlaygroundRoutes: RouteObject[] = [
  {
    path: "/playground",
    children: [
      {
        path: "debounce-throttle",
        element: <DebounceThrottlePlayground />,
      },
      {
        path: "drawing-polygon",
        element: <DrawingPolygon />,
      },
    ],
  },
];
