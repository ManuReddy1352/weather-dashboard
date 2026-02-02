import { NavLink } from "react-router-dom";
import { useMemo, useCallback } from "react";
import Search from "../components/Search";
import WeatherCard from "../components/WeatherCard";
import WeatherParticles from "../components/WeatherParticles";
import WeatherWind from "../components/WeatherWind";
import { useWeather } from "../context/WeatherContext";

function Home() {
  const {
    weather,
    loading,
    error,
    fetchCityWeather,
    fetchLocationWeather,
  } = useWeather();

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

  const handleSearch = useCallback(
    (city) => {
      fetchCityWeather(city);
    },
    [fetchCityWeather]
  );

  const handleLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchLocationWeather(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        fetchCityWeather("");
      }
    );
  }, [fetchLocationWeather, fetchCityWeather]);

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

      <h1 className="app-title">Weather App</h1>

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

      <Search onSearch={handleSearch} />

      <button
        className="nav-link"
        style={{ marginTop: "0.5rem" }}
        onClick={handleLocation}
      >
        Use My Location
      </button>

      {loading && (
        <div className="loader-wrapper">
          <div className="spinner" />
        </div>
      )}

      {error && <p style={{ opacity: 0.85 }}>{error}</p>}

      {weather && !loading && !error && <WeatherCard weather={weather} />}
    </div>
  );
}

export default Home;
