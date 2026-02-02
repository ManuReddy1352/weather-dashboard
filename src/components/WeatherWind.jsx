function WeatherWind({ speed }) {
  if (!speed || speed < 3) return null;
  const count = speed > 6 ? 12 : 6;

  return (
    <div className="wind">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            top: Math.random() * 100 + "%",
            animationDuration: 2 + Math.random() * 3 + "s",
          }}
        />
      ))}
    </div>
  );
}

export default WeatherWind;
