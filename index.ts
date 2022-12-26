import axios, { AxiosRequestConfig } from "axios";
import { load } from "cheerio";

export const REQUEST_URL = "https://www.google.com/search";

export interface SearchOptions {
    requestOptions: AxiosRequestConfig;
    safeMode: boolean;
    page: number | string;
    selectors: {
        DescriptionSelector: string;
        LinkSelector: string;
        TitleSelector: string;
    };
}

export interface Result { 
	description: string; 
	link: string; 
	title: string
}

// UTILITY: Get the url to scrape
function getURL(query: string, options: Partial<SearchOptions> = {}) {
	const params = new URLSearchParams();
	params.append("q", query);
	// if safe mode is enabled, we need to add the safe mode parameter
	if(options.safeMode) {
		params.append("safe", "active");
	}
	// if the user defined a page number, we need to add it to the query as the start parameter
	if(options.page) {
		params.append("start", options.page.toString());
	}

	return `${REQUEST_URL}?${params.toString()}`;
}


// UTILITY: Parses a link and formats it
function parseLink(link: string) {
	if(!link || typeof link !== "string") throw new Error(`Link must be a string received ${typeof link}`);
	link = link.replace('/url?q=', '');
	return link;
}


// html selectors for google.com search results
export const defaultSelectors = {
	DescriptionSelector: '#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd',
	LinkSelector: 'div.ZINbbc > div:nth-child(1) > a',
	TitleSelector: 'div.ZINbbc > div:nth-child(1) > a > h3'
}

const defaultOptions: SearchOptions = {
	requestOptions: {},
	safeMode: true,
	selectors: defaultSelectors,
	page: 0
}

/**
 * 
 * @param query query to search for
 * @param options 
 * @returns Array of Results
 */
export function search(query: string, options: Partial<SearchOptions> = {}): Promise<Partial<Result>[]> {
	if(!query || typeof query !== "string") throw new Error(`Query must be a string received ${typeof query}`);
	if(options && typeof options !== "object") throw new Error(`Options must be an object received ${typeof options}`);
	const MergedOptions = { ...defaultOptions, ...options };
	const url = getURL(query, MergedOptions);
	return new Promise((resolve, reject) => {
		axios.get(url, MergedOptions.requestOptions || {})
			.then(response => {
				const selectors = MergedOptions.selectors || defaultSelectors;
				const $ = load(response.data);
				const Parsed: Partial<Result>[] = [];
				const addResult = (at: number, result: Partial<Result>) => Parsed[at] = Object.assign((Parsed[at] || {}), result)
				
				$(selectors.DescriptionSelector).each((i, elem) => {
					addResult(i, { description: $(elem).text() });
					return true;
				});
				$(selectors.LinkSelector).each((i, elem) => {
					let Link: string | null = $(elem).attr("href") || null;
					Link = Link ? parseLink(Link) : null;
					if(Link) {
						addResult(i, { link: Link })
					}
					return true;
				});
				$(selectors.TitleSelector).each((i, elem) => {
					addResult(i, { title: $(elem).text() })
					return true;
				});
				resolve(Parsed.filter(p => p));
			})
			.catch(error => {
				reject(error);
			});
	});
}


/**
 * Search multiple pages
 * @param query 
 * @param pages 
 * @param options 
 */
export function searchPages(query: string, pages: number, options: Partial<SearchOptions> = {}) {

}	
