---
"google-sr": minor
---

Add RelatedSearchesResult parser for extracting related search queries

Add `RelatedSearchesResult` parser to extract the "Related searches" suggestions that Google displays at the bottom of search results to help users find similar queries.

```ts
import { RelatedSearchesResult, search } from 'google-sr';

const results = await search({
  query: 'nodejs frameworks',
  parsers: [RelatedSearchesResult],
});

// results[0].queries might contain: ["express.js", "react.js", "vue.js", ...]
```

The parser returns a `RelatedSearchesResultNode` with:
- `type`: `"RELATED_SEARCHES"`
- `queries`: Array of related search query strings