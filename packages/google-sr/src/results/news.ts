// Importing the Selectors from google-sr-selectors
import { GeneralSelector, NewsSearchSelector } from "google-sr-selectors";
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

export interface NewsResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.NewsResult;
	title: string;
	description: string;
	link: string;
	source: string;
	published_date: string;
	thumbnail_image?: string;
}

/**
 * Parses results from the Google News tab.
 *
 * To use this selector, set the `tbm` query parameter to `'nws'` in the request configuration.
 * This enables results from the dedicated News tab, which is incompatible with other selectors (e.g., OrganicSearchSelector).
 *
 * @example
 *
 * ```ts
 * import { NewsResult, search } from 'google-sr';
 *
 * const results = await search({
 * 	query: 'latest news',
 * 	parsers: [NewsResult],
 * 	requestConfig: {
 * 		queryParams: {
 * 			tbm: 'nws', // Set tbm to nws for news results
 * 		},
 * 	},
 * });
 *
 * @returns Array of NewsResultNode
 */
export const NewsResult: ResultParser<NewsResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("NewsResult");
	const parsedResults: NewsResultNode[] = [];
	const newsSearchBlocks = $(GeneralSelector.block).toArray();
	// parse each block individually for its content
	for (const element of newsSearchBlocks) {
		const rawLink =
			$(element).find(NewsSearchSelector.link).attr("href") ?? null;
		// if not links is found it's not a valid result, we can safely skip it
		if (typeof rawLink !== "string") continue;
		const link = extractUrlFromGoogleLink(rawLink) ?? "";
		if (noPartialResults && isStringEmpty(link)) continue;
		const title = $(element).find(NewsSearchSelector.title).text();
		if (noPartialResults && isStringEmpty(title)) continue;
		const description = $(element).find(NewsSearchSelector.description).text();
		if (noPartialResults && isStringEmpty(description)) continue;
		const source = $(element).find(NewsSearchSelector.source).text() ?? "";
		if (noPartialResults && isStringEmpty(source)) continue;
		const published_date =
			$(element).find(NewsSearchSelector.published_date).text() ?? "";
		if (noPartialResults && isStringEmpty(published_date)) continue;
		const thumbnail_image =
			$(element).find(NewsSearchSelector.thumbnail_image).attr("src") ?? "";

		if (noPartialResults && isStringEmpty(thumbnail_image)) continue;

		parsedResults.push({
			type: ResultTypes.NewsResult,
			link,
			title,
			description,
			source,
			published_date,
			thumbnail_image,
		});
	}

	return parsedResults;
};
