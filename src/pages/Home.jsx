import { useCallback, useEffect, useState } from "react";
import ErrorCard from "../components/ErrorCard.jsx";
import Navbar from "../components/Navbar.jsx";
import Search from "../components/Search";
import WeatherCard from "../components/WeatherCard";
import WeatherParticles from "../components/WeatherParticles";
import WeatherWind from "../components/WeatherWind";
import { useFavorites } from "../context/FavoritesContext.jsx";
import { useNotification } from "../context/NotificationContext.jsx";
import { useWeather } from "../context/WeatherContext";
import { useBackground } from "../hooks/useBackground.js";
import { useWeatherEffect } from "../hooks/useWeatherEffect.js";

function Home() {
  const { weather, loading, error, fetchCityWeather, fetchLocationWeather } =
    useWeather();

  const [locating, setLocating] = useState(false);
  const bg = useBackground(weather);

  const handleSearch = useCallback(
    (city) => {
      fetchCityWeather(city);
    },
    [fetchCityWeather],
  );

  const handleLocation = useCallback(() => {
    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchLocationWeather(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      () => {
        fetchCityWeather("");
        setLocating(false);
      },
    );
  }, [fetchLocationWeather, fetchCityWeather]);

  const effectType = useWeatherEffect(weather);

  useEffect(() => {
    if (!weather) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchLocationWeather(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          fetchCityWeather("Hyderabad");
        },
      );
    }
  }, [weather, fetchLocationWeather, fetchCityWeather]);

  const { addFavorite } = useFavorites();
  const { showNotification } = useNotification();

  return (
    <div className={`app ${bg}`}>
      <WeatherParticles type={effectType} />

      <WeatherWind speed={weather?.wind?.speed || 0} />

      <h1 className="app-title">Weather App</h1>

      <Navbar />

      <Search onSearch={handleSearch} />

      <div className="action-buttons">
        <button
          className="nav-link"
          onClick={handleLocation}
          disabled={locating}
        >
          {locating ? (
            <>
              <span className="mini-spinner"></span>
              Detecting location
            </>
          ) : (
            "Use My Location"
          )}
        </button>

        {weather && (
          <button
            className="nav-link"
            onClick={() => {
              const added = addFavorite(weather.name);

              if (added) {
                showNotification(`${weather.name} added to favorites`);
              } else {
                showNotification(`${weather.name} is already in favorites`);
              }
            }}
          >
            Save to Favorites
          </button>
        )}
      </div>

      {loading && (
        <div className="loader-wrapper">
          <div className="spinner" />
        </div>
      )}

      {error && <ErrorCard message={error} />}

      {weather && !loading && !error && <WeatherCard weather={weather} />}
    </div>
  );
}

export default Home;
