const apiKey = "b2ee00e06beb4c0e8a242034251911";
export async function getWeatherAndRender(countryData) {
	const city = countryData.capital[0];
	const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(
		city
	)}&days=7&aqi=no&alerts=no`;

	try {
		const res = await fetch(url);
		const data = await res.json();

		// Current weather
		const currentHtml = ` 
            <h3>${data.location.name}, ${data.location.country}</h3>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>${data.current.condition.text}</p>
            <p>Temperature: ${data.current.temp_c}°C (Feels like ${data.current.feelslike_c}°C)</p>
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} kph</p></div>`;

		// forecast
		let forecastHtml = "";
		data.forecast.forecastday.forEach((day) => {
			forecastHtml += `
                <div class = "forecast-card">
                <p>${day.date}</p>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
                <p>${day.day.condition.text}</p>
                <p>Max: ${day.day.maxtemp_c}°C</p>
                <p>Min: ${day.day.mintemp_c}°C</p>
                </div>`;
		});
		forecastHtml += `</div>`;

		document.getElementById("weather-current").innerHTML = currentHtml;
		document.getElementById("weather-forecast").innerHTML = forecastHtml;
	} catch (err) {
		console.error("Weather fetch error:", err);
		document.getElementById("weatherView").textContent =
			"Unable to fetch weather.";
	}
}
