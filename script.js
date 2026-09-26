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
    // Very cold
    weatherCard.style.setProperty("--gradient-start", "#4facfe");
    weatherCard.style.setProperty("--gradient-mid", "#6dd5ed");
    weatherCard.style.setProperty("--gradient-end", "#2193b0");

  } else if (temperature < 20) {
    // Cool
    weatherCard.style.setProperty("--gradient-start","#a8edea");
    weatherCard.style.setProperty("--gradient-mid", "#fed6e3");
    weatherCard.style.setProperty("--gradient-end", "#ff9a9e");

  } else if (temperature < 30) {
    // Normal / pleasant
    weatherCard.style.setProperty("--gradient-start", "#7bc7b9");
    weatherCard.style.setProperty("--gradient-mid", "#7faed7");
    weatherCard.style.setProperty("--gradient-end", "#7a8dd1");

  } else if (temperature < 40) {
    // Hot
    weatherCard.style.setProperty("--gradient-start", "#f6d365");
    weatherCard.style.setProperty("--gradient-mid", "#fda085");
    weatherCard.style.setProperty("--gradient-end", "#f78ca0");

  } else {
    // Very hot
    weatherCard.style.setProperty("--gradient-start", "#ff512f");
    weatherCard.style.setProperty("--gradient-mid", "#f09819");
    weatherCard.style.setProperty("--gradient-end", "#ff5858");
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
  updateCardGradient();

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `assets/${weatherIcons[iconCode] || "clouds.png"}`;
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

updateCardGradient(temperature);
