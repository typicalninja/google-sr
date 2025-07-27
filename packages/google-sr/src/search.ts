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

export async function searchWithPages<
	R extends ResultParser = typeof OrganicResult,
	N extends boolean = false,
>(options: SearchOptionsWithPages<R, N>) {
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
	}

	return searchResults;
}
