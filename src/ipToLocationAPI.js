export const getPublicIP = function () {
	let url;
	if (ip.includes(".")) url = `https://ipv4.seeip.org/jsonip`;
	else if (ip.includes(":")) url = "https://ipv6.seeip.org/jsonip";
	else {
	}

	fetch(url)
		.then((res) => res.jason())
		.then((data) => {
			console.log(data);
			return data.ip;
		});
};
export const getLocationByIP = function (ip) {
	fetch(`http://ip-api.com/json/${ip}`)
		.then((res) => res.jason())
		.then((data) => console.log(data));
};
