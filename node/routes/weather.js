import { Router } from "express";
import { getTodayWeather, getTodayAndTomorrowWeather, getYesterdayAndTodayWeather } from "../controllers/weather.js";

const weatherRouter = Router();

weatherRouter.get("/today", getTodayWeather);
weatherRouter.get("/today-tomorrow", getTodayAndTomorrowWeather);
weatherRouter.get("/yesterday-today", getYesterdayAndTodayWeather);

export default weatherRouter;
