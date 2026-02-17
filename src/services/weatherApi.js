import axios from "axios";

const KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASEURL = import.meta.env.VITE_URL;

export const getWeather = (city) =>
    axios
        .get(`${BASEURL}/weather`, {
            params: { q: city, units: "metric", appid: KEY },
        })
        .then((r) => r.data);

export const getForecast = (city) =>
    axios
        .get(`${BASEURL}/forecast`, {
            params: { q: city, units: "metric", appid: KEY },
        })
        .then((r) => r.data);

export const getCitySuggestions = (query) =>
    axios
        .get("https://api.openweathermap.org/geo/1.0/direct", {
            params: {
                q: query,
                limit: 10,
                appid: KEY
            },
        })
        .then((r) => r.data);