let map;
let borderLayer;
let neighborLayer;
export const getMapDataAndRender = async function (
	latlng,
	country,
	cca3,
	borders
) {
	let geoData;
	try {
		// Load global GeoJSON (country shapes)
		const geo = await fetch(
			"https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"
		);
		geoData = await geo.json();
	} catch (err) {
		throw err;
	}
	const countryBorder = geoData.features.find((f) => f.id === cca3);

	// Init map if not created
	if (!map) {
		map = L.map("mapView", { zoomAnimation: true }).setView(latlng, 5);
	}

	// Remove old layers
	if (borderLayer) map.removeLayer(borderLayer);
	if (neighborLayer) map.removeLayer(neighborLayer);

	// Draw Main Country Border
	borderLayer = L.geoJSON(countryBorder).addTo(map);

	// Show Neighbor Countries
	if (borders && borders.length > 0) {
		const neighborBorders = geoData.features.filter((f) =>
			borders.includes(f.id)
		);

		neighborLayer = L.geoJSON(neighborBorders, {
			style: {
				color: "#0077ff",
				weight: 1.5,
				opacity: 0.6,
				fillOpacity: 0.05,
			},
		}).addTo(map);
	}

	// Fit map to selected country
	map.fitBounds(borderLayer.getBounds(), {
		animate: true,
		duration: 1.3,
	});

	// Add tile layer (only once)
	if (!map._tileLayerLoaded) {
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(map);
		map._tileLayerLoaded = true;
	}
};
