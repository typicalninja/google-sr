import { GeneralSelector, NewsSearchSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants.js";
import {
	coerceToStringOrUndefined,
	extractUrlFromGoogleLink,
	throwNoCheerioError,
} from "../utils.js";

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
 * Parses results from the dedicated News tab in Google Search.
 *
 * To use this selector, set the `tbm` query parameter to `'nws'` in the request configuration.
 *
 * **NOTE: This parser is not compatible with the other parsers and vice versa.**
 *
 * @example
 * ```ts
 * import { NewsResult, search } from 'google-sr';
 *
 * const results = await search({
 * 	query: 'latest news on AI',
 * 	parsers: [NewsResult],
 * 	requestConfig: {
 * 		queryParams: {
 * 			tbm: 'nws', // Set tbm to nws for news results
 * 		},
 * 	},
 * });
 * ```
 *
 * @returns Array of {@link NewsResultNode} objects
 */
export const NewsResult: ResultParser<NewsResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("NewsResult");
	// To satisfy ts this needs to be defined as a Partial
	// warning, while this will validate the properties, it will not validate the types of the properties
	// should not be a huge issue, but be aware of it
	const parsedResults: Partial<NewsResultNode>[] = [];
	const newsSearchBlocks = $(GeneralSelector.block).toArray();
	// parse each block individually for its content
	for (const element of newsSearchBlocks) {
		// Get a Cheerio instance for the current element
		// This allows us to use Cheerio methods on the element
		const $el = $(element);

		const rawLink = $el.find(NewsSearchSelector.link).attr("href");
		// if the link is not a string, we can safely skip it
		// this result is guaranteed to be invalid
		if (typeof rawLink !== "string") continue;
		// extract the actual link from the google link
		// this will return null if the link is not valid
		const link = coerceToStringOrUndefined(extractUrlFromGoogleLink(rawLink));
		if (noPartialResults && !link) continue;

		const title = coerceToStringOrUndefined(
			$el.find(NewsSearchSelector.title).text(),
		);
		if (noPartialResults && !title) continue;

		const description = coerceToStringOrUndefined(
			$el.find(NewsSearchSelector.description).text(),
		);
		if (noPartialResults && !description) continue;

		const source = coerceToStringOrUndefined(
			$el.find(NewsSearchSelector.source).text(),
		);
		if (noPartialResults && !source) continue;

		const published_date = coerceToStringOrUndefined(
			$el.find(NewsSearchSelector.published_date).text(),
		);
		if (noPartialResults && !published_date) continue;

		// thumbnail_image is optional, so we can safely coerce it to a string or undefined
		// and simply add it as is to the result
		const thumbnail_image = coerceToStringOrUndefined(
			$el.find(NewsSearchSelector.thumbnail_image).attr("src"),
		);

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

	// to satisfy ts we need to cast the results to the correct type
	return parsedResults as NewsResultNode[];
};
