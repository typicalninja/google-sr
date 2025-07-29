import { load } from "cheerio";
import type {
	ResultParser,
	SearchOptions,
	SearchOptionsWithPages,
} from "./constants.js";
import { OrganicResult } from "./results/index.js";
import {
	prepareRequestConfig,
	type SearchResultTypeFromParser,
	safeGetFetch,
} from "./utils.js";

/**
 * Performs a Google search and returns parsed results from a single page.
 *
 * This is the main search function for single-page searches. It accepts various parsers
 * to extract different types of results (organic results, news, translations, etc.).
 *
 * @example
 * ```ts
 * import { search, OrganicResult } from 'google-sr';
 *
 * const results = await search({
 * 	query: 'nodejs tutorial',
 * 	// Configure the parsers you want
 * 	parsers: [OrganicResult],
 * 	noPartialResults: true
 * });
 * ```
 *
 * @param searchOptions - Configuration options for the search
 * @returns Promise that resolves to an array of parsed search results
 * @throws {TypeError} When searchOptions is not provided or is invalid
 */
export async function search<R extends ResultParser, N extends boolean = false>(
	searchOptions: SearchOptions<R, N>,
): Promise<SearchResultTypeFromParser<R, N>[]> {
	if (!searchOptions || typeof searchOptions !== "object") {
		throw new TypeError(
			`Search options must be provided. Received ${typeof searchOptions}`,
		);
	}

	const requestConfig = prepareRequestConfig(searchOptions);
	const response = await safeGetFetch(requestConfig);
	// we use the utility function to decode the data with the correct charset
	const data = await response.text();
	const cheerioApi = load(data);
	// use the provided parsers or the default one (OrganicResult)
	const parsers = searchOptions.parsers || [OrganicResult];
	let searchResults: SearchResultTypeFromParser<R, N>[] = [];
	// Iterate over each parser to call it with the cheerioApi and concatenate the results
	for (const parser of parsers) {
		const result = parser(
			cheerioApi,
			Boolean(searchOptions.noPartialResults),
		) as SearchResultTypeFromParser<R, N>;
		// Result must be flattened to a single array
		if (result) searchResults = searchResults.concat(result);
	}

	return searchResults;
}

/**
 * Performs a Google search across multiple pages and returns parsed results.
 *
 * This function efficiently searches multiple pages by reusing the same parsers
 * and request configuration. Results are returned as a 2D array where each
 * sub-array contains results from one page.
 *
 * @example
 * ```ts
 * import { searchWithPages, OrganicResult } from 'google-sr';
 *
 * // Search first 3 pages
 * const results = await searchWithPages({
 * 	query: 'machine learning',
 * 	parsers: [OrganicResult],
 * 	pages: 3, // Will search pages 0, 10, 20
 * 	delay: 1000 // 1 second delay between requests
 * });
 *
 * // Search specific pages
 * const specificResults = await searchWithPages({
 * 	query: 'react hooks',
 * 	parsers: [OrganicResult],
 * 	pages: [0, 20, 40], // Search pages 1, 3, and 5
 * });
 * ```
 *
 * @param options - Configuration options for the multi-page search
 * @returns Promise that resolves to a 2D array where each sub-array contains results from one page
 * @throws {TypeError} When options is not provided or pages parameter is invalid
 */
export async function searchWithPages<
	R extends ResultParser = typeof OrganicResult,
	N extends boolean = false,
>(
	options: SearchOptionsWithPages<R, N>,
): Promise<SearchResultTypeFromParser<R, N>[][]> {
	if (!options)
		throw new TypeError(
			`Search options must be provided. Received ${typeof options}`,
		);
	if (typeof options.pages !== "number" && !Array.isArray(options.pages))
		throw new TypeError(
			`Page must be a number or an array of numbers. Received ${typeof options.pages}`,
		);

	// instead of using the above search() function,
	// we must reimplement it in order to make it efficient, since it will call same function for each page unnecessarily
	const searchResults: SearchResultTypeFromParser<R, N>[][] = [];
	const pages = Array.isArray(options.pages)
		? options.pages
		: Array.from({ length: options.pages }, (_, i) => i * 10);
	const baseRequestConfig = prepareRequestConfig(options);
	const parsers = options.parsers || [OrganicResult];
	const delay = options.delay ?? 1000;

	for (const page of pages) {
		// params is guaranteed to be a URLSearchParams
		// setting it here should be fine
		(baseRequestConfig.queryParams as URLSearchParams).set(
			"start",
			String(page),
		);
		const response = await safeGetFetch(baseRequestConfig);
		// we use the utility function to decode the data with the correct charset
		const data = await response.text();
		const cheerioApi = load(data);
		let pageResults: SearchResultTypeFromParser<R, N>[] = [];
		for (const parser of parsers) {
			const result = parser(
				cheerioApi,
				Boolean(options.noPartialResults),
			) as SearchResultTypeFromParser<R, N>;
			// Result must be flattened to a single array
			if (result) pageResults = pageResults.concat(result);
		}

		searchResults.push(pageResults);

		// Add delay after processing each page (except the last one)
		if (page !== pages[pages.length - 1] && delay > 0) {
			await new Promise((resolve) => setTimeout(resolve, delay));
		}
	}

	return searchResults;
}
