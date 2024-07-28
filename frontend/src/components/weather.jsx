import React, {useState, useEffect} from 'react';
import axios from 'axios';
import load_dotenv from 'dotenv';
import os from 'os';

load_dotenv() 

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [alert, setAlert] = useState(null);

    const OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")

    const fetchWeatherData = async (location) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                params: {
                    q: location,
                    appid: OPENWEATHERMAP_API_KEY,
                    units: 'metric'
                }
            });
            setWeather(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeather(null);
        }
    };

    const fetchWeatherAlert = async (location) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                params: {
                    q: location,
                    appid: OPENWEATHERMAP_API_KEY
                }
            });
            setAlert(response.data.alerts);
        } catch (error) {
            console.error('Error fetching weather alert:', error);
            setAlert(null);
        }
    };

    useEffect(() => {
        if (location) {
            fetchWeatherData(location);
            fetchWeatherAlert(location);
        }
    }, [location]);

    return (
        <div>
            <h1>Real-Time Weather Report</h1>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
            />
            {weather && (
                <div>
                    <h2>Weather in {weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
            {alert && alert.length > 0 && (
                <div>
                    <h2>Weather Alerts</h2>
                    {alert.map((a, index) => (
                        <p key={index}>{a.description}</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Weather;
