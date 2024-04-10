// Handles changes in time zone selection, managing time zone array and updating UI
function onTimezoneChange(event) {
  // Guess time zone if 'current' selected, else use selected value
  if (event.target.value.length > 0) {
    let newTimezone = event.target.value;
    if (newTimezone === "current") {
      newTimezone = moment.tz.guess();
    }

    // Move current to additional time zones, remove duplicates, limit to 5
    additionalTimezones.unshift(currentCityTimezone);
    additionalTimezones = additionalTimezones.filter(
      (tz) => tz !== newTimezone
    );
    currentCityTimezone = newTimezone;
    if (additionalTimezones.length > 5) {
      additionalTimezones.pop();
    }

    // Update UI components with new time zone information
    updateMainCityCard(currentCityTimezone);
    updateAdditionalCityCards();
  }
}

// Updates the main city card with the current time zone information
function updateMainCityCard(timezone) {
  titleElement.innerHTML = timezone.replace("_", " ").split("/")[1];
  timeElement.innerHTML = moment.tz(timezone).format("HH:mm");
  tzcodeElement.innerHTML = moment.tz(timezone).zoneAbbr();
  dateElement.innerHTML = moment.tz(timezone).format("dddd Do MMMM YYYY");
  setTheme();
}

// Loops through additional time zones and updates their displays
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

// Continuously updates the time display for the main and additional city cards
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

// Sets the page theme based on the current hour in the selected time zone
function setTheme() {
  let hour = parseInt(moment.tz(currentCityTimezone).format("HH"));
  let theme;
  switch (true) {
    case hour >= 6 && hour < 12:
      theme = "morning";
      break;
    case hour >= 12 && hour < 18:
      theme = "afternoon";
      break;
    case hour >= 18 && hour < 22:
      theme = "evening";
      break;
    case hour >= 22 || hour < 6:
      theme = "night";
      break;
    default:
      theme = "morning";
  }
  document.body.className = theme;
}

// Initialisation of the main variables and event listeners

let currentCityTimezone = "Europe/London"; //Default current timezone
let additionalTimezones = [
  "Asia/Tokyo",
  "America/New_York",
  "Asia/Dubai",
  "Europe/Paris",
]; //Default additional timezones

const mainCityCard = document.querySelector(".city-card.main");
const titleElement = mainCityCard.querySelector(".city-title");
const timeElement = mainCityCard.querySelector(".city-time");
const tzcodeElement = mainCityCard.querySelector(".tz-code");
const dateElement = mainCityCard.querySelector(".city-date");

let additionalCityCards = document.querySelectorAll(".additional");

const citySelectElement = document.querySelector("#city-select");
citySelectElement.addEventListener("change", onTimezoneChange);

// Initial update of the UI with the default time zone
updateMainCityCard(currentCityTimezone);
updateAdditionalCityCards();

// Starts the interval to continuously update the time every second
setInterval(updateTime, 1000);
