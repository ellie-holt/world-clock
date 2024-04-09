function onTimezoneChange(event) {
  if (event.target.value.length > 0) {
    let newTimezone = event.target.value;
    if (newTimezone === "current") {
      newTimezone = moment.tz.guess();
    }
    additionalTimezones.unshift(currentCityTimezone);

    additionalTimezones = additionalTimezones.filter(
      (tz) => tz !== newTimezone
    );
    currentCityTimezone = newTimezone;

    if (additionalTimezones > 5) {
      additionalTimezones.pop();
    }

    updateMainCityCard(currentCityTimezone);
    updateAdditionalCityCards();
  }
}

function updateMainCityCard(timezone) {
  titleElement.innerHTML = timezone.replace("_", " ").split("/")[1];
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm");
  tzcodeElement.innerHTML = moment.tz(timezone).zoneAbbr();
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
  "Asia/Tokyo",
  "America/New_York",
  "Asia/Dubai",
  "Europe/Paris",
]; //Default additional timezones

let mainCityCard = document.querySelector(".city-card.main");
let titleElement = mainCityCard.querySelector(".city-title");
let timeElement = mainCityCard.querySelector(".city-time");
let tzcodeElement = mainCityCard.querySelector(".tz-code");
let dateElement = mainCityCard.querySelector(".city-date");

let additionalCityCards = document.querySelectorAll(".additional");

let citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", onTimezoneChange);

updateMainCityCard(currentCityTimezone);
updateAdditionalCityCards();
setInterval(updateTime, 1000);

/*WHAT I WANT TO DO: have it so the shifting cards 
do not repeat cities, maybe get cards to appear and 
so start with a smaller number of cards and inject the HTML -
may have to put DOM manipulation back into functions for this,
get it so many more cities can be selected with the select, 
style select element, redo styling to make mroe readable,
themes for times? basically a CSS overhaul...*/
