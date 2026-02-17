import { motion as Motion } from "framer-motion";
import React from "react";

const Forecast = React.memo(function Forecast({ data }) {
  if (!data) return null;

  const hourly = data.list.slice(0, 8);

  const dailyMap = {};
  data.list.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    if (!dailyMap[day]) dailyMap[day] = item;
  });

  const daily = Object.values(dailyMap).slice(0, 5);

  return (
    <Motion.div
      className="forecast"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="hourly">
        {hourly.map((h, i) => (
          <Motion.div
            key={i}
            className="hour"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p>
              {new Date(h.dt_txt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${h.weather[0].icon}.png`}
              alt=""
            />
            <p>{Math.round(h.main.temp)}°</p>
          </Motion.div>
        ))}
      </div>

      <div className="daily">
        {daily.map((d, i) => (
          <Motion.div
            key={i}
            className="day"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p>
              {new Date(d.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
              alt=""
            />
            <p>{Math.round(d.main.temp)}°</p>
          </Motion.div>
        ))}
      </div>
    </Motion.div>
  );
});

export default Forecast;
