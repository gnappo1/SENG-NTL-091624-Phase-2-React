import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css"
import projectRouter from "./routes";
import ThemeProvider from "./context/ThemeProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <ThemeProvider>
    <RouterProvider router={projectRouter} />
  </ThemeProvider>
);