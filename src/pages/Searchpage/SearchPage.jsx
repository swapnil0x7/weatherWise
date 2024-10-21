import React, { useState } from "react";
import "./searchPage.css";

function SearchPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeatherByCity = async (city) => {
    const apiKey = "5cec91c1badf4f9ab2f101547242010";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&aqi=no&days=5`;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      console.log("SEARCH: ", data);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherByCity(city);
    }
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <h1 className="search-title">Search City</h1>
        <div>
          <input
            type="text"
            className="search-input"
            placeholder="Search your location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {weatherData && (
            <div className="search-data-card">
              <div className="city">{weatherData.location.name}</div>
              <div className="country">{weatherData.location.country}</div>
            </div>
          )}
          {loading && <div className="warning">Loading...</div>}
          {error && <div className="warning">No such place found!</div>}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
