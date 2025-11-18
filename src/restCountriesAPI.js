const formatString = function (str) {
	return str.trim().toLowerCase();
};

export const getCountryDataByName = async function (country) {
	const res = await fetch(
		`https://restcountries.com/v3.1/name/${formatString(country)}`
	);
	const data = await res.json();
	return data;
};
export const getCountryDataByCapital = async function (capital) {
	const res = await fetch(
		`https://restcountries.com/v3.1/capital/${formatString(capital)}`
	);
	const data = await res.json();
	return data;
};
