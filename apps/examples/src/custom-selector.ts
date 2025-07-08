/**
 * This example shows how to use a custom parser to parse the raw html for results
 * This should only be used for testing purposes
 */

import { type ResultParser, search } from "google-sr";

interface CustomResultNode {
	type: "CUSTOM";
	title: string;
	examples: string[];
}

const customParser: ResultParser<CustomResultNode> = () => {
	return {
		type: "CUSTOM",
		title: "Some title",
		examples: ["example1", "example2"],
	};
};

const results = await search({
	query: "hello",
	parsers: [customParser],
});

console.log(results[0]);
