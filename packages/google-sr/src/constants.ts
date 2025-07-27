import type { CheerioAPI } from "cheerio";
import type {
	DictionaryResultNode,
	KnowledgePanelResultNode,
	NewsResultNode,
	OrganicResultNode,
	TimeResultNode,
	TranslateResultNode,
	UnitConversionResultNode,
} from "./results/index.js";

export const ResultTypes = {
	OrganicResult: "ORGANIC",
	TranslateResult: "TRANSLATE",
	DictionaryResult: "DICTIONARY",
	TimeResult: "TIME",
	UnitConversionResult: "CONVERSION",
	KnowledgePanelResult: "KNOWLEDGE_PANEL",
	NewsResult: "NEWS",
} as const;

// All possible result types as a union
export type SearchResultNode =
	| OrganicResultNode
	| TranslateResultNode
	| DictionaryResultNode
	| TimeResultNode
	| UnitConversionResultNode
	| KnowledgePanelResultNode
	| NewsResultNode;

export interface RequestOptions extends RequestInit {
	url?: string;
	queryParams?: Record<string, string> | URLSearchParams;
}
export interface SearchResultNodeLike {
	type: string;
}

/**
 * A ResultParser is a function that takes a CheerioAPI instance and returns an array of search result nodes, a single node, or null if no results are found.
 *
 * Note: The return type does not always reflect the actual type that can be returned by the parser.
 *
 * Example: The returned node can also be a PartialExceptType<OrganicResultNode> if noPartialResults is false.
 *
 * **However, to satisfy the type system, always cast the return type to the expected type.**
 *
 * @example
 * ```ts
 * const myCustomParser: ResultParser<MyCustomResultNode> = ($, noPartialResults) => {
 * 	// your parsing logic here
 * 	// make sure to respect the noPartialResults flag
 * 	return {
 * 		// mandatory if returning a result
 * 		type: "MY_CUSTOM_RESULT",
 * 		title: "My Custom Result",
 * 		// usually these are obtained via parsing the html
 * 		// return undefined if noPartialResults is false and the property is not available
 * 		description: undefined,
 * 	} as MyCustomResultNode; // cast to the expected type to satisfy the type system
 * }
 * ```
 */
export type ResultParser<
	R extends SearchResultNodeLike = SearchResultNodeLike,
> = (cheerio: CheerioAPI, noPartialResults: boolean) => R | R[] | null;

/**
 * Search options for single page search
 */
export interface SearchOptions<
	R extends ResultParser = ResultParser,
	N extends boolean = false,
> {
	/**
	 * Search query
	 */
	query: string;
	/**
	 * Control the type of results returned (can have a significant performance impact)
	 */
	parsers?: R[];

	/**
	 * When true, excludes results that have undefined or empty properties.
	 * @default false - Partial results are included.
	 */
	noPartialResults?: N;

	/**
	 * Custom request configuration to be sent with the request
	 */
	requestConfig?: RequestOptions;
}

/**
 * Search options for multiple pages search
 */
export interface SearchOptionsWithPages<
	R extends ResultParser = ResultParser,
	N extends boolean = false,
> extends SearchOptions<R, N> {
	/**
	 * Total number of pages to search or an array of specific pages to search
	 *
	 * google search uses cursor-based pagination.
	 *
	 * Specific page numbers are incremented by 10 starting from 0 (page 1)
	 *
	 * If total number of pages is provided, cursor will be created according to: start = page * 10
	 */
	pages: number | number[];
	/**
	 * Delay between each request in milliseconds. helps to avoid rate limiting issues.
	 *
	 * Default is 1000 ms (1 second). set to 0 to disable delay.
	 */
	delay?: number;
}

// source text is in the format "hello" in Japanese, we need to select the text between ""
export const TranslateSourceTextRegex = /"(.+?)"/;
// google will use their own link redirect path when you click on a result
// instead of that we can use this to get the direct url
export const GOOGLE_REDIRECT_URL_PARAM_REGEX = /[?&](q|imgurl|url)=([^&]+)/;
export const GOOGLE_SEARCH_URL = "https://www.google.com/search";
