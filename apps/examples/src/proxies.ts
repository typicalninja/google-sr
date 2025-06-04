/**
 * Demonstrates how to use a proxy with fetch-based google-sr
 *
 * NOTE: This is untested and may not work as expected. It is only provided as an example.
 *
 * Note that this is for node.js only, and will not work in the browser
 *
 * Check here for information on how to do this for nodejs.
 * https://stackoverflow.com/questions/72306101/make-a-request-in-native-fetch-with-proxy-in-nodejs-18
 *
 * Check here for information on how to do this for denojs
 * https://docs.deno.com/api/deno/~/Deno.HttpClient
 *
 * Check here for information on how to do this for bunjs
 * https://bun.sh/guides/http/proxy
 */
import { search } from "google-sr";

const results = await search({
	query: "best coffee shops",
	// For Node.js fetch, pass the agent option
	requestConfig: {
		queryParams: {
			// If simply wanting to change the language, try using the "hl" parameter
			hl: "en",
			// If wanting to change the location, try using the "gl" parameter
			gl: "us",
		},
	},
});

console.log(results);
