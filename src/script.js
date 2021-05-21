// Get current day/hour

let date = new Date();
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let weekDay = date.getDay();

let monthDate = date.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let getMonth = date.getMonth();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "September",
  "October",
  "November",
  "December"
];

let day = days[weekDay];

let month = months[getMonth];

let dateElement = document.querySelector("#now-date");
dateElement.innerHTML = `${day} ${month} ${monthDate}, ${hour}:${minutes} `;

// Display Forecast 

function formatDay(timestamp) {

  let date = new Date(timestamp * 1000);

  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return days[day];
}

function displayForecast(response) {

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  forecast.forEach(function(forecastDay, index) {
    
    if(index < 6) {
forecastHTML = forecastHTML + `
 
<div class="col-2">
<div class="forecast-day">${formatDay(forecastDay.dt)}</div>
<img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" alt="" width="50">
<div class="forecast-temperature">
<span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span> 
 <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
 </div>
</div>`;

}

});
  
forecastHTML = forecastHTML + `</div>`;

 forecastElement.innerHTML = forecastHTML;
  
}


// Get Forecast

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "ca96a46b83f0206010d93234cc8d803f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayForecast);
}


// Display Weather

function displayWeather(response) {
  document.querySelector("#city-h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  let mainIcon = document.querySelector("#big-icon");
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

// Default city displayed

function search(city) {
  let apiKey = "ca96a46b83f0206010d93234cc8d803f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

// Search for cities

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}

search("New York");

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

// Get current location

function searchLocation(position) {
  let apiKey = "ca96a46b83f0206010d93234cc8d803f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Convert temperature between Fahrenheit and Celsius

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
