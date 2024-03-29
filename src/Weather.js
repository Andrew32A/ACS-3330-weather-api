import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./Weather.css";

function Weather() {
  const [zip, setZip] = useState("");
  const [unit, setUnit] = useState("imperial"); // because I'm American, imperial by default. Could also be metric
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const updateZip = (event) => {
    setZip(event.target.value);
  };

  const updateUnit = (event) => {
    setUnit(event.target.value);
  };

  const fetchWeather = async (url) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        throw new Error(data.message || "Error fetching weather data");
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!zip) return;

    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=${unit}&appid=${apiKey}`;
    fetchWeather(url);
  };

  const handleGeolocationWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = process.env.REACT_APP_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
        fetchWeather(url);
      },
      () => {
        setError("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className="weather-container">
      <h1 className="weather-title">Weather</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={zip}
          onChange={updateZip}
          placeholder="Enter zip code"
          pattern="^\d{5}$"
          className="zip-input"
        />
        <select value={unit} onChange={updateUnit} className="unit-select">
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
        <button type="submit" className="submit-btn">
          Get Weather
        </button>
        <button
          type="button"
          onClick={handleGeolocationWeather}
          className="geo-btn"
        >
          Get Weather By Location
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {weatherData && <DisplayWeather weatherData={weatherData} unit={unit} />}
    </div>
  );
}

export default Weather;
