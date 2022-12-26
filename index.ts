import axios, { AxiosRequestConfig } from "axios";
import { load } from "cheerio";

export const REQUEST_URL = "https://www.google.com/search";

export interface SearchOptions {
    requestOptions?: AxiosRequestConfig;
    safeMode?: boolean;
    page?: number | string;
    selectors?: {
        DescriptionSelector?: string;
        LinkSelector?: string;
        TitleSelector?: string;
    };
}

// UTILITY: Get the url to scrape
function getURL(query: string, options: SearchOptions = {}) {
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
let defaultSelectors = {
	DescriptionSelector: '#main > div > div > div > div:not(.v9i61e) > div.AP7Wnd',
	LinkSelector: 'div.ZINbbc > div:nth-child(1) > a',
	TitleSelector: 'div.ZINbbc > div:nth-child(1) > a > h3'
}

const defaultOptions: SearchOptions = {
	requestOptions: {},
	safeMode: true,
	selectors: defaultSelectors,
}


function search(query: string, options: SearchOptions = defaultOptions): Promise<{ Description: string; Link: string | undefined; Title: string}[]> {
	if(!query || typeof query !== "string") throw new Error(`Query must be a string received ${typeof query}`);
	if(options && typeof options !== "object") throw new Error(`Options must be an object received ${typeof options}`);
	const MergedOptions = { ...defaultOptions, ...options };
	const url = getURL(query, MergedOptions);
	return new Promise((resolve, reject) => {
		axios.get(url, MergedOptions.requestOptions || {})
			.then(response => {
				const selectors = MergedOptions.selectors || defaultSelectors;
				const $ = load(response.data);
				const Parsed: any[] = [];
				$(selectors.DescriptionSelector).each((i, elem) => {
					const Description = $(elem).text();
					Parsed.push({ Description });
				});
				$(selectors.LinkSelector).each((i, elem) => {
					if(Parsed[i]) {
						const Link = $(elem).attr("href");
						if(Link) {
							Parsed[i].Link = parseLink(Link);
						}
						else {
							Parsed[i].Link = undefined;
						}
					}
				});
				$(selectors.TitleSelector).each((i, elem) => {
					if(Parsed[i]) {
						const Title = $(elem).text();
						Parsed[i].Title = Title;
					}
				});
				resolve(Parsed);
			})
			.catch(error => {
				reject(error);
			});
	});
}


export default search
export { defaultSelectors, search }