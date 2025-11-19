let map, marker;

export const getMapDataAndRender = async function (countryData) {
	const area = countryData.area;
	const latlng = countryData.latlng;
	// adjust zoom level
	let zoomLevel;
	if (area < 1000) zoomLevel = 12;
	else if (area < 50000) zoomLevel = 8;
	else if (area < 500000) zoomLevel = 4;
	else zoomLevel = 2;

	if (!map) {
		map = L.map("mapView").setView(latlng, zoomLevel);

		// Add tiles once
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(map);
	} else {
		map.setView(latlng, zoomLevel);
	}

	if (marker) {
		marker.remove();
	}

	// Add marker
	marker = L.marker(latlng).addTo(map);
};
