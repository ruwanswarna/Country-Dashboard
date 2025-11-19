import {
	getCountryDataByName,
	getCountryDataByCapital,
} from "./restCountriesAPI.js";
import { getLocationByIP } from "./ipToLocationAPI.js";
import { getWikiTextIntro } from "./wikipediaAPI.js";
import { getMapDataAndRender } from "./mapAPI.js";

const inputCountryEl = document.getElementById("input-country");
const inputCapitalEl = document.getElementById("input-capital");
const btnSecrchEl = document.getElementById("button-search");
const btnLocateEl = document.getElementById("button-locate");
const countryContainerEl = document.getElementById("country-data");
const mapContainerEl = document.getElementById("map");
const mainContainerEl = document.querySelector(".container");

const ipLocationContainer = document.querySelector(".ip-location");

const renderCountry = function (data, textIntro) {
	const html = `<div class="col-left">
					<h2 id="countryName">${data.name.common}</h2>
					<div id="flagWrap">
						<img id="flag" src=">${data.flags.png}" alt="flag" />
					</div>
					<p>${data.region}/ ${data.subregion}<br>
                    Area: ${data.area} km<sup>2</sup><br>
                    Capital: ${data.capital.join(", ")}<br>
                    Population: ${data.population}<br>
                    Currency: ${Object.values(data.currencies)
											.map((cur) => `${cur.symbol} / ${cur.name}`)
											.join(", ")}<br>
                    Languages: ${Object.values(data.languages).join(", ")}<br>
                    Timezones: ${data.timezones.join(", ")}
                    </p>
				    </div>
                    <div class="col-right">
					<p id="basicInfo">${textIntro}</p>
					<div id="meta"></div>
				    </div>
                    `;

	countryContainerEl.innerHTML = "";
	countryContainerEl.insertAdjacentHTML("beforeend", html);
	mainContainerEl.style.opacity = 1;
};
const displayIPAndLoc = function (country, city, ipAddress) {
	const html = `<p>IP Adderss: ${ipAddress}<br />Device location: ${city}, ${country}</p>`;
	ipLocationContainer.innerHTML = "";
	ipLocationContainer.insertAdjacentHTML("beforeend", html);
};

const updateUI = async function (name, searchType, city, ipAddress) {
	let countryData;
	try {
		city && ipAddress && displayIPAndLoc(name, city, ipAddress);
		if (searchType === "capital") {
			[countryData] = await getCountryDataByCapital(name);
		} else if (searchType === "country") {
			[countryData] = await getCountryDataByName(name);
		}
		const textIntro = await getWikiTextIntro(name);
		const { latlng, cca3, borders } = countryData;
		const countryName = countryData.name.common;
		console.log(countryData);
		console.log(latlng, cca3, borders);
		renderCountry(countryData, textIntro);
		getMapDataAndRender(latlng, countryName, cca3, borders);
	} catch (err) {
		console.error(err);
	}
};

const searchByUserInput = function () {
	inputCapitalEl.value && updateUI(inputCapitalEl.value, "capital");
	inputCountryEl.value && updateUI(inputCountryEl.value, "country");
};
const searchByIP = async function () {
	try {
		const { city, country, query: ipAddress } = await getLocationByIP();
		updateUI(country, "country", city, ipAddress);
	} catch (err) {
		throw err;
	}
};

//Event Listeners
btnLocateEl.addEventListener("click", searchByIP);
btnSecrchEl.addEventListener("click", searchByUserInput);

inputCountryEl.addEventListener("focus", () => {
	inputCapitalEl.value = "";
});
inputCapitalEl.addEventListener("focus", () => {
	inputCountryEl.value = "";
});
