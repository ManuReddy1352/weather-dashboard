import { DndContext, closestCenter } from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import Navbar from "../components/Navbar";
import SortableFavoriteCard from "../components/SortableFavoriteCard";
import WeatherParticles from "../components/WeatherParticles";
import WeatherWind from "../components/WeatherWind";

import { useFavorites } from "../context/FavoritesContext";
import { useWeather } from "../context/WeatherContext";
import { useBackground } from "../hooks/useBackground";
import { useWeatherEffect } from "../hooks/useWeatherEffect";

function Favorites() {
  const { favorites, reorderFavorites } = useFavorites();

  const { weather } = useWeather();

  const bg = useBackground(weather);
  const effectType = useWeatherEffect(weather);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = favorites.indexOf(active.id);
    const newIndex = favorites.indexOf(over.id);

    const newOrder = arrayMove(favorites, oldIndex, newIndex);

    reorderFavorites(newOrder);
  };

  return (
    <div className={`app ${bg}`}>
      <WeatherParticles type={effectType} />
      <WeatherWind speed={weather?.wind?.speed || 0} />

      <h1 className="app-title">Favorites</h1>

      <Navbar />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={favorites}
          strategy={verticalListSortingStrategy}
        >
          <div className="favorites-list">
            {favorites.map((city) => (
              <SortableFavoriteCard key={city} city={city} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default Favorites;
