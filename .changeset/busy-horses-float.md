---
"google-sr": patch
---

Fix delay option in searchWithPages function

The delay option was previously defined in `SearchOptionsWithPages` interface but was not actually implemented in the `searchWithPages` function. This fix adds the missing delay functionality that applies the specified delay (default 1000ms) between page requests, helping to prevent rate limiting.