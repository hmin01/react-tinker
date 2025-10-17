import { createBrowserRouter } from "react-router-dom";

import { NotFoundPage } from "@/pages";
import { CommonRoutes, LibRoutes } from "./routes";

export const router = createBrowserRouter([
  {
    path: CommonRoutes.HOME,
    children: [
      {
        path: LibRoutes.DRAWING_POLYGON,
        element: <div>Polygon Drawing Page</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
