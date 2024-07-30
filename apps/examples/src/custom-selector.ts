/**
 * This example shows how to use a custom selector to parse the raw html for results
 * This should only be used for testing purposes
 */

import {
	type OrganicResultNode,
	type ResultSelector,
	ResultTypes,
	search,
} from "google-sr";

const customSelector: ResultSelector<OrganicResultNode> = () => {
	return {
		type: ResultTypes.OrganicResult,
		title: "Some title",
		link: "Some link",
		description: "Some description",
	};
};

const results = await search({
	query: "hello",
	resultTypes: [customSelector],
});

console.log(results);
