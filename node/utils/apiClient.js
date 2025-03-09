
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchWeather = async (city, days) => {
    //A function that accepts a city and a number of days to retrieve or a "yesterday" value to retrieve yesterday's day 
    // and accordingly returns data from the server.
    try {
        const API_KEY = process.env.WEATHER_API_KEY;

        let url;
        if (days === "yesterday") {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            let formattedYesterday = yesterday.toISOString().split("T")[0];

            url = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=${formattedYesterday}`;
        } else {
            url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}`;
        }

        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.log("error fetching weather data:", err.message);
        return { error: "Weather data could not be retrieved" };
    }
};

export default fetchWeather;
