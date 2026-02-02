import { createContext, useContext } from "react";
import { useWeatherData } from "../hooks/useWeatherData";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const weatherState = useWeatherData();
  return (
    <WeatherContext.Provider value={weatherState}>
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
