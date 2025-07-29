import type { CheerioAPI } from "cheerio";
import type {
	DictionaryResultNode,
	KnowledgePanelResultNode,
	NewsResultNode,
	OrganicResultNode,
	RelatedSearchesResultNode,
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
	RelatedSearchesResult: "RELATED_SEARCHES",
} as const;

// All possible result types as a union
export type SearchResultNode =
	| OrganicResultNode
	| TranslateResultNode
	| DictionaryResultNode
	| TimeResultNode
	| UnitConversionResultNode
	| KnowledgePanelResultNode
	| NewsResultNode
	| RelatedSearchesResultNode;

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
	 * The search query string to send to Google.
	 */
	query: string;

	/**
	 * Array of result parsers that determine which types of results to extract.
	 *
	 * Each parser processes the HTML response and extracts specific result types.
	 * Using fewer parsers can improve performance.
	 *
	 * @default [OrganicResult] - Only organic results are parsed if not specified
	 */
	parsers?: R[];

	/**
	 * Whether to exclude results with missing or undefined properties.
	 * @default false - Partial results are included.
	 */
	noPartialResults?: N;

	/**
	 * Custom HTTP request configuration for the search request.
	 *
	 * Accepts all standard Fetch API options (headers, method, signal, etc.)
	 * plus additional google-sr specific properties.
	 *
	 * @example
	 * ```ts
	 * requestConfig: {
	 * 	signal: abortController.signal,
	 * 	queryParams: { tbm: 'nws' }, // this is provided by google-sr
	 * }
	 * ```
	 */
	requestConfig?: RequestOptions;
}

/**
 * Configuration options for multi-page search.
 */
export interface SearchOptionsWithPages<
	R extends ResultParser = ResultParser,
	N extends boolean = false,
> extends SearchOptions<R, N> {
	/**
	 * Specifies which pages to search.
	 *
	 * - **Number**: Total pages to search starting from page 1
	 * - **Array**: Specific page offsets to search (0 = page 1, 10 = page 2, etc.)
	 *
	 * Google uses cursor-based pagination with increments of 10.
	 *
	 * @example
	 * ```ts
	 * pages: 3        // Searches pages 1, 2, 3 (offsets: 0, 10, 20)
	 * pages: [0, 20]  // Searches pages 1 and 3 (offsets: 0, 20)
	 * ```
	 */
	pages: number | number[];
	/**
	 * Delay between requests in milliseconds.
	 *
	 * Helps prevent rate limiting by spacing out requests.
	 * Set to 0 to disable delays (not recommended for production).
	 *
	 * @default 1000 - 1 second delay between requests
	 */
	delay?: number;
}

// source text is in the format "hello" in Japanese, we need to select the text between ""
export const TranslateSourceTextRegex = /"(.+?)"/;
// google will use their own link redirect path when you click on a result
// instead of that we can use this to get the direct url
export const GOOGLE_REDIRECT_URL_PARAM_REGEX = /[?&](q|imgurl|url)=([^&]+)/;
export const GOOGLE_SEARCH_URL = "https://www.google.com/search";
