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
  let start, mid, end;

  if (temperature < 0) {
    start = "#0f172a";
    mid = "#1d4ed8";
    end = "#7dd3fc";
  } else if (temperature < 10) {
    start = "#38bdf8";
    mid = "#7dd3fc";
    end = "#dbeafe";
  } else if (temperature < 20) {
    start = "#c6f6ff";
    mid = "#7dd3fc";
    end = "#34d399";
  } else if (temperature < 30) {
    start = "#a7f3d0";
    mid = "#facc15";
    end = "#f59e0b";
  } else if (temperature < 40) {
    start = "#fcd34d";
    mid = "#fb923c";
    end = "#ef4444";
  } else {
    start = "#f97316";
    mid = "#dc2626";
    end = "#7f1d1d";
  }

  weatherCard.style.setProperty("--gradient-start", start);
  weatherCard.style.setProperty("--gradient-mid", mid);
  weatherCard.style.setProperty("--gradient-end", end);
  weatherCard.style.background = `linear-gradient(135deg, ${start} 0%, ${mid} 52%, ${end} 100%)`;
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
  searchBox.value = "";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});

checkWeather("New York");
