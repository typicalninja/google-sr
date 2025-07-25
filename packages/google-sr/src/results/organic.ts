// Importing the CSS Selectors from google-sr-selectors
import { GeneralSelector, OrganicSearchSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import {
	coerceToStringOrUndefined,
	extractUrlFromGoogleLink,
	type PartialExceptType,
	throwNoCheerioError,
} from "../utils";

export interface OrganicResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.OrganicResult;
	title: string;
	description: string;
	link: string;
	source: string;
	isAd: boolean;
}

/**
 * Parses regular search results.
 * Despite the "organic" in the name, this parser is used for all regular search results **including ads**.
 * It is the most commonly used parser and should be used for most search queries.
 *
 * @example
 * ```ts
 * import { OrganicResult, search } from 'google-sr';
 * const results = await search({
 * 	query: 'google-sr npm package',
 * 	parsers: [OrganicResult],
 * });
 * ```
 *
 * @returns
 * - Array of {@link OrganicResultNode} objects
 * - If noPartialResult is true, Array of {@link PartialExceptType}<{@link OrganicResultNode}> objects
 */
export const OrganicResult: ResultParser<OrganicResultNode> = (
	$,
	noPartialResults,
) => {
	// Check if the user has called the function directly
	// Most likely, they have passed the result of calling the function instead of the function itself
	if (!$) throwNoCheerioError("OrganicResult");
	//
	const parsedResults: PartialExceptType<OrganicResultNode>[] = [];
	const organicSearchBlocks = $(GeneralSelector.block).get();

	for (const element of organicSearchBlocks) {
		// Get a Cheerio instance for the current element
		// This allows us to use Cheerio methods on the element
		const $el = $(element);

		const result_href_link = $el.find(OrganicSearchSelector.link).attr("href");
		// if no link is found it's not a valid result, we can safely skip it
		// most likely the first result can be a special block
		if (typeof result_href_link !== "string") continue;
		const link = coerceToStringOrUndefined(
			extractUrlFromGoogleLink(result_href_link),
		);
		if (noPartialResults && !link) continue;

		const description = coerceToStringOrUndefined(
			$el.find(OrganicSearchSelector.description).text(),
		);
		if (noPartialResults && !description) continue;

		const title = coerceToStringOrUndefined(
			$el.find(OrganicSearchSelector.title).text(),
		);
		if (noPartialResults && !title) continue;

		const metaContainer = $el.find(OrganicSearchSelector.metaContainer);
		const metaSource = coerceToStringOrUndefined(
			metaContainer.find(OrganicSearchSelector.metaSource).text(),
		);
		if (noPartialResults && !metaSource) continue;
		// TODO: during testing, i was unable to find a result that has an ad meta
		// TODO: so this is modeled after what i got from a real browser using the request setup
		// TODO: more data is required to figure out how this works
		const metaAd = coerceToStringOrUndefined(
			metaContainer.find(OrganicSearchSelector.metaAd).text(),
		);

		parsedResults.push({
			type: ResultTypes.OrganicResult,
			link: link,
			description,
			title,
			source: metaSource,
			// since empty value is coerced to undefined
			// we can safely check if the value is empty or not
			isAd: Boolean(metaAd),
		});
	}

	return parsedResults as OrganicResultNode[];
};
