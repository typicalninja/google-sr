---
"google-sr-selectors": minor
"google-sr": minor
---

Add `NewsSelector` and `NewsResult` for parsing results from the Google News tab.

Note that to use the `NewsSelector`, you need to set the `tbm` parameter to `nws` in your `requestConfig`. To use it, set the `tbm` query parameter to `'nws'`, which tells Google to return results from the News tab. Note that `NewsSelector` is not compatible with other selectors

```ts
import { NewsResult, search } from 'google-sr';

// Note: This code assumes usage in an async context
const results = await search({
	query: 'latest news',
	resultTypes: [NewsResult],
	requestConfig: {
		queryParams: {
			tbm: 'nws', // Set tbm to nws for news results
		},
	},
});

// Example usage of NewsResult
for(const result of results) {
	console.log(`Title: ${result.title}`);
	console.log(`Description: ${result.description}`);
	console.log(`Link: ${result.link}`);
	console.log(`Source: ${result.source}`);
	console.log(`Published Date: ${result.published_date}`);
};
```