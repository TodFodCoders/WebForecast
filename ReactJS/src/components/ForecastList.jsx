import React from "react";
import ForecastCard from "./ForecastCard";

function ForecastList({ forecast }) {
  return (
    <div className="forecast-list">
      {forecast.map((day, index) => (
        <ForecastCard key={index} day={day} />
      ))}
    </div>
  );
}

export default ForecastList;
