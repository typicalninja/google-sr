/**
 * Demonstrates how to modify the axios request config
 * via adding proxying requests
 *
 * NOTE: This is untested and may not work as expected. It is only provided as an example.
 *
 * Main purpose of proxying is to avoid rate limiting issues,
 * If changing location to receive results from a different location using the
 * "gl" parameter is BETTER than using a proxy.
 */
import { search } from "google-sr";

const results = await search({
	query: "best coffee shops",
	// requestConfig is of type AxiosRequestConfig
	requestConfig: {
		// to avoid rate limiting issues, use a proxy
		proxy: {
			host: "//PROXYHOST",
			port: 8080,
		},
		// if simply wanting to change the location, use the "gl" parameter (geolocation)
		// instead of changing location via proxy
		params: {
			gl: "us",
		},
	},
});

console.log(results);
