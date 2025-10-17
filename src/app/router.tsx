import { createBrowserRouter } from "react-router-dom";
import { CommonRoutes, LibRoutes } from "./routes";

export const router = createBrowserRouter([
  {
    path: CommonRoutes.HOME,
    element: <div>Home Page</div>,
    children: [
      {
        path: LibRoutes.DRAWING_POLYGON,
        element: <div>Polygon Drawing Page</div>,
      },
    ],
  },
]);
