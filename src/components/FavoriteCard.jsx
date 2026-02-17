import { motion as Motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useNotification } from "../context/NotificationContext";
import { useWeather } from "../context/WeatherContext";
import { getWeather } from "../services/weatherApi";

const FavoriteCard = React.memo(function FavoriteCard({ city }) {
  const [preview, setPreview] = useState(null);

  const { fetchCityWeather } = useWeather();
  const { removeFavorite } = useFavorites();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await getWeather(city);

        setPreview({
          temp: Math.round(res.main.temp),
          condition: res.weather[0].main,
        });
      } catch {
        setPreview(null);
      }
    };

    fetchPreview();
  }, [city]);

  const handleClick = () => {
    fetchCityWeather(city);
    showNotification(`Weather updated for ${city}`);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    removeFavorite(city);
    showNotification(`${city} removed from favorites`);
  };

  return (
    <Motion.div
      className="favorite-card"
      onClick={handleClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -3,
      }}
    >
      <div className="favorite-info">
        <span className="favorite-city">{city}</span>

        {preview && (
          <span className="favorite-preview">
            {preview.temp}°C • {preview.condition}
          </span>
        )}
      </div>

      <button className="remove-button" onClick={handleRemove}>
        Remove
      </button>
    </Motion.div>
  );
});

export default FavoriteCard;
