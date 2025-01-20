---
"google-sr": major
---

Fix translate search results

This patch resolves issues caused by Google disabling access to search results without JavaScript. It incorporates changes from `google-sr-selectors`. Several properties, such as `pronunciation` (etc..), are unavailable in the older version of the search results page (which we use as a bypass), and thus have been removed.

For more details, see the relevant GitHub issue: [#51](https://github.com/typicalninja/google-sr/issues/51).