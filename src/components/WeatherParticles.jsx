import React from "react";

const WeatherParticles = React.memo(function WeatherParticles({ type }) {
  if (!type) return null;
  const count = type === "snow" ? 35 : 55;

  return (
    <div className={`particles ${type}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            left: Math.random() * 100 + "%",
            animationDuration:
              (type === "snow" ? 3 : 0.7) + Math.random() * 2 + "s",
          }}
        />
      ))}
    </div>
  );
});

export default WeatherParticles;
