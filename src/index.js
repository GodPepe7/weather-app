/* eslint-disable no-undef */
import fetchWeatherData from "./fetchWeatherData";

// eslint-disable-next-line no-undef
const locationInput = document.querySelector(".head__location-input");
const enterBtn = document.querySelector(".enter-btn");

const getWeather = async () => {
  const query = locationInput.value;
  const weatherData = await fetchWeatherData(query);
  console.log(weatherData);
};
enterBtn.addEventListener("click", getWeather);
