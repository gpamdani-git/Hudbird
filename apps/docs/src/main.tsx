import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Suppress benign ResizeObserver notification loop events
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    if (
      event.message &&
      (event.message.includes("ResizeObserver loop") ||
        event.message.includes("undelivered notifications"))
    ) {
      event.stopImmediatePropagation();
    }
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
