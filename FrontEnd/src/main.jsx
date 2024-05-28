// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "../src/store/index.jsx"; // Asegúrate de que la ruta sea correcta
import { Provider } from "react-redux";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Corregido: store en minúscula */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
