import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { getForecast, getWeather } from "../services/weatherApi";
const BASEURL = import.meta.env.VITE_URL;

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeatherData() {

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const lastCityRef = useRef(null);
  const lastCoordsRef = useRef(null);

  const fetchCityWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      lastCityRef.current = city;
      lastCoordsRef.current = null;

      const w = await getWeather(city);
      const f = await getForecast(city);

      setWeather(w);
      setForecast(f);
    } catch {
      setError("City not found. Please enter a valid city name.");
    } finally {
      setLoading(false);
    }
  };


  const fetchLocationWeather = async (lat, lon) => {
    try {
      setLoading(true);
      setError("");

      lastCoordsRef.current = { lat, lon };
      lastCityRef.current = null;

      const w = await axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: { lat, lon, units: "metric", appid: KEY },
        })
        .then((r) => r.data);

      const f = await axios
        .get("https://api.openweathermap.org/data/2.5/forecast", {
          params: { lat, lon, units: "metric", appid: KEY },
        })
        .then((r) => r.data);

      setWeather(w);
      setForecast(f);
    } catch {
      setError("Unable to fetch weather for your location.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastCityRef.current) {
        fetchCityWeather(lastCityRef.current);
      }

      if (lastCoordsRef.current) {
        fetchLocationWeather(
          lastCoordsRef.current.lat,
          lastCoordsRef.current.lon
        );
      }
    }, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(interval);
  }, []);

  return {
    weather,
    forecast,
    loading,
    error,
    fetchCityWeather,
    fetchLocationWeather,
  };
}
