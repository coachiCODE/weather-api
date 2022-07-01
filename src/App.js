import React, {useState} from 'react';
import background from '../src/img/aaa.jpeg'
import axios from 'axios';
import './App.css';

function App() {

  const myStyle={
    backgroundImage: `url(${background})`,
    height:'100vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  const [city,setCity] = useState("")
  const [weatherData,setWeatherData] = useState(
    {
      description: "",
      temp:0,
      temp_min:0,
      temp_max:0,
      humidity:0,
      sunrise:0,
      sunset:0,
      country:"",
      lastupdate:0
    })
  
  const [dataLoaded,setDataLoaded] = useState(false)

  const searchWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c7e0fa38a478a4f0540b6465fa46497f&units=metric`
    ).then((response) => {
      console.log(response.data);
      setWeatherData(
        {
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_min: response.data.main.temp_min,
          temp_max: response.data.main.temp_max,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
      });
      setDataLoaded(true);
    });
  };
  return (
    <div className="App" style={myStyle}>
     <h1>Weather API - Current WorldWide Weather</h1>
    <div className="inputs">
     <input className="weather-input" type="text" placeholder='type in a city' onChange={(e) =>{
       setCity(e.target.value)
     }}/>
     <button className="weather-btn" onClick={searchWeather}>Search</button>
    </div>
    <div className="displayData">
      {dataLoaded && (
      <div className="flex-container">
        <div className="flex-child ">
        <h3 className="display">Description:<br/> {weatherData.description}!</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">Temperature:<br/>  {weatherData.temp} º</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">Min Temperature:<br/>  {weatherData.temp_min} º</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">Max Temperature:<br/>  {weatherData.temp_max} º</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">Humidity:<br/>  {weatherData.humidity} %</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">Sunrise:<br/>  {weatherData.sunrise}</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">SunSet:<br/>  {weatherData.sunset}</h3>
        </div>
        <div className="flex-child">
        <h3 className="display">Country:<br/>  {weatherData.country}</h3>
        </div>
      </div>
      )}
    </div>
    </div>
  );
}
export default App;
