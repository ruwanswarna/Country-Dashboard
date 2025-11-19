export const getLocationByIP = async function () {
	let url = `https://ipv4.seeip.org/jsonip`;

	try {
		const res1 = await fetch(url);
		const { ip } = await res1.json();
		const res2 = await fetch(`http://ip-api.com/json/${ip}`);
		const data = await res2.json();
		const { city, country, query } = data;
		return { city, country, query };
	} catch (err) {
		throw err;
	}
};
