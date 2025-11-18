export const getWikiTextIntro = async function (query) {
	const url =
		`https://en.wikipedia.org/w/api.php?` +
		new URLSearchParams({
			action: "query",
			format: "json",
			prop: "extracts",
			exintro: true,
			explaintext: false,
			titles: query,
			origin: "*",
		});

	const res = await fetch(url);
	const data = await res.json();
	const page = Object.values(data.query.pages)[0];
	console.log(page.extract);
	return page.extract;
};
