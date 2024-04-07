function onTimezoneChange(event) {
  if (event.target.value.length > 0) {
    currentCityTimezone = event.target.value;
    if (currentCityTimezone === "current") {
      currentCityTimezone = moment.tz.guess();
    }
    updateMainCityCard(currentCityTimezone);
  }
}

function updateMainCityCard(timezone) {
  titleElement.innerHTML = timezone.replace("_", " ").split("/")[1];
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm");
  dateElement.innerHTML = moment.tz(timezone).format("dddd Do MMMM YYYY");
}

function updateAdditionalCityCards() {
  for (let i = 0; i < additionalCityCards.length; i++) {
    if (additionalTimezones[i]) {
      let timezone = additionalTimezones[i];
      additionalCityCards[i].querySelector(".city-title").innerHTML = timezone
        .replace("_", " ")
        .split("/")[1];
      additionalCityCards[i].querySelector(".city-time").innerHTML = moment
        .tz(timezone)
        .format("HH:mm");
      additionalCityCards[i].querySelector(".city-date").innerHTML = moment
        .tz(timezone)
        .format("dddd Do MMMM YYYY");
    }
  }
}

function updateTime() {
  timeElement.innerHTML = moment.tz(currentCityTimezone).format("HH:mm");
  additionalCityCards.forEach((card, index) => {
    if (additionalTimezones[index]) {
      card.querySelector(".city-time").innerHTML = moment
        .tz(additionalTimezones[index])
        .format("HH:mm");
    }
  });
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

let additionalCityCards = document.querySelectorAll(".additional");

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", onTimezoneChange);

updateMainCityCard(currentCityTimezone);
updateAdditionalCityCards();
setInterval(updateTime, 1000);
