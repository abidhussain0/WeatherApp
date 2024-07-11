import { useState, useEffect } from 'react';
import axios from 'axios';

function New() {
    const [city, setCity] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [weatherData, setWeatherData] = useState(null);
    const [forecastWeatherData, setForecastWeatherData] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [userLocation, setUserLocation] = useState(null);

    const apiKey = "376ec041a1c326a6a6b5755d6095cde4";

    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ latitude, longitude });
                    fetchDataByLocation(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    const fetchDataByLocation = async (latitude, longitude) => {
        try {
            const [currentWeatherResponse, forecastWeatherResponse] = await Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
                    params: { lat: latitude, lon: longitude, units: 'metric', appid: apiKey }
                }),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                    params: { lat: latitude, lon: longitude, units: 'metric', appid: apiKey }
                })
            ]);

            setWeatherData(currentWeatherResponse.data);
            setForecastWeatherData(forecastWeatherResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchData = async () => {
        try {
            const [currentWeatherResponse, forecastWeatherResponse] = await Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`, {
                    params: { q: city, units: 'metric', appid: apiKey }
                }),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`, {
                    params: { q: city, appid: apiKey }
                })
            ]);

            setWeatherData(currentWeatherResponse.data);
            setForecastWeatherData(forecastWeatherResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchCitySuggestions = async (input) => {
        const apiKey = "724b02c2c9msh2278982a4b9900ep1dd4aajsnc46de5de7c34";
        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
                    'x-rapidapi-key': apiKey,
                },
                params: {
                    namePrefix: input,
                    limit: 5,
                },
            });
            setSuggestions(response.data.data);
        } catch (error) {
            console.error("Error fetching city suggestions:", error);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setCity(input);
        if (input.length > 2) {
            fetchCitySuggestions(input);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setCity(suggestion.name);
        setSuggestions([]);
    };

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };

    const handleDayClick = (day) => {
        setSelectedDay(day);
    };

    const groupedByDay = forecastWeatherData ? forecastWeatherData.list.reduce((acc, item) => {
        const day = getDayOfWeek(item.dt_txt);
        if (!acc[day]) acc[day] = [];
        acc[day].push(item);
        return acc;
    }, {}) : {};

    return (
        <div>
            {userLocation && (
                <div>
                    {/* <h2>User Location</h2>
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p> */}
                </div>
            )}
            <div className="form-outline" data-mdb-input-init>
                <input
                    type="text"
                    id="formControlLg"
                    className="form-control form-control-lg"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                />
            </div>
            <ul>
                {suggestions.map((suggestion) => (
                    <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.name}
                    </li>
                ))}
            </ul>
            <br />
            <br />
            <button type="button" className="btn btn-info" onClick={fetchData}>Get Weather</button>
            <br />
            <br />
            {weatherData && (
                <div>
                    <h2>Current Weather</h2>
                    <table className="table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">City</th>
                                <th scope="col">Temperature (°C)</th>
                                <th scope="col">Feel Like</th>
                                <th scope="col">Today's Weather</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{weatherData.name}</td>
                                <td>{weatherData.main.temp}</td>
                                <td>{weatherData.main.feels_like}</td>
                                <td>{weatherData.weather[0].main}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {forecastWeatherData && (
                <div>
                    <h2>Coming Day's Forecast</h2>
                    <div className="accordion" id="accordionPanelsStayOpenExample">
                        {Object.keys(groupedByDay).map((day, index) => (
                            <div key={index} className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button ${selectedDay === day ? '' : 'collapsed'}`}
                                        type="button"
                                        onClick={() => handleDayClick(day)}
                                    >
                                        {day}
                                    </button>
                                </h2>
                                <div className={`accordion-collapse collapse ${selectedDay === day ? 'show' : ''}`}>
                                    <div className="accordion-body">
                                        {groupedByDay[day].map((item, index) => (
                                            <div key={index} className="card">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </h5>
                                                    <p className="card-text">Temperature: {item.main.temp} °C</p>
                                                    <p className="card-text">Weather: {item.weather[0].main}</p>
                                                    <p className="card-text">
                                                        <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="Weather icon" />
                                                    </p>
                                                    <p className="card-text">Humidity: {item.main.humidity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default New;
