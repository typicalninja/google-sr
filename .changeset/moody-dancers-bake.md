---
"google-sr": minor
---

Add metadata properties to OrganicSearch parser

The parser now returns an `OrganicResultNode` with the following new properties:

- `source`: The source of the result, usually a human friendly version of the URL.
- `isAd`: boolean indicating if the result is an ad.

```diff
export interface OrganicResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.OrganicResult;
+	source: string;
+	isAd: boolean;
}
```