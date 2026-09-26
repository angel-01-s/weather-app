const apiKey = "913bc97a5bc904a8cfeaca6dca2ca250";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-btn");
const weatherCard = document.querySelector(".weather-card");
const weatherIcon = document.querySelector(".weather-visual img");
const locationElement = document.querySelector(".location");
const temperatureElement = document.querySelector(".temperature");
const statValues = document.querySelectorAll(".meta strong");

const weatherIcons = {
  "01d": "clear.png",
  "01n": "clear.png",
  "02d": "clouds.png",
  "02n": "clouds.png",
  "03d": "clouds.png",
  "03n": "clouds.png",
  "04d": "clouds.png",
  "04n": "clouds.png",
  "09d": "drizzle.png",
  "09n": "drizzle.png",
  "10d": "rain.png",
  "10n": "rain.png",
  "11d": "rain.png",
  "11n": "rain.png",
  "13d": "snow.png",
  "13n": "snow.png",
  "50d": "mist.png",
  "50n": "mist.png"
};

function updateCardGradient(temperature) {
  if (temperature < 10) {
    //  Freezing —
    weatherCard.style.setProperty("--gradient-start", "#243B55");
    weatherCard.style.setProperty("--gradient-mid", "#3A6073");
    weatherCard.style.setProperty("--gradient-end", "#16222A");

  } else if (temperature < 20) {
    // Cool 
    weatherCard.style.setProperty("--gradient-start", "#4B6CB7");
    weatherCard.style.setProperty("--gradient-mid", "#6B8DD6");
    weatherCard.style.setProperty("--gradient-end", "#182848");

  } else if (temperature < 30) {
    //  Comfortable
    weatherCard.style.setProperty("--gradient-start", "#2C7A7B");
    weatherCard.style.setProperty("--gradient-mid", "#4FA3A5");
    weatherCard.style.setProperty("--gradient-end", "#1E4D4F");

  } else if (temperature < 40) {
    // Hot 
    weatherCard.style.setProperty("--gradient-start", "#C77B30");
    weatherCard.style.setProperty("--gradient-mid", "#E09F3E");
    weatherCard.style.setProperty("--gradient-end", "#8F3B2E");

  } else {
    // Very hot 
    weatherCard.style.setProperty("--gradient-start", "#8B2E2E");
    weatherCard.style.setProperty("--gradient-mid", "#C94C4C");
    weatherCard.style.setProperty("--gradient-end", "#5C1F1F");
  }
}




async function checkWeather(city) {
  const trimmedCity = city.trim();

  if (!trimmedCity) {
    return;
  }

  const response = await fetch(`${apiUrl}${trimmedCity}&appid=${apiKey}`);

  if (!response.ok) {
    alert("City not found. Please try another name.");
    return;
  }

  const data = await response.json();
  const temperature = Math.round(data.main.temp);

  locationElement.textContent = data.name;
  temperatureElement.innerHTML = `${temperature}<span>°c</span>`;
  statValues[0].textContent = `${data.main.humidity}%`;
  statValues[1].textContent = `${Math.round(data.wind.speed)} km/h`;
  updateCardGradient(temperature);

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `assets/${weatherIcons[iconCode] || "clouds.png"}`;
  searchBox.value = ""; // Clear search box after successful search
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
