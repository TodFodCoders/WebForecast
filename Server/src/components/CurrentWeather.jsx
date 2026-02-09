import React from "react";
import WeatherDetails from "./WeatherDetails";

function CurrentWeather({ data }) {
  return (
    <div className="current-weather">
      <h2>{data.city}</h2>
      <div className="weather-main">
        <p>{data.icon}</p>
        {/* <img src={data.icon} alt="weather icon" /> */}
        <h1>{data.temperature}°C</h1>
      </div>
      <p>{data.description}</p>

      <WeatherDetails details={data} />
    </div>
  );
}

export default CurrentWeather;
