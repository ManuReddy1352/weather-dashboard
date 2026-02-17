import { useMemo } from "react";

const backgroundMap = {
    Clear: "bg-clear",
    Clouds: "bg-clouds",
    Rain: "bg-rain",
    Drizzle: "bg-rain",
    Snow: "bg-snow",
    Thunderstorm: "bg-thunder",
};

export function useBackground(weather) {
    return useMemo(() => {
        if (!weather) return "bg-default";
        return backgroundMap[weather.weather[0].main] || "bg-default";
    }, [weather]);
}
