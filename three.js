const weatherForm = document.querySelector(".weather");
const cityInput = document.querySelector(".city");
const card = document.querySelector(".card");
const apiKey = "bb23279dfae4bff8d93fb5ebf7e0e01e";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const cityName = cityInput.value;
    if (cityName) {
        try {
            const weatherData = await getWeatherData(cityName);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            displayError("Error fetching weather data. Please try again later.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Weather data not found");
    }
    const data = await response.json();
    return data;
}

function displayWeatherInfo(data) {
    const cityDisplay = document.querySelector(".cityDisplay");
    const tempDisplay = document.querySelector(".tempDisplay");
    const weatherEmoji = document.querySelector(".weatherEmoji");
    const descDisplay = document.querySelector(".descDisplay");
    cityDisplay.textContent = data.name;
    tempDisplay.textContent = `${data.main.temp}°C`;
    descDisplay.textContent = data.weather[0].description;
    weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);
    card.style.display = "flex";
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId < 300) {
        return "⛈"; 
    } else if (weatherId >= 300 && weatherId < 500) {
        return "🌧"; 
    } else if (weatherId >= 500 && weatherId < 600) {
        return "🌧";
    } else if (weatherId >= 600 && weatherId < 700) {
        return "❄";
    } else if (weatherId >= 700 && weatherId < 800) {
        return "🌫"; 
    } else if (weatherId === 800) {
        return "☀"; 
    } else if (weatherId > 800 && weatherId < 900) {
        return "☁"; 
    } else {
        return "❓"; 
    }
}

function displayError(message) {
    const errorDisplay = document.querySelector(".errorDisplay");
    errorDisplay.textContent = message;
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
