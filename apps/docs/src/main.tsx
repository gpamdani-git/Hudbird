import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
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
// Handle stale chunk errors (e.g., when a user has an old version open during a new Vercel deploy)
if (typeof window !== "undefined") {
  window.addEventListener("vite:preloadError", () => {
    window.location.reload();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <AnalyticsTracker />
      <App />
    </HashRouter>
  </React.StrictMode>
);
