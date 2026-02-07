import express from "express";
import { fetchWeatherApi } from "openmeteo";
import { getWeatherEmoji } from "../util/weatherEmoji";
import { getWeatherDescription } from "../util/weatherDescription";

const router = express.Router();

router.get("/weather", async (req, res) => {
  const city = req.query.city as string;
  try {
    const response = await getResponse(city);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function getCityCoords(city: string) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }
  const place = data.results[0];
  return { latitude: place.latitude, longitude: place.longitude };
}

async function getResponse(city: string) {
  const { latitude, longitude } = await getCityCoords(city);

  const url = "https://api.open-meteo.com/v1/forecast";

  const [api] = await fetchWeatherApi(url, {
    latitude,
    longitude,
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    current: [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "surface_pressure",
      "apparent_temperature",
      "relative_humidity_2m",
    ],
    timezone: "auto",
  });

  const c = api.current()!;
  const d = api.daily()!;

  const codes = d.variables(0)!.valuesArray() ?? [];
  const max = d.variables(1)!.valuesArray() ?? [];
  const min = d.variables(2)!.valuesArray() ?? [];

  return {
    current: {
      city,
      temperature: c.variables(0)!.value(),
      description: getWeatherDescription(c.variables(1)!.value()),
      icon: getWeatherEmoji(c.variables(1)!.value()),
      humidity: c.variables(5)!.value(),
      windSpeed: c.variables(2)!.value(),
      pressure: c.variables(3)!.value(),
      feelsLike: c.variables(4)!.value(),
    },

    forecast: Array.from(
      {
        length: (Number(d.timeEnd()) - Number(d.time())) / d.interval(),
      },
      (_, i) => ({
        date: new Date((Number(d.time()) + i * d.interval()) * 1000),

        temp: (max[i] + min[i]) / 2,

        description: getWeatherDescription(codes[i]),

        icon: getWeatherEmoji(codes[i]),
      }),
    ),
  };
}

export default router;
