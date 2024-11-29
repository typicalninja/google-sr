import type { AxiosRequestConfig } from "axios";
import type { ResultSelector, ResultTypes, SearchOptions } from "./constants";

const baseHeaders = {
	Accept: "text/html",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "en-US,en",
	Referer: "https://www.google.com/",
	"upgrade-insecure-requests": 1,
	// the tested user agent is for Chrome 103 on Windows 10
	"User-Agent":
		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
};

/**
 * Extract the actual webpage link from a href tag result
 * @param googleLink
 * @returns
 * @private
 */
export function extractUrlFromGoogleLink(googleLink: string): string | null {
	// Regular expression to extract the `q` or `imgurl` parameter from the link
	const regex = /[?&](q|imgurl)=([^&]+)/;

	// Match the link against the regex
	const match = googleLink.match(regex);
	if (match?.[2]) {
		try {
			// Decode the extracted URL to handle encoded characters
			return decodeURIComponent(match[2]);
		} catch {
			// Return null if decoding fails
			return null;
		}
	}
	// Return null if no match is found
	return null;
}

/**
 * Accepts searchOptions and creates all the relevant configuration for an axios request
 * @param opts
 * @returns
 */
export function prepareRequestConfig(opts: SearchOptions): AxiosRequestConfig {
	const requestConfig: AxiosRequestConfig = opts.requestConfig ?? {};
	if (typeof opts.query !== "string")
		throw new TypeError(
			`Search query must be a string, received ${typeof opts.query} instead.`,
		);
	if (typeof requestConfig !== "object")
		throw new TypeError(
			`Request config must be an object if specified, received ${typeof requestConfig}.`,
		);
	// merge the base headers with the provided headers if any
	requestConfig.headers = requestConfig.headers
		? Object.assign({}, baseHeaders, requestConfig.headers)
		: baseHeaders;
	requestConfig.url = requestConfig.url ?? "https://www.google.com/search";

	// if params is not a URLSearchParams instance, make it one
	if (!(requestConfig.params instanceof URLSearchParams)) {
		requestConfig.params = new URLSearchParams(requestConfig.params);
	}
	// these params are always set without being overwritten
	// set the actual query
	requestConfig.params.set("q", opts.query);
	// force the search result to be non javascript
	requestConfig.params.set("gbv", "1");

	// force the response to be text
	requestConfig.responseType = "text";

	return requestConfig;
}

/**
 * Shorthand function to throw an error when cheerio is missing with the name of the result parser
 * @param resultParserName
 */
export function throwNoCheerioError(
	resultParserName: keyof typeof ResultTypes,
): never {
	throw new TypeError(
		`CheerioAPI instance is missing, if using as a selector make sure to pass the raw function and not the result of calling it. (ex: [${resultParserName}] instead of [${resultParserName}()])`,
	);
}

/**
 * Internal utility function to check if all properties are empty,
 *  with additional logic for strictSelector option to check if any property is empty
 * @param result
 * @param strictSelector
 * @private
 */
export function isEmpty(
	strictSelector: boolean,
	...values: (string | undefined | null)[]
): boolean {
	if (strictSelector)
		return values.some(
			(value) => value === "" || value === undefined || value === null,
		);
	return values.every(
		(value) => value === "" || value === undefined || value === null,
	);
}

/**
 * internal type to create a node with its type and other properties set as strings
 * Example:
 * Creates interface { type: "ORGANIC_RESULT", title: string } for ResultNodeTyper<typeof ResultTypes.OrganicSearchResult, "title">
 * @private
 */
export type ResultNodeTyper<T, K extends string> = {
	type: T;
} & Record<K, string | null>;

/**
 * Internal utility type to convert a array type (T[]) to a single type (T)
 * if T is not an array, it will return T
 * @private
 */
export type AsArrayElement<T> = T extends Array<infer U> ? U : T;

/**
 * Internal utility type to get a record without null and undefined values
 * @private
 */
export type NonNullableRecord<T> = { [K in keyof T]: NonNullable<T[K]> };

/**
 * Generic type for the search results, derives the resultTypes from selector array.
 */
export type SearchResultTypeFromSelector<
	R extends ResultSelector,
	S extends boolean = false,
> = S extends true
	? NonNullableRecord<NonNullable<AsArrayElement<ReturnType<R>>>>
	: NonNullable<AsArrayElement<ReturnType<R>>>;
