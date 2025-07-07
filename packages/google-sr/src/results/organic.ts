// Importing the CSS Selectors from google-sr-selectors
import { GeneralSelector, OrganicSearchSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import {
	extractUrlFromGoogleLink,
	isStringEmpty,
	throwNoCheerioError,
} from "../utils";

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
export const OrganicResult: ResultParser<OrganicResultNode> = (
	$,
	noPartialResults,
) => {
	// Check if the user has called the function directly
	// Most likely, they have passed the result of calling the function instead of the function itself
	if (!$) throwNoCheerioError("OrganicResult");

	const parsedResults: OrganicResultNode[] = [];
	const organicSearchBlocks = $(GeneralSelector.block).get();

	for (const element of organicSearchBlocks) {
		const description = $(element)
			.find(OrganicSearchSelector.description)
			.text();
		if (noPartialResults && isStringEmpty(description)) continue;
		const title = $(element).find(OrganicSearchSelector.title).text();
		if (noPartialResults && isStringEmpty(title)) continue;

		let link = $(element).find(OrganicSearchSelector.link).attr("href") ?? null;
		if (noPartialResults && isStringEmpty(link)) continue;
		link = extractUrlFromGoogleLink(link);
		// if not links is found it's not a valid result, we can safely skip it
		// most likely the first result can be a special block
		if (typeof link !== "string") continue;

		parsedResults.push({
			type: ResultTypes.OrganicResult,
			link: link,
			description,
			title,
		});
	}

	return parsedResults;
};
