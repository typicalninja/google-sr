import type {
	RequestOptions,
	ResultSelector,
	ResultTypes,
	SearchOptions,
} from "./constants";
import { GOOGLE_SEARCH_URL } from "./constants";

const baseHeaders = {
	Accept: "text/html",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "en-US,en",
	Referer: "https://www.google.com/",
	"upgrade-insecure-requests": "1",
	// the tested user agent is for Chrome 103 on Windows 10
	"User-Agent":
		"Links (2.29; Linux 6.11.0-13-generic x86_64; GNU C 13.2; text)",
};

/**
 * @private
 * Fetches a URL with the provided options, handling errors and returning the response.
 * @param url The URL to fetch
 * @param options The request options
 * @returns The response from the fetch call
 */
export async function safeGetFetch(options: RequestOptions): Promise<Response> {
	options.method = "GET"; // Ensure the method is GET
	if (!options.url) {
		throw new TypeError("Request options must contain a valid URL.");
	}
	const queryParams = options.queryParams?.toString();
	// get the full url with query parameters
	const url = `${options.url}${queryParams ? `?${queryParams}` : ""}`;
	options.queryParams = undefined; // remove queryParams from options to avoid sending it again
	const response = await fetch(url, options);
	// we error on non-200 status codes
	if (!response.ok) {
		throw new Error(
			`Failed to fetch ${url}: ${response.status} ${response.statusText}`,
		);
	}

	return response;
}

/**
 * @private
 * Try to decode the response body using the `ISO-8859-1` encoding,
 * @param response The response object from a fetch call
 * @returns The decoded response body as a string
 */
export async function decodeResponse(response: Response): Promise<string> {
	const dataBuffer = await response.arrayBuffer();

	// During testing using the current user agent, the response was always in ISO-8859-1 encoding
	// It is safe to assume that the response will always be in ISO-8859-1 encoding
	// However if this were to change, then the text decoder will error
	return new TextDecoder("iso-8859-1", { fatal: true }).decode(dataBuffer);
}

/**
 * Extract the actual webpage link from a href tag result
 * @param googleLink
 * @returns
 * @private
 */
export function extractUrlFromGoogleLink(
	googleLink: string | null,
): string | null {
	if (!googleLink) return null;
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
export function prepareRequestConfig(opts: SearchOptions): RequestOptions {
	if (typeof opts.query !== "string")
		throw new TypeError(
			`Search query must be a string, received ${typeof opts.query} instead.`,
		);
	if (typeof opts.requestConfig !== "object")
		throw new TypeError(
			`Request config must be an object if specified, received ${typeof opts.requestConfig}.`,
		);
	// copy the request config to avoid mutating the original object
	const requestConfig: RequestOptions = Object.assign({}, opts.requestConfig);

	// merge the base headers with the provided headers if any
	requestConfig.headers = requestConfig.headers
		? Object.assign({}, baseHeaders, requestConfig.headers)
		: baseHeaders;

	// if params is not a URLSearchParams instance, make it one
	if (!(requestConfig.queryParams instanceof URLSearchParams)) {
		requestConfig.queryParams = new URLSearchParams(requestConfig.queryParams);
	}
	// these params are always set without being overwritten
	// set the actual query
	requestConfig.queryParams.set("q", opts.query);
	requestConfig.url = GOOGLE_SEARCH_URL;

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
