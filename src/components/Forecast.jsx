function Forecast({ data }) {
  if (!data) return null;

  const hourly = data.list.slice(0, 8);

  const dailyMap = {};
  data.list.forEach((item) => {
    const day = item.dt_txt.split(" ")[0];
    if (!dailyMap[day]) dailyMap[day] = item;
  });

  const daily = Object.values(dailyMap).slice(0, 5);

  return (
    <div className="forecast">
      <div className="hourly">
        {hourly.map((h, i) => (
          <div key={i} className="hour">
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
          </div>
        ))}
      </div>

      <div className="daily">
        {daily.map((d, i) => (
          <div key={i} className="day">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
