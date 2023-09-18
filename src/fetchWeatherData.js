const fetchWeatherData = async (location) => {
  if (!location) return null;
  const API_KEY = "5b7096ab9b684576ae630954231209";
  const URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;
  try {
    const response = await fetch(URL, { mode: "cors" });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
  return null;
};

export default fetchWeatherData;
