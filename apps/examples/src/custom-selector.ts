/**
 * This example shows how to use a custom selector to parse the raw html for results
 * This should only be used for testing purposes
 */

import {
	// little helper to create a type for the result node (optional)
	type ResultNodeTyper,
	type ResultSelector,
	search,
} from "google-sr";

type CustomResultNode = ResultNodeTyper<"CUSTOM", "title"> & {
	examples: string[];
};

/*
Or without the type helper:

interface CustomResultNode {
	type: 'CUSTOM'
	title: string
	examples: string[]
}
*/

const customSelector: ResultSelector<CustomResultNode> = () => {
	return {
		type: "CUSTOM",
		title: "Some title",
		examples: ["example1", "example2"],
	};
};

const results = await search({
	query: "hello",
	resultTypes: [customSelector],
});

console.log(results[0]);
