import React from "react";
import ReactDOM from "react-dom/client";
import "@statrys/tokens/dist/tokens.css";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
