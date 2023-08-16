import {
  ResultNode,
  SearchOptions,
  defaultOptions,
} from "./constants";
import axios from "axios";
import { load } from "cheerio";
import { constructSearchConfig, generateArrayOfNumbers, pageToGoogleQueryPage } from "./helpers";
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
  const searchQuery = constructSearchConfig(options);
  console.log(searchQuery)
  const searchRequest = await axios.get(options.baseUrl, searchQuery);
  const html = searchRequest.data;
  const $ = load(html);
  const result: ResultNode[] = [];

  // get the html selectors
  const selectors = options.selectors;

  // regular search results
  const searchResults = loadSearchNodes($, selectors.SearchNodes);

  // TYPE: Translations
  const translateResult = loadTranslateNodes($, selectors.TranslateNodes);
  if(translateResult) result.push(translateResult)

  // TYPE: Dictionary
  const dictionaryResult = loadDictionaryNodes($, selectors.DictionaryNode)
  if(dictionaryResult) result.push(dictionaryResult);

  // TYPE: Time
  const timeResult = loadTimeNode($, selectors.TimeNode)
  if(timeResult) result.push(timeResult)

  // TYPE: Currency
  const CurrencyResult = loadCurrencyNode($, selectors.CurrencyNode)
  if(CurrencyResult) result.push(CurrencyResult);

  // will be present in the order they appear in a real query
  return result.concat(searchResults);
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
