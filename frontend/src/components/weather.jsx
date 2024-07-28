import React, {useState, useEffect} from 'react';
import axios from 'axios';


const Weather = () => {
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeatherData = async () => {
        console.log("fetching data")

        if (!city.trim() || !state.trim() || !country.trim()) {
            setError('Please enter city, state, and country.');
            return;
        }
        console.log(city)
        console.log(state)
        console.log(country)

        //GET COORDINATES BASED ON THE CITY STATE AND COUNTRY

        //GET WEATHER BASED ON COORDINATES


        try {
            // Step 1: Get coordinates based on city, state, and country
            const geoResponse = await axios.get('http://localhost:5173/weather/geo', {
                params: {
                    city,
                    state,
                    country
                }
            });
            const { lat, lon } = geoResponse.data;
            if (lat && lon) {
                console.log(`Latitude: ${lat}`);
                console.log(`Longitude: ${lon}`);

                // Step 2: Get weather based on coordinates
                const weatherResponse = await axios.get('http://localhost:5173/weather/forecast', {
                    params: {
                        lat,
                        lon
                    }
                });

                setWeather(weatherResponse.data);
                setError('');

            } else {
                setError('Unable to get coordinates for the location.');
                setWeather(null);
            }
        } catch (error) {
            console.error('Error fetching data:', error.response || error.message || error);
            setError('Failed to fetch weather data. Please check your inputs.');
            setWeather(null);
        }
    };

    return (
        <div className="weather-container">
            <h1 className="title">Weather Forecast</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="input-text"
                />
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state"
                    className="input-text"
                />
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                    className="input-text"
                />
                <button 
                    onClick={fetchWeatherData} className="submit-button">Get Weather</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weather && (
                <div className="weather-card">
                    <h2 className="city-name">Weather in {city}, {state}, {country}</h2>
                    <p className="weather-temp">Temperature: {weather.temperature}°C</p>
                    <p className="weather-pressure">Pressure: {weather.pressure} hPa</p>
                    <p className="weather-humidity">Humidity: {weather.humidity}%</p>
                    <p className="weather-desc">Description: {weather.description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
