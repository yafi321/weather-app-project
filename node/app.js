import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import weatherRouter from "./routes/weather.js"

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());


app.use("/api/weather", weatherRouter)

let port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0',()=>{
    console.log("app is runinig in port: "+port)
})