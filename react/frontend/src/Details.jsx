import "./style/Details.css"
import { useState, useEffect } from "react";

const Details = ({ data, ChangeFormatDay }) => {
    let [dateChange, setDateChange] = useState("");

    useEffect(() => {//Update date format when updating data
        if (data?.status == 200) {
            setDateChange(ChangeFormatDay(data.data.location.localtime))
        }
    }, [data]);

    

    if (!data || data.status != 200) return null;//If there is no data or an error is returned, return null.


    return (<div className="details">
        <div className="lat-lon">
            <p >latitude: {data.data.location.lat}</p>
            <p >longitude: {data.data.location.lon}</p>
        </div>
        <p className="time">accurate to {dateChange}</p>
    </div>);
}

export default Details;