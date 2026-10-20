import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import API_BASE from "./api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);