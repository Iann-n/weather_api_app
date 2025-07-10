import { fetchWeatherData } from './api.js';
import { displayWeather } from './display.js';
import './input.css'
let response = await fetchWeatherData('Malaysia');
console.log(response);
displayWeather(response);


