---
"google-sr": major
---

Rename `ResultSelector` to `ResultParser` and `resultTypes` to `parsers`

The API has been updated to use more intuitive naming that eliminates confusion between CSS selectors and result parser functions.

**Breaking Changes:**
- `ResultSelector` type renamed to `ResultParser`
- `resultTypes` option renamed to `parsers` in search functions

**Migration Guide:**

```diff
import { search, OrganicResult } from "google-sr";

const results = await search({
  query: "hello world",
- resultTypes: [OrganicResult],
+ parsers: [OrganicResult],
});
```