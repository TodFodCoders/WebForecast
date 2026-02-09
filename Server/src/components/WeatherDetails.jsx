import React from "react";

function WeatherDetails({ details }) {
  return (
    <div className="weather-details">
      <div>Humidity: {details.humidity}%</div>
      <div>Wind: {details.windSpeed} km/h</div>
      <div>Pressure: {details.pressure} hPa</div>
      <div>Feels Like: {details.feelsLike}°C</div>
    </div>
  );
}

export default WeatherDetails;
