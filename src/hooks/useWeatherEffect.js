
import { useMemo } from "react";

export function useWeatherEffect(weather) {
    return useMemo(() => {
        if (!weather) return null;

        const condition = weather.weather[0].main;

        if (condition === "Rain") return "rain";
        if (condition === "Snow") return "snow";

        return null;
    }, [weather]);
}