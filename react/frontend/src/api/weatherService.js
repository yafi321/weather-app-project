
import axios from "axios";

let baseUrl = "http://localhost:5500/api/weather";


export const getTodayWeather = async (city) => {
    //A function that makes a call to the server and returns today's data.
    try {
        const response = await axios.get(`${baseUrl}/today?city=${city}`, {
            validateStatus: (status) => status < 500 
        });
        return response; 
    } catch (error) {
        return { error: "Something went wrong, please try again later." };
    }
};


export const getTodayAndTomorrowWeather = async (city) => {
    //A function that makes a call to the server and returns today's and tomorrow's data.

    try {
        const response = await axios.get(`${baseUrl}/today-tomorrow?city=${city}`, {
            validateStatus: (status) => status < 500 
        });
        return response; 
    } catch (error) {
        return { error: "Something went wrong, please try again later." };
    }
};


export const getYesterdayAndTodayWeather = async (city) => {
    //A function that makes a call to the server and returns today's and yesterday's data.
    try {
        const response = await axios.get(`${baseUrl}/yesterday-today?city=${city}`, {
            validateStatus: (status) => status < 500 
        });
        return response; 
    } catch (error) {
        return { error: "Something went wrong, please try again later." };
    }
};

