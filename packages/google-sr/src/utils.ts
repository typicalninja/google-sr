import type {
	RequestOptions,
	ResultParser,
	ResultTypes,
	SearchOptions,
} from "./constants.js";
import { GOOGLE_SEARCH_URL } from "./constants.js";

const baseHeaders = {
	Accept: "text/html, application/xhtml+xml, */*",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "en-US,en;q=0.5",
	// Use a Internet Explorer < v10 user agent to avoid being required javaScript by google
	"User-Agent": "Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)",
	Connection: "Keep-Alive",
	Referer: "https://www.google.com/",
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
 * Extract the actual webpage link from a href tag result
 * @param googleLink
 * @returns
 * @private
 */
export function extractUrlFromGoogleLink(googleLink?: string): string | null {
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
 * Accepts searchOptions and creates all the relevant configuration for a fetch request
 * @param opts
 * @returns
 */
export function prepareRequestConfig<R extends ResultParser, N extends boolean>(
	opts: SearchOptions<R, N>,
): RequestOptions {
	if (typeof opts.query !== "string")
		throw new TypeError(
			`Search query must be a string, received ${typeof opts.query} instead.`,
		);
	if (opts.requestConfig && typeof opts.requestConfig !== "object")
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
	// set the input encoding to utf-8
	requestConfig.queryParams.set("ie", "UTF-8");
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
		`CheerioAPI instance is missing, if using as a parser make sure to pass the raw function and not the result of calling it. (ex: [${resultParserName}] instead of [${resultParserName}()])`,
	);
}

/**
 * Coerces a value into a string or undefined.
 * If the value is empty or null, returns undefined.
 * @private
 * @param value - The value to coerce.
 * @returns A string if the value is valid, otherwise undefined.
 */
export function coerceToStringOrUndefined(value: unknown): string | undefined {
	if (typeof value !== "string") return undefined;
	return value === "" ? undefined : value;
}

/**
 * Internal utility type to convert a array type (T[]) to a single type (T)
 * if T is not an array, it will return T
 * @private
 */
export type AsArrayElement<T> = T extends Array<infer U> ? U : T;

/**
 * Internal utility type to extract the result type from a ResultParser function
 * @private
 */
export type ParserResultType<R extends ResultParser> = AsArrayElement<
	ReturnType<R>
>;

/**
 * Internal utility type to create a partial type from a result type
 * It will make all properties optional except the 'type' property
 * @private
 */
export type PartialExceptType<T extends { type: string }> = Pick<T, "type"> &
	Omit<Partial<T>, "type">;

/**
 * Internal utility type to extract the search result type from a ResultParser
 * It will return the type of the result parser, with the 'type' property always present
 * @private
 */
export type SearchResultTypeFromParser<
	// result parser is a function that returns an array of results or a single result
	R extends ResultParser,
	N extends boolean,
> = N extends true
	? // With noPartialResult, we exclude results with empty properties
		// in practice, this mean just the regular node
		NonNullable<ParserResultType<R>>
	: // With partial results, we allow results with empty properties
		// so any property can be undefined, but the 'type' property must always be present
		PartialExceptType<NonNullable<ParserResultType<R>>>;
