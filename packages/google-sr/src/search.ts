import type {
  ResultSelector,
  SearchOptions,
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
export async function search<R extends ResultSelector>(options: SearchOptions<R> & { strictSelector?: false }): Promise<Partial<SearchResultType<R>>[]>;
export async function search<R extends ResultSelector>(options: SearchOptions<R> & { strictSelector: true }): Promise<SearchResultType<R>[]>;
export async function search<R extends ResultSelector>(
  options: SearchOptions<R>
) {
  if (!options) throw new TypeError("Search options must be provided");

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
    const result = selector(cheerioApi, Boolean(options.strictSelector)) as SearchResultType<R>[];
    // Result must be flattened to a single array
    if(result) searchResults = searchResults.concat(result);
  }

  return searchResults;
}
