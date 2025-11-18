import {
	getCountryDataByName,
	getCountryDataByCapital,
} from "./restCountriesAPI.js";
import { getPublicIP, getLocationByIP } from "./ipToLocationAPI.js";

const inputCountryEl = document.getElementById("input-country");
const inputCapitalEl = document.getElementById("input-capital");
const btnSecrchEl = document.getElementById("button-search");
const btnLocateEl = document.getElementById("button-locate");
const countryContainerEl = document.getElementById("country-data");
const mapContainerEl = document.getElementById("map");

const ipLocationContainer = document.getElementsByClassName("ip-location");

const updateUI = function (name, searchType) {
	if (searchType === "capital") {
		const data = getCountryDataByCapital(name);
	} else if (searchType === "country") {
		const data = getCountryDataByName(name);
		console.log(data);
	}
};

const searchByUserInput = function () {
	inputCapitalEl.value && updateUI(inputCapitalEl.value, "capital");
	inputCountryEl.value && updateUI(inputCountryEl.value, "country");
};
const searchByIP = function () {};

//Event Listeners
btnLocateEl.addEventListener("click", searchByIP);
btnSecrchEl.addEventListener("click", searchByUserInput);

inputCountryEl.addEventListener("focus", () => {
	inputCapitalEl.value = "";
});
inputCapitalEl.addEventListener("focus", () => {
	inputCountryEl.value = "";
});
