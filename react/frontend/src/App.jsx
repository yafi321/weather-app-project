import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getTodayAndTomorrowWeather, getTodayWeather, getYesterdayAndTodayWeather} from "./api/weatherService.js"
import InputCity from './InputCity'
import WeatherDisplay from './WeatherDisplay.jsx'
import "./style/App.css"
import Details from './Details.jsx'

function App() {
  let [dataWeather, setDataWeather] = useState(null);//Saving data in the state
  let [error , setError] = useState(null)
  
  function ChangeFormatDay(date1) {//A function that accepts a date string and converts it to a different format
    let date = new Date(date1);

    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    let hour = String(date.getHours()).padStart(2, '0');
    let minute = String(date.getMinutes()).padStart(2, '0');


    let formattedDate = `${day}/${month}/${year} at ${hour}:${minute}`;
    return formattedDate;

}


function updateData(city, type = "today") {
  //A function that receives a city and a function type,
  //  calls the helper function that retrieves the data from the server accordingly,
  //  and updates the state.
  let fetchFunction;

  switch (type) {
      case "today":
          fetchFunction = getTodayWeather;
          break;
      case "today-tomorrow":
          fetchFunction = getTodayAndTomorrowWeather;
          break;
      case "yesterday-today":
          fetchFunction = getYesterdayAndTodayWeather;
          break;
      default:
          console.error("Invalid type for fetching weather data");
          return;
  }

  fetchFunction(city).then(res => {
      if (res.success) {
          setDataWeather(res.data);
          setError(null);
      } else {
          setError(res.error);
          setDataWeather(null);
      }
  });
}


  return (
    <div className='container'>
    <div className='inputCity'>
      <img src="public/logo.svg" alt="fintek-logo"  style={{marginTop: "10px"}}/>
      <h1 className='appH1'>Use our weather app <br />to see the weather <br />
       around the world</h1>
       
      <InputCity updateData={updateData}></InputCity>
      </div>
<div className='weatherDisplay'>
      <WeatherDisplay data={dataWeather} ChangeFormatDay={ChangeFormatDay} error ={error}></WeatherDisplay></div>
      <Details data={dataWeather} ChangeFormatDay={ChangeFormatDay} className="details"></Details>
    </div>
  )
}

export default App
