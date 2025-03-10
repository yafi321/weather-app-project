import { useState, useEffect } from "react";
import "./style/WeatherDisplay.css";

const WeatherDisplay = ({ data, ChangeFormatDay, error }) => {
    let [currentHour, setCurrentHour] = useState(new Date().getHours());
    let [arrHour, setArrHour] = useState([]);
    let [dateChange, setDateChange] = useState("");


    useEffect(() => {////We will only handle the time array if valid data was returned from the server.
        if (!data) return;
        const forecastDays = data.forecast.forecastday;
        const todayIndex = 0; 
        const todayHours = forecastDays[todayIndex].hour;

        let hoursToShow = [];
        let startHour = currentHour - 2;
        let endHour = currentHour + 2;
    // Handling the case where data from the previous day needs to be brought in
        if (startHour < 0) {
            const yesterdayHours = data.yesterday.forecast.forecastday[0]?.hour;
            hoursToShow = [...yesterdayHours.slice(24 + startHour), ...todayHours.slice(0, endHour + 1)];
            // Handling the case where data needs to be brought in from the next day
        } else if (endHour >= 24) {
            const tomorrowHours = forecastDays[todayIndex + 1]?.hour || [];
            hoursToShow = [...todayHours.slice(startHour, 24), ...tomorrowHours.slice(0, endHour - 23)];
            // Normal mode where all data is from the current day
        } else {
            hoursToShow = todayHours.slice(startHour, endHour + 1);
        }

        setArrHour(hoursToShow);
        setDateChange(ChangeFormatDay(data.location.localtime));
    }, [data, currentHour]);

    if (error) return <h1 className="error">{error.message}</h1>;

    if (!data) return null;//If there is no data, return null.


    const { location, current } = data

    return (
        <div className="weather-container">
            <h2 className="city-name">{location.region}</h2>
            <p className="country-name">{location.country}</p>
            <p className="date-time">{dateChange.slice(0, -2)}00</p>

            <h1 className="current-temp">{Math.round(current.temp_c)}°</h1>
            <h2 className="weather-description">{current.condition.text}</h2>

            <div className="weather-details">
                <div className="detail-box">
                    <p className="detail-title">precipitation</p>
                    <p className="detail-value">{current.precip_mm} mm</p>
                </div>

                <div className="detail-box">
                    <p className="detail-title">humidity</p>
                    <p className="detail-value">{current.humidity}%</p>
                </div>

                <div className="detail-box">
                    <p className="detail-title">wind</p>
                    <p className="detail-value">{current.wind_kph} km/h</p>
                </div>
            </div>

            <div className="hourly-forecast">
                {arrHour.map((item, index) => (
                    <div key={index} className="hour-box">
                        <p className="hour-time">{item.time.slice(-5)}</p>
                        <p className="hour-temp">{Math.round(item.temp_c)}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherDisplay;