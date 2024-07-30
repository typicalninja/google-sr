import { searchWithPages } from "google-sr";

const results = await searchWithPages({
	query: "hello world",
	pages: 1,
});

console.log(results);
