/* eslint-disable camelcase */
/* eslint-disable no-undef */
import fetchWeatherData from "./fetchWeatherData";

const domController = (() => {
  const locationInput = document.querySelector(".head__location-input");
  const enterBtn = document.querySelector(".enter-btn");
  const overviewLocation = document.querySelector(".overview__location");
  const overviewTemp = document.querySelector(".overview__temp");
  const overviewDate = document.querySelector(".overview__date");
  const days = document.querySelectorAll(".day");
  //   const hours = document.querySelectorAll(".hour");

  const fillOverview = (overviewData) => {
    const { name, country, localtime, temp_c } = overviewData;
    overviewLocation.textContent = `${name}, ${country}`;
    let formattedDate = new Date(localtime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    formattedDate = formattedDate.toLocaleDateString("en-US", options);
    overviewTemp.textContent = `${temp_c}`;
    overviewDate.textContent = `${formattedDate}`;
  };

  const fillDays = (daysData) => {
    daysData.forEach((day, index) => {
      const {
        date,
        maxtemp_c,
        // maxtemp_f,
        mintemp_c,
        // mintemp_f,
        daily_chance_of_rain,
        text,
        icon,
      } = day;
      const dayDiv = days[index];
      const dayWeekdayP = dayDiv.querySelector(".day__date");
      const weekDay = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      dayWeekdayP.textContent = weekDay;
      const dayWeatherIcon = dayDiv.querySelector(".weather-icon");
      dayWeatherIcon.src = icon;
      const dayMaxTempP = dayDiv.querySelector(".day__high");
      dayMaxTempP.textContent = `${maxtemp_c}°C`;
      const dayMinTempP = dayDiv.querySelector(".day__low");
      dayMinTempP.textContent = `${mintemp_c}°C`;
      const conditionP = dayDiv.querySelector(".condition-text");
      conditionP.textContent = text;
      const dayChanceOfRainP = dayDiv.querySelector(".rain-chance");
      dayChanceOfRainP.textContent = `${daily_chance_of_rain}%`;
    });
  };

  const updateScreen = (weatherData) => {
    const { name, region, country, localtime } = weatherData.location;
    const { temp_c, temp_f } = weatherData.current;
    const overviewData = { name, region, country, localtime, temp_c, temp_f };
    fillOverview(overviewData);
    const forecastData = weatherData.forecast.forecastday;
    const daysData = forecastData.map((forecast) => {
      const { date } = forecast;
      const {
        maxtemp_c,
        maxtemp_f,
        mintemp_c,
        mintemp_f,
        daily_chance_of_rain,
      } = forecast.day;
      const { text, icon } = forecast.day.condition;
      return {
        date,
        maxtemp_c,
        maxtemp_f,
        mintemp_c,
        mintemp_f,
        daily_chance_of_rain,
        text,
        icon,
      };
    });
    fillDays(daysData);
  };

  const getWeather = async () => {
    const query = locationInput.value;
    const weatherData = await fetchWeatherData(query);
    updateScreen(weatherData);
  };

  enterBtn.addEventListener("click", getWeather);
})();

export default domController;
