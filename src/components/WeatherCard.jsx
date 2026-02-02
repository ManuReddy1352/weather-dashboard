import { motion as Motion } from "framer-motion";

function WeatherCard({ weather }) {
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  const date = new Date(weather.dt * 1000);

  return (
    <Motion.div
      className="weather-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Motion.img
        src={icon}
        className="weather-icon"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
      />

      <h2 className="weather-city">{weather.name}</h2>

      <h1 className="weather-temp">{Math.round(weather.main.temp)}°C</h1>

      <p className="weather-desc">{weather.weather[0].description}</p>

      <p style={{ opacity: 0.85 }}>
        {date.toLocaleDateString()} • {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>

      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between", fontSize: "0.9rem", opacity: 0.9 }}>
        <span>Humidity: {weather.main.humidity}%</span>
        <span>Wind: {Math.round(weather.wind.speed)} m/s</span>
      </div>
    </Motion.div>
  );
}

export default WeatherCard;
