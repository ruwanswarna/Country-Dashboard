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

	try {
		const res = await fetch(url);
		const data = await res.json();
		const page = Object.values(data.query.pages)[0];

		// Split extract into paragraphs based on \n
		const paragraphs = page.extract
			.split("\n")
			.map((p) => p.trim())
			.filter((p) => p !== "")
			.map((p) => `<p>${p}<p>`);
		return paragraphs;
	} catch (err) {
		throw err;
	}
};
