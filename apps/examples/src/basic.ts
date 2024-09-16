import {
	// import the result types you want
	OrganicResult,
	// helpful to import ResultTypes to filter results
	ResultTypes,
	search,
} from "google-sr";

const queryResult = await search({
	query: "nodejs",
	// OrganicResult is the default, however it is recommended to ALWAYS specify the result type
	resultTypes: [OrganicResult],
});

// will return a SearchResult[]
console.log(queryResult);
console.log(queryResult[0].type === ResultTypes.OrganicResult); // true
