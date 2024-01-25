import React, { useState, useEffect } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div>
      <h1>Weather</h1>
      <p>{JSON.stringify(weatherData)}</p>
    </div>
  );
}

export default Weather;
