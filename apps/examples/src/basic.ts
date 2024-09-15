import {
	DictionaryResult,
	// import the result types you want
	OrganicResult,
	// helpful to import ResultTypes to filter results
	ResultTypes,
	search,
} from "google-sr";

const queryResult = await search({
	query: "nodejs",
	// OrganicResult is the default, however it is recommended to ALWAYS specify the result type
	resultTypes: [OrganicResult, DictionaryResult],
	// to add additional configuration to the request, use the requestConfig option
	// which accepts a AxiosRequestConfig object
	// OPTIONAL
	requestConfig: {
		params: {
			// enable "safe mode"
			safe: "active",
		},
	},
});

// will return a SearchResult[]
console.log(queryResult);
console.log(queryResult[0].type === ResultTypes.OrganicResult); // true
