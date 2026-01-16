import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// VANCE PROTOCOL:
// Legacy Shadcn providers (ThemeProvider, TooltipProvider, Toaster) have been removed.
// Authentication, Toast (Sonner), and AI Context are now handled by 'client/src/core' providers wired in App.tsx.

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
