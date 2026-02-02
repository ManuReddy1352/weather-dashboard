
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { WeatherProvider } from "./context/WeatherContext";
import "./index.css";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <WeatherProvider>
        <App />
      </WeatherProvider>
    </BrowserRouter>
);
