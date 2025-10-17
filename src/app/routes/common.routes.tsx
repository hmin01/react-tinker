import type { RouteObject } from "react-router-dom";

import { NotFoundPage } from "@/pages";

export const CommonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
