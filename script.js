const form = document.getElementById("crop-suggestion-form");
const cropSuggestion = document.getElementById("crop-suggestion");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const provinceInput = document.getElementById("province");
    const province = provinceInput.value.trim();

    if (!province) {
        cropSuggestion.textContent = "Please enter a valid province.";
        return;
    }

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=YOUR_API_KEY&q=${province}&days=7`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Weather data not found for the entered province. Please try again with a valid province.");
            }
            return response.json();
        })
        .then((data) => {
            const forecast = data.forecast.forecastday;
            let suggestion = "";

            // Determine crop suggestion based on temperature
            if (forecast[0].day.maxtemp_c <= 10) {
                suggestion = "Suggested crop: Cabbage";
            } else if (forecast[0].day.maxtemp_c <= 20) {
                suggestion = "Suggested crop: Lettuce";
            } else if (forecast[0].day.maxtemp_c <= 30) {
                suggestion = "Suggested crop: Tomato";
            } else {
                suggestion = "Suggested crop: Corn";
            }

            // Display crop suggestion
            cropSuggestion.textContent = suggestion;
        })
        .catch((error) => {
            cropSuggestion.textContent = "Error fetching weather data: " + error.message;
        });
});
