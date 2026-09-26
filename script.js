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
  let colors;

  if (temperature < 10) {
    colors = ["#0F2027", "#203A43", "#2C5364"];
  } else if (temperature < 20) {
    colors = ["#355C7D", "#6C8EBF", "#6DD5FA"];
  } else if (temperature < 30) {
    colors = ["#11998E", "#38EF7D", "#56CCF2"];
  } else if (temperature < 40) {
    colors = ["#F7971E", "#FFD200", "#FF6B6B"];
  } else {
    colors = ["#FF416C", "#FF4B2B", "#FF8C42"];
  }

  weatherCard.style.setProperty("--gradient-start", colors[0]);
  weatherCard.style.setProperty("--gradient-mid", colors[1]);
  weatherCard.style.setProperty("--gradient-end", colors[2]);
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
