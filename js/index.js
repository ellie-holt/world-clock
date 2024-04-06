function updateTime(timezone) {
  let time = moment.tz(timezone).format("HH:mm");
  return time;
}

function updateMainCityCard(timezone) {
  let titleElement = mainCityCard.querySelector(".city-title");
  let timeElement = mainCityCard.querySelector(".city-time");
  let dateElement = mainCityCard.querySelector(".city-date");

  titleElement.innerHTML = timezone.replace("_", " ").split("/")[1];
  timeElement.innerHTML = updateTime(timezone);
  dateElement.innerHTML = moment.tz(timezone).format("dddd Do MMMM YYYY");
}

let mainCityCard = document.querySelector(".city-card.main");
let timezone = "Europe/London";

// Update the main city card immediately and then every second
updateMainCityCard(timezone);
setInterval(() => updateMainCityCard(timezone), 1000);
