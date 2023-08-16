import {
  ResultNode,
  SearchOptions,
  defaultOptions,
} from "./constants";
import axios from "axios";
import { load } from "cheerio";
import { constructSearchQuery, generateArrayOfNumbers, pageToGoogleQueryPage } from "./helpers";
import { deepmerge } from "deepmerge-ts";
import { loadCurrencyNode, loadDictionaryNodes, loadSearchNodes, loadTimeNode, loadTranslateNodes } from "./loaders";


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
  const searchQuery = constructSearchQuery(options.query, options);
  const searchRequest = await axios.get(options.baseUrl, searchQuery);
  const html = searchRequest.data;
  const $ = load(html);
  const result: ResultNode[] = [];

  // get the html selectors
  const selectors = options.selectors;

  // regular search results
  const searchResults = loadSearchNodes($, selectors.SearchNodes);

  // TYPE: Translations
  const translateResults = loadTranslateNodes($, selectors.TranslateNodes);

  // TYPE: Dictionary
  const dictionaryResults = loadDictionaryNodes($, selectors.DictionaryNode)

  // TYPE: Time
  const timeResults = loadTimeNode($, selectors.TimeNode)

  // TYPE: Currency
  const CurrencyResults = loadCurrencyNode($, selectors.CurrencyNode)

  // will be present in the order they appear in a real query
  return result.concat(CurrencyResults, translateResults, dictionaryResults, timeResults, searchResults);
}


/**
 * Search multiple pages
 * @param query
 * @param pages no of pages or array of pages numbers to retrieve
 * @param options
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
 export async function searchWithPages({ pages, ...options }: Partial<Omit<SearchOptions, 'page'>> & { pages: number | number[] }) {
  const queryPages = Array.isArray(pages) ? pages : generateArrayOfNumbers(pages)
  const pagesResults: ResultNode[][] = []

  for(const page of queryPages) {
      (options as SearchOptions).page = pageToGoogleQueryPage(page)
      const result = await search(options);
      pagesResults.push(result)
  }

  return pagesResults;
}
