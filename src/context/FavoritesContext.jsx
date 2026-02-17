import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    if (favorites.includes(city)) {
      return false;
    }

    setFavorites([...favorites, city]);
    return true;
  };

  const removeFavorite = (city) => {
    setFavorites(favorites.filter((c) => c !== city));
  };

  const reorderFavorites = (newOrder) => {
    setFavorites(newOrder);
    localStorage.setItem("favorites", JSON.stringify(newOrder));
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, reorderFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
