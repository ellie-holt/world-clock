function getTimezone(event) {
  let timezone = event.target.value;
  currentCityTimezone = timezone;
  getCityName(timezone);
  updateMainCityCard(timezone);
}

function getCityName(timezone) {
  return timezone.replace("_", " ").split("/")[1];
}

function updateMainCityCard(timezone) {
  titleElement.innerHTML = getCityName(timezone);
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm");
  dateElement.innerHTML = moment.tz(timezone).format("dddd Do MMMM YYYY");
}

let mainCityCard = document.querySelector(".city-card.main");
let titleElement = mainCityCard.querySelector(".city-title");
let timeElement = mainCityCard.querySelector(".city-time");
let dateElement = mainCityCard.querySelector(".city-date");

let currentCityTimezone = "Europe/London"; //Default timezone

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", getTimezone);

updateMainCityCard(currentCityTimezone);
setInterval(() => updateMainCityCard(currentCityTimezone), 1000);
