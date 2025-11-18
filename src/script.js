import {
	getCountryDataByName,
	getCountryDataByCapital,
} from "./restCountriesAPI.js";
import { getLocationByIP } from "./ipToLocationAPI.js";
import { getWikiTextIntro } from "./wikipediaAPI.js";

const inputCountryEl = document.getElementById("input-country");
const inputCapitalEl = document.getElementById("input-capital");
const btnSecrchEl = document.getElementById("button-search");
const btnLocateEl = document.getElementById("button-locate");
const countryContainerEl = document.getElementById("country-data");
const mapContainerEl = document.getElementById("map");

const ipLocationContainer = document.getElementsByClassName("ip-location");

const renderCountry = function (data, textIntro) {
	const htmlTop = `<div class="col-left">
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

				</div>`;
	const htmlBottom = `<div class="col-right">
					    <p id="basicInfo"></p>
					    <div id="meta"></div>
				        </div>`;
	countryContainerEl.innerHTML = "";
	countryContainerEl.insertAdjacentHTML("beforeend", htmlTop);
	countryContainerEl.insertAdjacentHTML("beforeend", htmlBottom);
	document.getElementById("basicInfo").innerHTML = textIntro;
};

const updateUI = async function (name, searchType, city, ipAddress) {
	let countryData;
	city && ipAddress && (ipLocationContainer.innerHTML = ipAddress);
	if (searchType === "capital") {
		[countryData] = await getCountryDataByCapital(name);
	} else if (searchType === "country") {
		[countryData] = await getCountryDataByName(name);
	}
	const textIntro = await getWikiTextIntro(name);
	console.log(countryData);
	renderCountry(countryData, textIntro);
};

const searchByUserInput = function () {
	inputCapitalEl.value && updateUI(inputCapitalEl.value, "capital");
	inputCountryEl.value && updateUI(inputCountryEl.value, "country");
};
const searchByIP = async function () {
	const { city, country, query: ipAddress } = await getLocationByIP();
	updateUI(country,"country", city, ipAddress);
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
