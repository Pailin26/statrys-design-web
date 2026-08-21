import React from "react";
import ReactDOM from "react-dom/client";
import "@statrys/tokens/dist/tokens.css";
import "@statrys/tokens/fonts.css";
import "./shell.css";
import { IconProvider } from "@statrys/web-ds";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IconProvider>
      <App />
    </IconProvider>
  </React.StrictMode>
);
