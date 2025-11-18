
export const getLocationByIP = async function () {
	let url = `https://ipv4.seeip.org/jsonip`;

	const res1 = await fetch(url);
	const { ip } = await res1.json();
	console.log(ip);
	const res2 = await fetch(`http://ip-api.com/json/${ip}`);
	const data = await res2.json();
	console.log(data);
	const { city, country, query } = data;
	return { city, country, query };
};
