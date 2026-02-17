import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FavoritesProvider } from "./context/FavoritesContext";
import { NotificationProvider } from "./context/NotificationContext";
import { WeatherProvider } from "./context/WeatherContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <WeatherProvider>
      <FavoritesProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </FavoritesProvider>
    </WeatherProvider>
  </BrowserRouter>,
);
