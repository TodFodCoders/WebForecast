import React, { useState } from "react";
import SearchBar from "./SearchBar";
import CurrentWeather from "./CurrentWeather";
import ForecastList from "./ForecastList";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError("");

      // Replace with your backend API endpoint
      const response = await fetch(`/api/weather?city=${city}`);
      console.log("API Response:", response);

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      console.log("Parsed Data:", data);

      setWeatherData(data.current);
      setForecastData(data.forecast);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <SearchBar onSearch={fetchWeather} />

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weatherData && (
        <>
          <CurrentWeather data={weatherData} />
          <ForecastList forecast={forecastData} />
        </>
      )}
    </div>
  );
}

export default WeatherApp;
