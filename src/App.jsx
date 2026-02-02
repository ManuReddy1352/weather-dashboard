import { useState } from "react";
import Forecast from "./components/Forecast";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import WeatherParticles from "./components/WeatherParticles";
import WeatherWind from "./components/WeatherWind";
import { getForecast, getWeather } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const bg = () => {
    if (!weather) return "bg-default";
    const c = weather.weather[0].main;
    if (c === "Clear") return "bg-clear";
    if (c === "Clouds") return "bg-clouds";
    if (c === "Rain" || c === "Drizzle") return "bg-rain";
    if (c === "Snow") return "bg-snow";
    if (c === "Thunderstorm") return "bg-thunder";
    return "bg-default";
  };

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const w = await getWeather(city);
      const f = await getForecast(city);
      setWeather(w);
      setForecast(f);
    } catch {
      alert("City not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${bg()}`}>
      <WeatherParticles
        type={
          weather?.weather[0].main === "Rain"
            ? "rain"
            : weather?.weather[0].main === "Snow"
            ? "snow"
            : null
        }
      />
      <WeatherWind speed={weather?.wind?.speed} />

      <h1 className="app-title">Weather App</h1>

      <Search onSearch={fetchWeather} />

      {loading && (
        <div className="loader-wrapper">
          <div className="spinner" />
        </div>
      )}

      {weather && !loading && (
        <div className="dashboard">
          <WeatherCard weather={weather} />
          <Forecast data={forecast} />
        </div>
      )}
    </div>
  );
}

export default App;
