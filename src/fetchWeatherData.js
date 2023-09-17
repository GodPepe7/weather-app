const fetchWeatherData = async (location) => {
  if (!location) return null;
  const API_KEY = "5b7096ab9b684576ae630954231209";
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;
  const response = await fetch(URL, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
};

export default fetchWeatherData;
