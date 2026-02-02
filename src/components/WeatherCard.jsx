import { motion as Motion } from "framer-motion";

function WeatherCard({ weather }) {
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

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
    </Motion.div>
  );
}

export default WeatherCard;
