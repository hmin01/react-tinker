import { createBrowserRouter } from "react-router-dom";

import { CommonRoutes, PlaygroundRoutes } from "./routes";

export const router = createBrowserRouter(
  CommonRoutes.concat(PlaygroundRoutes),
);
