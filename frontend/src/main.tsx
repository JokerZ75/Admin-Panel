import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss"
import "./styles/desktop.scss"
import "./styles/global.scss"
import { Layout } from "./components";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
