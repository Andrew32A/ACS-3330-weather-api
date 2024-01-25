import React from "react";

function DisplayWeather({ weatherData, unit }) {
  return (
    <div>
      <h2>{weatherData.name} Weather</h2>
      <p>
        Temperature: {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p>Condition: {weatherData.weather[0].main}</p>
    </div>
  );
}

export default DisplayWeather;
