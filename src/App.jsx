import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import ForecastPage from "./pages/ForecastPage";
import Home from "./pages/Home";
import "./styles/Animations.css";
import "./styles/Error.css";
import "./styles/Favorites.css";
import "./styles/Forecast.css";
import "./styles/Navbar.css";
import "./styles/Notification.css";
import "./styles/Responsive.css";
import "./styles/Search.css";
import "./styles/WeatherCard.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forecast" element={<ForecastPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  );
}

export default App;
