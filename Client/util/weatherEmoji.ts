export const weatherEmojiMap: Record<number, string> = {
  0: "☀️", // Clear sky

  1: "🌤️", // Mainly clear
  2: "⛅", // Partly cloudy
  3: "☁️", // Overcast

  45: "🌫️", // Fog
  48: "🌫️", // Rime fog

  51: "🌦️", // Light drizzle
  53: "🌦️", // Moderate drizzle
  55: "🌧️", // Heavy drizzle

  56: "🌧️", // Freezing drizzle light
  57: "🌧️", // Freezing drizzle heavy

  61: "🌧️", // Light rain
  63: "🌧️", // Moderate rain
  65: "🌧️", // Heavy rain

  66: "🌧️", // Freezing rain light
  67: "🌧️", // Freezing rain heavy

  71: "🌨️", // Light snow
  73: "🌨️", // Moderate snow
  75: "❄️", // Heavy snow

  77: "❄️", // Snow grains

  80: "🌦️", // Rain showers light
  81: "🌧️", // Rain showers moderate
  82: "⛈️", // Violent showers

  85: "🌨️", // Snow showers light
  86: "❄️", // Snow showers heavy

  95: "⛈️", // Thunderstorm

  96: "⛈️", // Thunderstorm + hail
  99: "⛈️", // Thunderstorm heavy hail
};

export function getWeatherEmoji(code: number): string {
  return weatherEmojiMap[code] || "❓";
}
