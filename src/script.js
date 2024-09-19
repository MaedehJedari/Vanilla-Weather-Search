function updateWeatherData(response) {
  let tempElement = document.querySelector("#temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#main-city");
  cityElement.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(temperature);
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
