function updateWeatherData(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#main-city");
  let conditionElement = document.querySelector("#condition");
  let humidityElement = document.querySelector("#humidity");
  let velocityElement = document.querySelector("#velocity");
  let timeElement = document.querySelector("#clock");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather logo" id="icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  velocityElement.innerHTML = `${response.data.wind.speed}km/h`;
  tempElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCityForm(city) {
  let apiKey = "b5f67t0d61o0400c417eac73b698a670";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherData);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCityForm(searchInput.value);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSearch);

searchCityForm("Paris");
