/**
 * This example shows how to use a custom selector to parse the raw html for results
 * This should only be used for testing purposes
 */

import { type ResultSelector, search } from "google-sr";

interface CustomResultNode {
	type: "CUSTOM";
	title: string;
	examples: string[];
}

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
