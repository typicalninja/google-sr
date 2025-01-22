import type { AxiosRequestConfig } from "axios";
import type { CheerioAPI } from "cheerio";
import type { ResultNodeTyper } from "./utils";

export const ResultTypes = {
	OrganicResult: "ORGANIC",
	TranslateResult: "TRANSLATE",
	DictionaryResult: "DICTIONARY",
	TimeResult: "TIME",
	CurrencyResult: "CURRENCY",
	KnowledgePanelResult: "KNOWLEDGE_PANEL",
} as const;

// Specific result types returned by gsr
export type OrganicResultNode = ResultNodeTyper<
	typeof ResultTypes.OrganicResult,
	"title" | "description" | "link"
>;
export type TranslateResultNode = ResultNodeTyper<
	typeof ResultTypes.TranslateResult,
	"sourceLanguage" | "translationLanguage" | "sourceText" | "translatedText"
>;

export interface DictionaryDefinition {
	definition: string; // The definition text
	example?: string; // An example sentence using the word
	synonyms?: string[]; // List of synonyms for this definition
}

export interface DictionaryMeaning {
	partOfSpeech: string; // The part of speech (e.g., "noun", "verb")
	definitions: DictionaryDefinition[]; // Array of definitions for this part of speech
}

// Dictionary result contains a special property called definitions which is an array
export type DictionaryResultNode = ResultNodeTyper<
	typeof ResultTypes.DictionaryResult,
	"phonetic" | "word"
> & { meanings: DictionaryMeaning[] };

export type TimeResultNode = ResultNodeTyper<
	typeof ResultTypes.TimeResult,
	"location" | "time" | "timeInWords"
>;
export type CurrencyResultNode = ResultNodeTyper<
	typeof ResultTypes.CurrencyResult,
	"from" | "to"
>;

export interface KnowledgePanelMetadata {
	label: string;
	value: string;
}

export interface KnowledgePanelImage {
	source: string;
	url: string;
}

export interface KnowledgePanelCatalog {
	title: string;
	items: KnowledgePanelCatalogItem[];
}

export interface KnowledgePanelCatalogItem {
	title: string;
	caption: string;
	image: string;
}

export type KnowledgePanelResultNode = ResultNodeTyper<
	typeof ResultTypes.KnowledgePanelResult,
	"label" | "title" | "description"
> & {
	metadata: KnowledgePanelMetadata[];
	images: KnowledgePanelImage[];
	catalog: KnowledgePanelCatalog[];
};

// All possible result types as a union
export type SearchResultNode =
	| OrganicResultNode
	| TranslateResultNode
	| DictionaryResultNode
	| TimeResultNode
	| CurrencyResultNode
	| KnowledgePanelResultNode;

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
	requestConfig?: AxiosRequestConfig;
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
