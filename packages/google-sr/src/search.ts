import {
  ResultNode,
  ResultTypes,
  SearchOptions,
  defaultOptions,
} from "./constants";
import axios from "axios";
import { load } from "cheerio";
import {
  constructSearchConfig,
  generateArrayOfNumbers,
  pageToGoogleQueryPage,
  sleep,
} from "./helpers";
import { deepmerge } from "deepmerge-ts";
import {
  loadCurrencyNode,
  loadDictionaryNodes,
  loadSearchNodes,
  loadTimeNode,
  loadTranslateNodes,
} from "./loaders";

/**
 * Search for a individual page
 * @param options Options for this search
 * @param options.query Search query
 * @returns Array of Results
 *
 * @example
 * ```ts
 * search({ query: 'nodejs' }).then(console.log);
 * // or if using await/async
 * const searchResults = await search({ query: 'nodejs' });
 * console.log(searchResults);
 * ```
 */
export async function search(searchOptions: Partial<SearchOptions>) {
  // validate query
  if (!searchOptions.query || typeof searchOptions.query !== "string")
    throw new TypeError(
      `Search query must be a string, received ${typeof searchOptions.query}`
    );
  const options = deepmerge(defaultOptions, searchOptions) as SearchOptions;


  // modify the filter option
  if(options.filterResults.length === 0) options.filterResults = [ResultTypes.SearchResult]

  const searchQuery = constructSearchConfig(options);
  const searchRequest = await axios.get(options.baseUrl, searchQuery);
  const html = searchRequest.data;
  const $ = load(html);
  const result: ResultNode[] = [];

  // get the html selectors
  const selectors = options.selectors;

  // TYPE: Translations
  if (options.filterResults.includes(ResultTypes.TranslateResult)) {
    const translateResult = loadTranslateNodes($, selectors.TranslateSearchSelector);
    if (translateResult) result.push(translateResult);
  }

  // TYPE: Dictionary
  if (options.filterResults.includes(ResultTypes.DictionaryResult)) {
    const dictionaryResult = loadDictionaryNodes($, selectors.DictionarySearchSelector);
    if (dictionaryResult) result.push(dictionaryResult);
  }

  // TYPE: Time
  if (options.filterResults.includes(ResultTypes.TimeResult)) {
    const timeResult = loadTimeNode($, selectors.TimeSearchSelector);
    if (timeResult) result.push(timeResult);
  }

  // TYPE: Currency
  if (options.filterResults.includes(ResultTypes.CurrencyResult)) {
    const CurrencyResult = loadCurrencyNode($, selectors.CurrencyConvertSelector);
    if (CurrencyResult) result.push(CurrencyResult);
  }

  if (options.filterResults.includes(ResultTypes.SearchResult)) {
    // regular search results
    const searchResults = loadSearchNodes($, selectors.OrganicSearchSelector);
    result.push(...searchResults);
  }

  // will be present in the order they appear in a real query
  return result;
}

/**
 * Search multiple pages
 * @param options
 * @param options.pages no of pages / array of pages numbers to retrieve
 * @param options.searchDelay amount of milliseconds (ms) the package should wait between retrieving results (default is disabled) useful with ratelimits
 * @returns Array of arrays representing pages containing search results
 *
 * @example
 * Specify amount of pages to fetch
 *
 *```ts
 *
 * searchWithPages({ query: 'nodejs', pages: 5 }).then(console.log);
 * // or if using await/async
 * const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
 * console.log(searchResults);
 * ```
 *
 * @example
 * Specifying specific pages to fetch
 *
 * ```ts
 * searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] }).then(console.log);
 * // or if using await/async
 * const searchResults = await searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] });
 * console.log(searchResults);
 * ```
 */
export async function searchWithPages({
  pages,
  searchDelay = 0,
  ...options
}: Partial<Omit<SearchOptions, "page">> & { pages: number | number[]; searchDelay?: number }) {
  const queryPages = Array.isArray(pages)
    ? pages
    : generateArrayOfNumbers(pages);
  const pagesResults: ResultNode[][] = [];

  for (const page of queryPages) {
    (options as SearchOptions).page = pageToGoogleQueryPage(page);
    const result = await search(options);
    pagesResults.push(result);
    // if search delay is enabled 
    searchDelay && await sleep(searchDelay);
  }

  return pagesResults;
}
