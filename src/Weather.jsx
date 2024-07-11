// import { useState } from 'react';
// import axios from 'axios';

// function Weather() {
//     const [city, setCity] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [weatherData, setWeatherData] = useState(null);
//     const [forecastWeatherData, setForecastWeatherData] = useState(null);

//     const apiKey = "376ec041a1c326a6a6b5755d6095cde4";

//     const fetchData = async () => {
//         try {
//             const [currentWeatherResponse, forecastWeatherResponse] = await Promise.all([
//                 axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`, {
//                     params: { q: city, units: 'metric', appid: apiKey }
//                 }),
//                 axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric`, {
//                     params: { q: city, appid: apiKey }
//                 })
//             ]);

//             setWeatherData(currentWeatherResponse.data);
//             setForecastWeatherData(forecastWeatherResponse.data);
//             console.log('Current Weather Data:', currentWeatherResponse.data);
//             console.log('Forecast Weather Data:', forecastWeatherResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const fetchCitySuggestions = async (input) => {
//         const apiKey = "724b02c2c9msh2278982a4b9900ep1dd4aajsnc46de5de7c34";
//         const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`;

//         try {
//             const response = await axios.get(url, {
//                 headers: {
//                     'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
//                     'x-rapidapi-key': apiKey,
//                 },
//                 params: {
//                     namePrefix: input,
//                     limit: 5,
//                 },
//             });
//             setSuggestions(response.data.data);
//         } catch (error) {
//             console.error("Error fetching city suggestions:", error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const input = e.target.value;
//         setCity(input);
//         if (input.length > 2) {
//             fetchCitySuggestions(input);
//         } else {
//             setSuggestions([]);
//         }
//     };

//     const handleSuggestionClick = (suggestion) => {
//         setCity(suggestion.name);
//         setSuggestions([]);
//     };

//     const getDayOfWeek = (dateString) => {
//         const date = new Date(dateString);
//         const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//         return days[date.getDay()];
//     };

//     const gettime = (dateString) => {
//         return (dateString.slice(-8));


//     };

//     return (
//         <div>
//             <div className="form-outline" data-mdb-input-init>
//                 <input
//                     type="text"
//                     id="formControlLg"
//                     className="form-control form-control-lg"
//                     placeholder="Enter city name"
//                     value={city}
//                     onChange={handleInputChange}
//                 />
//             </div>

//             <ul>
//                 {suggestions.map((suggestion) => (
//                     <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
//                         {suggestion.name}
//                     </li>
//                 ))}
//             </ul>
//             <br />
//             <br />
//             <button type="button" className="btn btn-info" onClick={fetchData}>Get Weather</button>
//             <br />
//             <br />
//             {weatherData && (
//                 <div>
//                     <h2>Current Weather</h2>
//                     <table className="table-bordered">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th scope="col">City</th>
//                                 <th scope="col">Temperature (°C)</th>
//                                 <th scope="col">Feel Like</th>
//                                 <th scope="col">Today's Weather</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{weatherData.name}</td>
//                                 <td>{weatherData.main.temp}</td>
//                                 <td>{weatherData.main.feels_like}</td>
//                                 <td>{weatherData.weather[0].main}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {forecastWeatherData && (
//                 <div>
//                     <h2>next 3-day forecast</h2>

//                     <div class="accordion" id="accordionPanelsStayOpenExample">
//                         <div class="accordion-item">
//                             <h2 class="accordion-header">
//                                 <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
//                                     <td>{getDayOfWeek(forecastWeatherData.list[0].dt_txt)}</td>

//                                 </button>
//                             </h2>


//                             <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
//                                 <div class="accordion-body">
//                                     <div class="row">
//                                         <div class="col-sm-3 mb-3 mb-sm-0">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     temp: {forecastWeatherData.list[0].main.temp_max}
//                                                     <div class="card-title">
//                                                         time: {gettime(forecastWeatherData.list[0].dt_txt)}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="col-sm-6">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     temp: {forecastWeatherData.list[1].main.temp_max}
//                                                     <div class="card-title">
//                                                         time: {gettime(forecastWeatherData.list[1].dt_txt)}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>



//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div class="accordion" id="accordionPanelsStayOpenExample">
//                         <div class="accordion-item">
//                             <h2 class="accordion-header">
//                                 <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" >
//                                     <tr >
//                                         <td>{getDayOfWeek(forecastWeatherData.list[5].dt_txt)}</td>
//                                     </tr>
//                                 </button>

//                             </h2>
//                             <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show">
//                                 <div class="accordion-body">
//                                     <div class="row">

//                                         <div class="col-sm-6 mb-3 mb-sm-0">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     temp: {forecastWeatherData.list[12].main.temp_max}
//                                                     <div class="card-title">
//                                                         time: {gettime(forecastWeatherData.list[12].dt_txt)}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="col-sm-6">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     temp: {forecastWeatherData.list[13].main.temp_max}
//                                                     <div class="card-title">
//                                                         time: {gettime(forecastWeatherData.list[13].dt_txt)}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>


//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div class="accordion" id="accordionPanelsStayOpenExample">
//                         <div class="accordion-item">
//                             <h2 class="accordion-header">
//                                 <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
//                                     <tr >
//                                         <td>{getDayOfWeek(forecastWeatherData.list[13].dt_txt)}</td>
//                                     </tr>
//                                 </button>

//                             </h2>
//                             <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show">
//                                 <div class="accordion-body">
//                                     <div class="row">

//                                         <div class="col-sm-6 mb-3 mb-sm-0">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     temp: {forecastWeatherData.list[20].main.temp_max}
//                                                     <div class="card-title">
//                                                         time: {gettime(forecastWeatherData.list[20].dt_txt)}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="col-sm-6">
//                                             <div class="card">
//                                                 <div class="card-body">
//                                                     temp: {forecastWeatherData.list[18].main.temp_max}
//                                                     <div class="card-title">
//                                                         time: {gettime(forecastWeatherData.list[18].dt_txt)}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>


//                                     </div>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>


// {/* 
//                     <table className="table-bordered">
//                         <thead className="thead-dark">
//                             <tr>
//                                 <th scope="col">Day</th>
//                                 <th scope="col">Date</th>
//                                 <th scope="col">Temperature (°C)</th>
//                                 <th scope="col">Weather</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {forecastWeatherData.list.map((item, index) => (
//                                 <tr key={index}>
//                                     <td>{getDayOfWeek(item.dt_txt)}</td>
//                                     <td>{(item.dt_txt)}</td>
//                                     <td>{item.main.temp}</td>
//                                     <td>{item.weather[0].main}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table> */}
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Weather;