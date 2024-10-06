import React, { useState } from 'react';
import axios from 'axios';
import './SCSS/styles.scss'; 
import Footer from './components/Footer';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const apiKey = 'e37135dd9e1d485e874110323240610';

  const handleInputChange = (e) => {
    const input = e.target.value;
    setCity(input);
    
    if (debounceTimeout) {
      clearTimeout(debounceTimeout); // Clear the previous timeout
    }

    if (input) {
      setDebounceTimeout(setTimeout(() => {
        fetchCitySuggestions(input);
      }, 300)); // Adjust the timeout as needed (e.g., 300ms)
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const fetchCitySuggestions = async (input) => {
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`);
      setSuggestions(response.data); // Set the suggestions from API response
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
    }
  };

  const handleSearch = async () => {
    setError(''); // Clear previous error messages
    try {
      const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
      setWeather({
        city: weatherResponse.data.location.name,
        region: weatherResponse.data.location.region,
        country: weatherResponse.data.location.country,
        temp: Math.round(weatherResponse.data.current.temp_c),
        condition: weatherResponse.data.current.condition.text,
        icon: weatherResponse.data.current.condition.icon,
      });
      setSuggestions([]); // Clear suggestions after search
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion.name); // Update input with selected suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <>
      <h1>Clear Skies</h1>
      <input 
        type="text" 
        value={city} 
        onChange={handleInputChange} 
        placeholder="Enter city name" 
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)} style={{ cursor: 'pointer' }}>
              {suggestion.name}, {suggestion.region}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.city}, {weather.region}, {weather.country}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.condition}</p>
          <img src={`https:${weather.icon}`} alt={weather.condition} />
        </div>
      )}

      <Footer/>
    </>
  )
}

export default App;
