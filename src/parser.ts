import axios from "axios";
import { load } from "cheerio";
import { SearchOptions, defaultOptions } from "./constants";
import { constructSearchQuery, extractUrlFromGoogleLink, generateArrayOfNumbers, pageToGoogleQueryPage } from "./helpers";
import { deepmerge } from 'deepmerge-ts'

export interface ResultNode {
  description: string;
  link: string | null;
  title: string;
}


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
export function search({ query, ...options }: Partial<SearchOptions>): Promise<ResultNode[]> {
  if (!query || typeof query !== "string") throw new TypeError(`Search query must be a string, received ${typeof query}`);
  return new Promise((resolve, reject) => {
    const MergedOptions = deepmerge(defaultOptions, options) as SearchOptions;
    const searchQueryConfig = constructSearchQuery(query, MergedOptions);

    return axios
      .get(MergedOptions.baseUrl, searchQueryConfig)
      .then((response) => {
        const selectors = MergedOptions.selectors;
        // uses arrayBuffer by default due to a encoding bug
        const html = response.data.toString('utf-8');
        const $ = load(html);
        const parsedResults: ResultNode[] = [];

        /**
         * Select all blocks
         */
        $(selectors.block).each((_index, element) => {
          const result = {} as ResultNode;

          /**
           * Get each item for this element block individually for validation
           */
          const link = $(element).find(selectors.link).attr("href");
          const description = $(element).find(selectors.description).text();
          const title = $(element).find(selectors.title).text();

          if(typeof title === 'string') result.title = title;
          if(typeof link === 'string') result.link = extractUrlFromGoogleLink(link);
          if(typeof description === 'string') result.description = description.replace('&nbsp', '')
          
          // if partial ignoring is enabled and if this block is a partial stop adding this block as a result
          if(MergedOptions.ignoreIfPartial && 
            result.title === '' || result.link === null || result.description === ''  
          ) return true;

          parsedResults.push(result);
        });

        resolve(parsedResults);
      })
      // forward errors
      .catch(reject);
  });
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
 * ```ts
 * 
 * searchWithPages({ query: 'nodejs', pages: 5 }).then(console.log);
 * // or if using await/async
 * const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
 * console.log(searchResults);
 * ```
 * 
 * @example 
 * Specifying specific pages to fetch
 * ```ts
 * searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] }).then(console.log);
 * // or if using await/async
 * const searchResults = await searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] });
 * console.log(searchResults);
 * ```
 */
export async function searchWithPages({ pages, ...options }: Omit<SearchOptions, 'page'> & { pages: number | number[] }) {
    const queryPages = Array.isArray(pages) ? pages : generateArrayOfNumbers(pages)
    const pagesResults: ResultNode[][] = []

    for(const page of queryPages) {
        (options as SearchOptions).page = pageToGoogleQueryPage(page)
        const result = await search(options);
        pagesResults.push(result)
    }

    return pagesResults;
}
