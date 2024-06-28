document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weatherForm');
    weatherForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const zipCode = document.getElementById('zipCode').value;
        fetchWeather(zipCode);
    });
});

async function fetchWeather(zipCode) {
    const apiKey = '57adb3e73a2f4a2985c184631242506'; // Replace with your actual WeatherAPI API key
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${zipCode}&days=1`;
    console.log(`Fetching weather data from: ${apiUrl}`); // Log the API URL for debugging

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Weather data not found. Status: ${response.status}, Message: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Weather data:', data); // Log the data for debugging
        displayWeather(data);
    } catch (error) {
        console.error('Error:', error.message);
        alert('Error fetching weather data: ' + error.message);
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    const currentDate = new Date().toLocaleDateString();
    const city = data.location.name;
    const temp = data.current.temp_c; // Current temperature in Celsius
    const conditions = data.current.condition.text; // Current weather condition description

    // Extract forecast data for the first day (index 0)
    const forecast = data.forecast.forecastday[0];
    const tempHi = forecast.day.maxtemp_c; // Max temperature for the day in Celsius
    const tempLo = forecast.day.mintemp_c; // Min temperature for the day in Celsius

    weatherResult.innerHTML = `
        <div class="weather-info">
            <h3>Weather Information</h3>
            <p><strong>Current Date:</strong> ${currentDate}</p>
            <p><strong>City:</strong> ${city}</p>
            <p><strong>Current Temperature:</strong> ${temp} °C</p>
            <p><strong>Conditions:</strong> ${conditions}</p>
            <p><strong>Temperature High/Low:</strong> ${tempHi} °C / ${tempLo} °C</p>
        </div>
    `;
}
