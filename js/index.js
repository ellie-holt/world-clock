function onTimezoneChange(event) {
  if (event.target.value.length > 0) {
    currentCityTimezone = event.target.value;
    updateMainCityCard(currentCityTimezone);
  }
}

function updateMainCityCard(timezone) {
  titleElement.innerHTML = timezone.replace("_", " ").split("/")[1];
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm");
  dateElement.innerHTML = moment.tz(timezone).format("dddd Do MMMM YYYY");
}

function updateAdditionalCityCards() {
  let cards = document.querySelectorAll(".additional");
  for (let i = 0; i < cards.length; i++) {
    if (additionalTimezones[i]) {
      let timezone = additionalTimezones[i];
      cards[i].querySelector(".city-title").innerHTML = timezone
        .replace("_", " ")
        .split("/")[1];
      cards[i].querySelector(".city-time").innerHTML = moment
        .tz(timezone)
        .format("HH:mm");
      cards[i].querySelector(".city-date").innerHTML = moment
        .tz(timezone)
        .format("dddd Do MMMM YYYY");
    }
  }
}

function updateTime() {
  timeElement.innerHTML = moment.tz(currentCityTimezone).format("HH:mm");
}

let currentCityTimezone = "Europe/London"; //Default current timezone
let additionalTimezones = [
  "America/New_York",
  "Asia/Tokyo",
  "Europe/Paris",
  "Asia/Seoul",
  "Africa/Nairobi",
  "America/Lima",
]; //Default additional timezones

let mainCityCard = document.querySelector(".city-card.main");
let titleElement = mainCityCard.querySelector(".city-title");
let timeElement = mainCityCard.querySelector(".city-time");
let dateElement = mainCityCard.querySelector(".city-date");

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", onTimezoneChange);

updateMainCityCard(currentCityTimezone);
updateAdditionalCityCards();
setInterval(updateTime, 1000);
