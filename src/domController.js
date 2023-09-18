/* eslint-disable camelcase */
/* eslint-disable no-undef */
import fetchWeatherData from "./fetchWeatherData";

const domController = (() => {
  const locationInput = document.querySelector(".head__location-input");
  const form = document.querySelector("#target-location-form");
  const overviewLocation = document.querySelector(".overview__location");
  const overviewTemp = document.querySelector(".overview__temp");
  const overviewDate = document.querySelector(".overview__date");
  const days = document.querySelectorAll(".day");
  const hoursBody = document.querySelector(".hours__body");
  const hourTemplate = document.querySelector("#hour-template");
  const tempToggleCheckbox = document.querySelector(".temp-toggle");

  let isCelcius = true;

  const createHourDivs = () => {
    const fragment = document.createDocumentFragment();
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 24; i++) {
      const hourDiv = hourTemplate.content.cloneNode(true);
      fragment.append(hourDiv);
    }
    hoursBody.append(fragment);
  };
  createHourDivs();

  const getDaysData = (weatherData) => {
    const forecastData = weatherData.forecast.forecastday;
    const daysData = forecastData.map((forecast) => {
      const {
        date,
        day: {
          maxtemp_c,
          maxtemp_f,
          mintemp_c,
          mintemp_f,
          daily_chance_of_rain,
          condition: { text, icon },
        },
      } = forecast;
      const minTemp = isCelcius ? `${mintemp_c}°C` : `${mintemp_f}°F`;
      const maxTemp = isCelcius ? `${maxtemp_c}°C` : `${maxtemp_f}°F`;
      return {
        date,
        minTemp,
        maxTemp,
        daily_chance_of_rain,
        text,
        icon,
      };
    });
    return daysData;
  };

  const getHoursData = (weatherData) => {
    const hours = weatherData.forecast.forecastday[0].hour;
    const hoursData = hours.map((hour) => {
      const {
        time,
        temp_c,
        temp_f,
        condition: { icon },
      } = hour;
      const temp = isCelcius ? `${temp_c}°C` : `${temp_f}°F`;
      return { time, temp, icon };
    });
    return hoursData;
  };

  const fillOverview = (overviewData) => {
    const { name, country, localtime, temp } = overviewData;
    overviewLocation.textContent = `${name}, ${country}`;
    let formattedDate = new Date(localtime);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    formattedDate = formattedDate.toLocaleDateString("en-US", options);
    overviewTemp.textContent = `${temp}`;
    overviewDate.textContent = `${formattedDate}`;
  };

  const fillDays = (daysData) => {
    daysData.forEach((day, index) => {
      const { date, minTemp, maxTemp, daily_chance_of_rain, text, icon } = day;
      const dayDiv = days[index];
      const dayWeekdayP = dayDiv.querySelector(".day__date");
      const weekDay = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
      });
      dayWeekdayP.textContent = weekDay;
      const dayWeatherIcon = dayDiv.querySelector(".weather-icon");
      dayWeatherIcon.src = `https:${icon}`;
      const dayMaxTempP = dayDiv.querySelector(".day__high");
      dayMaxTempP.textContent = maxTemp;
      const dayMinTempP = dayDiv.querySelector(".day__low");
      dayMinTempP.textContent = minTemp;
      const conditionP = dayDiv.querySelector(".condition-text");
      conditionP.textContent = text;
      const dayChanceOfRainP = dayDiv.querySelector(".rain-chance");
      dayChanceOfRainP.textContent = `${daily_chance_of_rain}%`;
    });
  };

  const hourDivs = document.querySelectorAll(".hour");
  const fillHours = (hoursData) => {
    hoursData.forEach((hour, index) => {
      const { temp, icon, time } = hour;
      const hourDiv = hourDivs[index];
      const timeInHours = time.split(" ")[1];
      hourDiv.querySelector(".hour__time").textContent = timeInHours;
      hourDiv.querySelector(".weather-icon").src = `https:${icon}`;
      hourDiv.querySelector(".hour__temp").textContent = temp;
    });
  };

  const updateScreen = (weatherData) => {
    const {
      location: { name, region, country, localtime },
      current: { temp_c, temp_f },
    } = weatherData;
    const temp = isCelcius ? `${temp_c}°C` : `${temp_f}°F`;
    const overviewData = { name, region, country, localtime, temp };
    fillOverview(overviewData);

    const daysData = getDaysData(weatherData);
    fillDays(daysData);

    const hoursData = getHoursData(weatherData);
    fillHours(hoursData);
  };

  const getWeather = async (query) => {
    const weatherData = await fetchWeatherData(query);
    if (!weatherData) return;
    tempToggleCheckbox.value = query;
    updateScreen(weatherData);
  };

  const formHandler = (e) => {
    e.preventDefault();
    if (!form.checkValidity()) return;
    const query = locationInput.value;
    getWeather(query);
  };
  form.addEventListener("submit", formHandler);

  function toggleTemp() {
    isCelcius = !isCelcius;
    getWeather(tempToggleCheckbox.value);
  }
  tempToggleCheckbox.addEventListener("click", toggleTemp);

  getWeather("Dong Hoi");
})();

export default domController;
