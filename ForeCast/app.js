// Base URL (reusable everywhere)
const BASEURL = "https://api.open-meteo.com/v1/forecast";

// Grab DOM elements
let userCityInput = document.querySelector("#usercity");
let searchbtn = document.querySelector("#search");
let cityName = document.querySelector("#cityName");
let temperatureDisplay = document.querySelector("#temperature");
let forecastTime = document.querySelector("#forecastTime");


// Helper function to build forecast URL
function buildForecastURL(latitude, longitude) {
  return `${BASEURL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,wind_speed_10m,precipitation,surface_pressure,uv_index`;
}

// Event listener for search button
searchbtn.addEventListener("click", async () => {
  const city = userCityInput.value.trim();
  if (!city) return;

  cityName.textContent = city;
  temperatureDisplay.textContent="🌤 fetching forecast...";
  forecastTime.textContent="";

  try {
    // Step 1: Get latitude & longitude from city name
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      temperatureDisplay.textContent = "City not found!";
      forecastTime.textContent = "";
      return;
    }

    const { latitude, longitude } = geoData.results[0];
     // Step 2: Build forecast URL dynamically
    const forecastURL = buildForecastURL(latitude, longitude);

    // Step 3: Fetch weather data
    const weatherResponse = await fetch(forecastURL);
    const weatherData = await weatherResponse.json();

    // Step 4: Display first hourly forecast
    const time = weatherData.hourly.time[0];
    const temp = weatherData.hourly.temperature_2m[0];
    const wind = weatherData.hourly.wind_speed_10m[0];
    const rain = weatherData.hourly.precipitation[0];;
    const pressure = weatherData.hourly.surface_pressure[0];
    const uv = weatherData.hourly.uv_index[0];
    temperatureDisplay.textContent = `${temp} °C`;
    forecastTime.textContent = `Time: ${time}`;
    setbackground(temp);

    document.getElementById("windp").textContent = `Wind: ${wind} km/h`;
    document.getElementById("rainchasep").textContent = `Rain: ${rain} mm`;
    document.getElementById("pressurep").textContent = `Pressure: ${pressure} hPa`;
    document.getElementById("uvindexp").textContent = `UV Index: ${uv}`;
    
    
  } catch (error) {
    console.error("Error:", error);
    temperatureDisplay.textContent = "Error!";
    forecastTime.textContent = "";
  }
  

});
function setbackground(temp){
    const body = document.body;
    if(temp <=10){
        body.style.background="linear-gradient(to bottom,#00c6ff,#0072ff)";
    }else if(temp >10 && temp <=25){
        body.style.background="linear-gradient(to bottom,#9dd1f1,#f5f7fa)";

    }else if(temp >25 && temp<=35){
        body.style.background="linear-gradient(to bottom,#FFD54F,#FF8A65)";
    }else {
        body.style.background="linear-gradient(to bottom,#ff512f,#dd2476)";
    }

}

    