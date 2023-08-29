/* eslint-disable */
const button = document.querySelector(".submit");

button.addEventListener("click",() => {
    clearPreviousInput();
    getLocationData();
})

function clearPreviousInput() {
    const cityName = document.querySelector(".locationName");
    const temperature = document.querySelector(".temperature");
    const icon = document.querySelector(".weatherIcon");

    if (cityName) {
        cityName.remove();
    }
    if (temperature) {
        temperature.remove();
    }
    if (icon) {
        icon.remove();
    }
}

function getLocationData() {
    const location = document.getElementById("location").value;
    const metric = document.querySelector('input[name="temperature"]:checked').value;
    console.log(metric)
    getWeather(location,metric);
}

async function drawWeatherIcon(icon) {
    const weatherInfoDiv = document.querySelector(".weatherInfo");
    const weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("class","weatherIcon");
    
    weatherIcon.src = icon;
    weatherInfoDiv.appendChild(weatherIcon);

}

async function getWeather(loc,met){
    const location = loc;
    const metric = met;

    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=6adbcea9ac0a446da6170610232708&q=${location}`);
        const data = await response.json();
        const cityName = data.location.name;
        const weatherIcon = data.current.condition.icon;
        console.log(data);

        let tempValue;
        if (metric === "temp_c") {
            tempValue = data.current.temp_c + " celsius";
        } else if (metric === "temp_f") {
            tempValue = data.current.temp_f + " fahrenheit";
        }
        
        drawWeatherIcon(weatherIcon);
        drawWeather(tempValue,cityName);
        }

    catch {
        console.log("ERROR")
    }
}

function drawWeather(temperature,loc){
    const weatherInfo = document.querySelector(".weatherInfo")
    const temp = document.createElement("div");
    temp.setAttribute("class","temperature");
    temp.textContent = temperature;

    const location = loc;
    const locationDiv = document.createElement("div");
    locationDiv.setAttribute("class","locationName");
    locationDiv.textContent =  location
    weatherInfo.appendChild(locationDiv);

    weatherInfo.appendChild(temp);
}