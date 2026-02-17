import ErrorCard from "../components/ErrorCard.jsx";
import Forecast from "../components/Forecast";
import Navbar from "../components/Navbar.jsx";
import WeatherParticles from "../components/WeatherParticles";
import WeatherWind from "../components/WeatherWind";
import { useWeather } from "../context/WeatherContext";
import { useBackground } from "../hooks/useBackground.js";
import { useWeatherEffect } from "../hooks/useWeatherEffect.js";

function ForecastPage() {
  const { weather, forecast, loading, error } = useWeather();

  const bg = useBackground(weather);
  const effectType = useWeatherEffect(weather);

  return (
    <div className={`app ${bg}`}>
      <WeatherParticles type={effectType} />

      <WeatherWind speed={weather?.wind?.speed || 0} />

      <h1 className="app-title">Forecast</h1>

      <Navbar />

      {loading && (
        <div className="loader-wrapper">
          <div className="spinner" />
        </div>
      )}

      {error && <ErrorCard message={error} />}

      {forecast && !loading && !error && <Forecast data={forecast} />}
    </div>
  );
}

export default ForecastPage;
