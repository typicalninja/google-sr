import type { CheerioAPI } from "cheerio";
import type {
	CurrencyResultNode,
	DictionaryResultNode,
	KnowledgePanelResultNode,
	NewsResultNode,
	OrganicResultNode,
	TimeResultNode,
	TranslateResultNode,
} from "./results";

export const ResultTypes = {
	OrganicResult: "ORGANIC",
	TranslateResult: "TRANSLATE",
	DictionaryResult: "DICTIONARY",
	TimeResult: "TIME",
	CurrencyResult: "CURRENCY",
	KnowledgePanelResult: "KNOWLEDGE_PANEL",
	NewsResult: "NEWS",
} as const;

// All possible result types as a union
export type SearchResultNode =
	| OrganicResultNode
	| TranslateResultNode
	| DictionaryResultNode
	| TimeResultNode
	| CurrencyResultNode
	| KnowledgePanelResultNode
	| NewsResultNode;

export interface RequestOptions extends RequestInit {
	queryParams?: Record<string, string> | URLSearchParams;
}
export interface SearchResultNodeLike {
	type: string;
}

// the type used to identify a parser/selector function
export type ResultSelector<
	R extends SearchResultNodeLike = SearchResultNodeLike,
> = (cheerio: CheerioAPI, strictSelector: boolean) => R[] | R | null;

/**
 * Search options for single page search
 */
export interface SearchOptions<R extends ResultSelector = ResultSelector> {
	/**
	 * Search query
	 */
	query: string;
	/**
	 * Control the type of results returned (can have a significant performance impact)
	 */
	resultTypes?: R[];

	/**
	 * when true, will only return resultNodes that do not contain any undefined/empty properties
	 */
	strictSelector?: boolean;

	/**
	 * Custom request configuration to be sent with the request
	 */
	requestConfig?: RequestOptions;
}

/**
 * Search options for multiple pages search
 */
export interface SearchOptionsWithPages<
	R extends ResultSelector = ResultSelector,
> extends SearchOptions<R> {
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
export const GOOGLE_SEARCH_URL = "https://www.google.com/search";
