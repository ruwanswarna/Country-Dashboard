export const getLocationByIP = async function () {
	try {
		// Fetch IP and location
		const res = await fetch("https://ipapi.co/json/");
		const data = await res.json();

		const city = data.city;
		const country = data.country_name;
		const query = data.ip;

		return { city, country, query };
	} catch (err) {
		console.error("Failed to get location:", err);
		throw err;
	}
};
