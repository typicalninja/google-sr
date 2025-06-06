/**
 * This example showcase all the available features of google-sr.
 * It is not recommended to use this example in production.
 */

import {
	CurrencyResult,
	DictionaryResult,
	KnowledgePanelResult,
	NewsResult,
	// all available result types
	OrganicResult,
	// type string for node
	ResultTypes,
	TimeResult,
	TranslateResult,
	search,
} from "google-sr";

const results = await search({
	query: "nodejs",
	// In production, there is no need to specify all the result types
	// always try to specify the result types you actually want to use

	// UNLESS the query itself is dynamic and you do not know the result types beforehand
	resultTypes: [
		DictionaryResult,
		TimeResult,
		CurrencyResult,
		TranslateResult,
		OrganicResult,
		KnowledgePanelResult,
		NewsResult,
	],

	// strictSelector ensures that all nodes that are returned has all the required properties
	strictSelector: true,

	// requestConfig is used to send custom request configuration to the request
	requestConfig: {
		queryParams: {
			// enable "safe mode"
			safe: "active",
			// set geo location to US
			gl: "us",
		},
		headers: {
			// set user agent
			"User-Agent": "Let that sink in",
		},
	},
});

console.log(results);

// filter for organic results
const organicResults = results.filter(
	(result) => result.type === ResultTypes.OrganicResult,
);
console.log(organicResults);
