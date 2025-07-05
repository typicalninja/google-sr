import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import {
	extractUrlFromGoogleLink,
	isEmpty,
	throwNoCheerioError,
} from "../utils";

// Importing the Selectors from google-sr-selectors
import { GeneralSelector, OrganicSearchSelector } from "google-sr-selectors";

export interface OrganicResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.OrganicResult;
	title: string;
	description: string;
	link: string;
}

/**
 * Parses regular non-ads search results.
 * @returns Array of OrganicSearchResultNodes
 */
export const OrganicResult: ResultSelector<OrganicResultNode> = (
	$,
	noPartialResults,
) => {
	// Check if the user has called the function directly
	// Most likely, they have passed the result of calling the function instead of the function itself
	if (!$) throwNoCheerioError("OrganicResult");

	const parsedResults: OrganicResultNode[] = [];
	const organicSearchBlocks = $(GeneralSelector.block).toArray();

	for (const element of organicSearchBlocks) {
		let link = $(element).find(OrganicSearchSelector.link).attr("href") ?? null;
		const description = $(element)
			.find(OrganicSearchSelector.description)
			.text() as string;
		const title = $(element).find(OrganicSearchSelector.title).text() as string;
		link = extractUrlFromGoogleLink(link);
		// if not links is found it's not a valid result, we can safely skip it
		// most likely the first result can be a special block
		if (typeof link !== "string") continue;
		// both title and description can be empty, we skip the result only if strictSelector is true
		if (isEmpty(noPartialResults, description, title)) continue;

		parsedResults.push({
			type: ResultTypes.OrganicResult,
			link: link,
			description,
			title,
		});
	}

	return parsedResults;
};
