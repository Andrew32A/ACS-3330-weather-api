import React from "react";
import "./DisplayWeather.css";

function DisplayWeather({ weatherData, unit }) {
  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;

  return (
    <div className="weather-info">
      <img src={iconUrl} alt="Weather Icon" />
      <h2>{weatherData.name} Weather</h2>
      <p>
        Temperature: {weatherData.main.temp}°{unit === "metric" ? "C" : "F"}
      </p>
      <p>Condition: {weatherData.weather[0].main}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <p>
        Wind Speed: {weatherData.wind.speed}{" "}
        {unit === "metric" ? "meter/sec" : "miles/hour"}
      </p>
    </div>
  );
}

export default DisplayWeather;
