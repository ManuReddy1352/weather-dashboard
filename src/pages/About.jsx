import { motion as Motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import WeatherParticles from "../components/WeatherParticles";
import WeatherWind from "../components/WeatherWind";
import { useWeather } from "../context/WeatherContext";
import { useBackground } from "../hooks/useBackground.js";
import { useWeatherEffect } from "../hooks/useWeatherEffect.js";

function About() {
  const { weather } = useWeather();

  const bg = useBackground(weather);
  const effectType = useWeatherEffect(weather);

  return (
    <div className={`app ${bg}`}>
      <WeatherParticles type={effectType} />
      <WeatherWind speed={weather?.wind?.speed || 0} />

      <h1 className="app-title">About</h1>

      <Navbar />

      <Motion.div
        className="weather-card about-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos,
          mollitia illum itaque rem ut error magnam, dolorum aliquam voluptas
          alias nobis ipsum amet facilis blanditiis consequatur sapiente, ab
          distinctio veritatis! Nesciunt architecto fugit, est voluptate alias
          soluta eius deleniti aperiam qui labore minus!
        </p>
      </Motion.div>
    </div>
  );
}

export default About;
