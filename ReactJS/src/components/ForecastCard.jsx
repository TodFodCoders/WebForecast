import React from "react";

function ForecastCard({ day }) {
  return (
    <div className="forecast-card">
      <p>{day.date}</p>
      <img src={day.icon} alt="forecast icon" />
      <p>{day.temp}°C</p>
      <p>{day.description}</p>
    </div>
  );
}

export default ForecastCard;
