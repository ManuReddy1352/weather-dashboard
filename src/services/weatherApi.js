import axios from "axios";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeather = (city) =>
    axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
            params: { q: city, units: "metric", appid: KEY },
        })
        .then((r) => r.data);

export const getForecast = (city) =>
    axios
        .get("https://api.openweathermap.org/data/2.5/forecast", {
            params: { q: city, units: "metric", appid: KEY },
        })
        .then((r) => r.data);
