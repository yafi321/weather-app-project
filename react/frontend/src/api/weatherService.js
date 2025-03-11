
import axios from "axios";

let baseUrl = "http://localhost:5500/api/weather";

const fetchWeatherData = async (url) => {
    //A function that receives a URL makes a call to the server
  //  and returns an object with the call status field, and the data
    try {
        const response = await axios.get(url);
        return { success: true, data: response.data };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data || { title: "Network Error", message: "Something went wrong, please try again later." } 
        };
    }
};

//We will export the various functions
export const getTodayWeather = async (city) => fetchWeatherData(`${baseUrl}/today?city=${city}`);
export const getTodayAndTomorrowWeather = async (city) => fetchWeatherData(`${baseUrl}/today-tomorrow?city=${city}`);
export const getYesterdayAndTodayWeather = async (city) => fetchWeatherData(`${baseUrl}/yesterday-today?city=${city}`);
