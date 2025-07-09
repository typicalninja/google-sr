---
"google-sr-selectors": minor
"google-sr": minor
---

Add NewsResult for parsing Google News tab results

Add `NewsResult` parser for Google News tab search results. Requires setting `tbm: 'nws'` in `requestConfig` and is incompatible with other parsers.

```ts
import { NewsResult, search } from 'google-sr';

const results = await search({
  query: 'latest news',
  parsers: [NewsResult],
  requestConfig: {
    queryParams: {
      tbm: 'nws', // Required for news results
    },
  },
});
```