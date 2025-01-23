---
"google-sr-selectors": major
---

Fix dictionary search results

This patch resolves issues caused by Google disabling access to search results without JavaScript. Users of `google-sr` will be minimally impacted by this change. For those using `google-sr-selectors`, refer to the `google-sr` source for details on how to use the updated selectors.

This update is classified as a major change because it removes several properties and drastically change others, such as `audio` (etc..), which are unavailable in the older version of the search results page (which we use as a bypass).

For more details, see the relevant GitHub issue: [#51](https://github.com/typicalninja/google-sr/issues/51).