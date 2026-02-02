import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import Forecast from "../components/Forecast";
import WeatherParticles from "../components/WeatherParticles";
import WeatherWind from "../components/WeatherWind";
import { useWeather } from "../context/WeatherContext";

function ForecastPage() {
  const { weather, forecast, loading, error } = useWeather();

  const bg = useMemo(() => {
    if (!weather) return "bg-default";
    const c = weather.weather[0].main;
    if (c === "Clear") return "bg-clear";
    if (c === "Clouds") return "bg-clouds";
    if (c === "Rain" || c === "Drizzle") return "bg-rain";
    if (c === "Snow") return "bg-snow";
    if (c === "Thunderstorm") return "bg-thunder";
    return "bg-default";
  }, [weather]);

  return (
    <div className={`app ${bg}`}>
      <WeatherParticles
        type={
          weather?.weather[0].main === "Rain"
            ? "rain"
            : weather?.weather[0].main === "Snow"
            ? "snow"
            : null
        }
      />
      <WeatherWind speed={weather?.wind?.speed || 0} />

      <h1 className="app-title">Forecast</h1>

      <nav className="navbar">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/forecast" className="nav-link">
          Forecast
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </nav>

      {loading && (
        <div className="loader-wrapper">
          <div className="spinner" />
        </div>
      )}

      {error && <p style={{ opacity: 0.85 }}>{error}</p>}

      {forecast && !loading && !error && <Forecast data={forecast} />}
    </div>
  );
}

export default ForecastPage;
