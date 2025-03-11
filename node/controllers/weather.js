

import fetchWeather from "../utils/apiClient.js";

// A function that Only brings today's weather.
export const getTodayWeather = async (req, res) => {
    let city = req.query.city;
    if (!city) {
        return res.status(400).json({ title: "bad request", message: "city parameter is required" });
    }

    try {
        let data = await fetchWeather(city, 1); 
        if (!data || data.error) {
            return res.status(500).json({ title: "not found", message: `weather data for ${city} not found` });
        }
        return res.json(data);
    } catch (err) {
        res.status(500).json({ title: "error cannot get weather", message: "something went wrong" });
    }
};

// A function that Brings today + tomorrow
export const getTodayAndTomorrowWeather = async (req, res) => {
    let city = req.query.city;
    if (!city) {
        return res.status(400).json({ title: "bad request", message: "city parameter is required" });
    }

    try {
        let data = await fetchWeather(city, 2);
        if (!data || data.error) {
            return res.status(404).json({ title: "not found", message: `weather data for ${city} not found` });
        }
        return res.json(data);
    } catch (err) {
        res.status(500).json({ title: "error cannot get weather", message: "something went wrong" });
    }
};

// A function that Brings yesterday + today
export const getYesterdayAndTodayWeather = async (req, res) => {
    let city = req.query.city;
    if (!city) {
        return res.status(400).json({ title: "bad request", message: "city parameter is required" });
    }

    try {
        let data = await fetchWeather(city, 1); 
        let yesterdayData = await fetchWeather(city, "yesterday"); 

        if (!data || data.error || !yesterdayData || yesterdayData.error) {
            return res.status(404).json({ title: "not found", message: `weather data for ${city} not found` });
        }

        return res.json({
           ...data,
            yesterday: yesterdayData
        });
    } catch (err) {
        res.status(500).json({ title: "error cannot get weather", message: "something went wrong" });
    }
};
