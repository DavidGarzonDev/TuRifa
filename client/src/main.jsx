import { createRoot } from "react-dom/client";
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/router";

createRoot(document.getElementById("root")).render(
  <Suspense fallback={<div>Cargando...</div>}>
    <RouterProvider router={router} />
  </Suspense>
);