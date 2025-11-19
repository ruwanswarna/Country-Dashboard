const formatString = function (str) {
	return str.trim().toLowerCase();
};

export const getCountryDataByName = async function (country) {
	try {
		const res = await fetch(
			`https://restcountries.com/v3.1/name/${formatString(country)}`
		);
		if (!res.ok)
			throw new Error(
				`Country does not exist. Please check the spellings and try again. ${res.status}`
			);
		const data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};
export const getCountryDataByCapital = async function (capital) {
	try {
		const res = await fetch(
			`https://restcountries.com/v3.1/capital/${formatString(capital)}`
		);
		if (!res.ok)
			throw new Error(
				`Not a capital city. Please check the spellings and try again. ${res.status}`
			);
		const data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};
