import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";

function Weather() {
  const [zip, setZip] = useState("");
  const [unit, setUnit] = useState("imperial"); // cause im american, imperical by default. could also be metric
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const updateZip = (event) => {
    setZip(event.target.value);
  };

  const updateUnit = (event) => {
    setUnit(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!zip) return;

    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=${unit}&appid=${apiKey}`;

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

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={zip}
          onChange={updateZip}
          placeholder="Enter zip code"
          pattern="^\d{5}$" // regex to make sure it's a 5 digit number
        />
        <select value={unit} onChange={updateUnit}>
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
        <button type="submit">Get Weather</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weatherData && <DisplayWeather weatherData={weatherData} unit={unit} />}
    </div>
  );
}

export default Weather;
