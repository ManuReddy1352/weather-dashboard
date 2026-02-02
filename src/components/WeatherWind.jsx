function WeatherWind({ speed = 0 }) {
  if (!speed || speed < 2) return null;

  const count = Math.min(Math.floor(speed * 2), 20);

  return (
    <div className="wind">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            top: `${Math.random() * 100}vh`,
            animationDuration: `${1.5 + Math.random()}s`,
            opacity: Math.random(),
          }}
        />
      ))}
    </div>
  );
}

export default WeatherWind;
