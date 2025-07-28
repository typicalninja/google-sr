import { GeneralSelector, RelatedSearchesSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants.js";
import {
	coerceToStringOrUndefined,
	type PartialExceptType,
	throwNoCheerioError,
} from "../utils.js";

export interface RelatedSearchesResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.RelatedSearchesResult;
	queries: string[];
}

/**
 * Parses related search queries that appear at the bottom of Google search results.
 * This parser extracts the "Related searches" or similar related query suggestions
 * that Google displays to help users refine their search.
 *
 * @example
 * ```ts
 * import { RelatedSearchesResult, search } from 'google-sr';
 * const results = await search({
 * 	query: 'nodejs frameworks',
 * 	parsers: [RelatedSearchesResult],
 * });
 * // results[0].queries might contain: ["express.js", "react.js", ...]
 * ```
 *
 * @returns
 * - If noPartialResults is true, {@link RelatedSearchesResultNode} object
 * - If noPartialResults is false, {@link PartialExceptType}<{@link RelatedSearchesResultNode}> object
 */
export const RelatedSearchesResult: ResultParser<RelatedSearchesResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("RelatedSearchesResult");
	// usually its the last element
	const $relatedBlock = $(GeneralSelector.block).last();
	const $relatedQueries = $relatedBlock.find(
		RelatedSearchesSelector.query_item,
	);
	const queries = [];
	for (const query of $relatedQueries) {
		const $el = $(query);
		const text = coerceToStringOrUndefined(
			$el.find(RelatedSearchesSelector.text).text(),
		);
		if (text) {
			queries.push(text);
		}
	}

	if (noPartialResults && !queries.length) return null;

	return {
		type: ResultTypes.RelatedSearchesResult,
		queries,
	} as RelatedSearchesResultNode;
};
