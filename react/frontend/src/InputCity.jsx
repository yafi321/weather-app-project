import { useState , useEffect} from "react";
import './style/inputCity.css'

const InputCity = ({ updateData }) => {

    let [city, setCity] = useState("");
    const [timeOfDay, setTimeOfDay] = useState("");

    useEffect(() => {
    //When loading the page, 
    // we will retrieve the current time and use it to know which function to call from the server.

        const currentHour = new Date().getHours();


        if (currentHour >= 22) {
            setTimeOfDay("today-tomorrow");
        } else if (currentHour >= 2) {
            setTimeOfDay("today"); 
        } else {
            setTimeOfDay("yesterday-today");
        }
    }, []);


    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            updateData(city, timeOfDay);//function thet update the data on the app state
            setCity("")//Reset the input
        }}>
            <label htmlFor="">City name</label>
            <div className="inputDiv">
                <input type="text" value={city} onChange={(e) => { setCity(e.target.value) }} className="input"/>
                <input type="submit" value="Check"/>
            </div>
        </form>);
}

export default InputCity;