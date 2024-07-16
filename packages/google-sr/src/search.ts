import type {
  ResultSelector,
  SearchOptions,
  SearchOptionsWithPages,
} from "./constants";
import axios from "axios";
import { prepareRequestConfig, type SearchResultType } from "./utils";
import { load } from "cheerio";
import { OrganicResult } from "./results";

/**
 * Search google with the given query, only 1 page is returned
 * @param options Search options
 * @returns Search results as an array of SearchResultNodes
 */
export async function search<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptions<R> & { strictSelector?: false }
): Promise<SearchResultType<R>[]>;
export async function search<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptions<R> & { strictSelector: true }
): Promise<SearchResultType<R, true>[]>;
export async function search<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptions<R>
) {
  if (!options)
    throw new TypeError(
      `Search options must be provided. Received ${typeof options}`
    );

  const requestConfig = prepareRequestConfig(options);
  const { data } = await axios(requestConfig);
  // axios should error on non 200 status codes
  // load the raw text (html) data into cheerio
  const cheerioApi = load(data);
  // use the provided selectors or the default one (OrganicSearchSelector)
  const selectors = options.resultTypes || [OrganicResult];
  let searchResults: SearchResultType<R>[] = [];
  // Iterate over each selector to call it with the cheerioApi and concatenate the results
  for (const selector of selectors) {
    const result = selector(
      cheerioApi,
      Boolean(options.strictSelector)
    ) as SearchResultType<R>[];
    // Result must be flattened to a single array
    if (result) searchResults = searchResults.concat(result);
  }

  return searchResults;
}

/**
 * Searches google with the given query, returns results for multiple pages.
 * google uses cursor-based pagination (using param start=number).
 * 
 * Therefore, when providing the specific page numbers, make sure to provide it in 10 increments. 
 * 
 * @example
 * ```ts
 * // search the first 5 pages
 * const results = await searchWithPages({
 *   query: "hello world",
 *   pages: 5,
 * });
 * 
 * // or provide the specific page numbers
 * const results = await searchWithPages({
 *   query: "hello world",
 *   pages: [0, 10, 20, 30, 40],
 * });
 * 
 * // pages can be skipped or be out of order 
 * const results = await searchWithPages({
 *   query: "hello world",
 *   pages: [10, 0, 20],
 * });
 * ```
 * @returns Search results as an array of SearchResultNodes or an array of arrays of SearchResultNodes
 */
// we have to handle overloads for both flattenResults and strictSelector
export async function searchWithPages<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptionsWithPages<R> & { flattenResults?: false; strictSelector?: false }
): Promise<SearchResultType<R>[][]>;
export async function searchWithPages<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptionsWithPages<R> & { flattenResults?: false; strictSelector: true }
): Promise<SearchResultType<R, true>[][]>;
export async function searchWithPages<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptionsWithPages<R> & { flattenResults: true; strictSelector?: false }
): Promise<SearchResultType<R>[]>;
export async function searchWithPages<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptionsWithPages<R> & { flattenResults: true; strictSelector: true }
): Promise<SearchResultType<R, true>[]>;
export async function searchWithPages<R extends ResultSelector = typeof OrganicResult>(
  options: SearchOptionsWithPages<R>
) {
  if (!options)
    throw new TypeError(
      `Search options must be provided. Received ${typeof options}`
    );
  if (typeof options.pages !== "number" && !Array.isArray(options.pages))
    throw new TypeError(
      `Page must be a number or an array of numbers. Received ${typeof options.pages}`
    );

  // instead of using the above search() function,
  // we must reimplement it in order to make it efficient, since it will call same function for each page unnecessarily
  let searchResults: (SearchResultType<R>[][]) = [];
  const pages = Array.isArray(options.pages)
    ? options.pages
    : Array.from({ length: options.pages }, (_, i) => i * 10);
  const baseRequestConfig = prepareRequestConfig(options);
  const selectors = options.resultTypes || [OrganicResult];

  for (const page of pages) {
    // params is guaranteed to be a URLSearchParams
    // setting it here should be fine
    (baseRequestConfig.params as URLSearchParams).set("start", String(page));
    const {data} = await axios(baseRequestConfig);
    const cheerioApi = load(data);
    let pageResults: SearchResultType<R>[] = [];
    for (const selector of selectors) {
      const result = selector(
        cheerioApi,
        Boolean(options.strictSelector)
      ) as SearchResultType<R>[];
      // Result must be flattened to a single array
      if (result) pageResults = pageResults.concat(result);
    }

    if (options.flattenResults) searchResults = searchResults.concat(pageResults);
    else searchResults.push(pageResults);
  }

  return searchResults;
}