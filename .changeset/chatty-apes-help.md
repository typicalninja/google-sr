---
"google-sr-selectors": minor
---

Add metadata selectors to OrganicSearchSelector

This release adds new CSS selectors for extracting metadata from Google search results:

The `metaSource` and `metaAd` selectors are nested within the `metaContainer` element.

```ts
const OrganicSearchSelector = {
    metaContainer: "span.qXLe6d.dXDvrc",
    metaSource: "span.fYyStc:last-of-type",
    metaAd: "span.dloBPe.fYyStc",
};
```