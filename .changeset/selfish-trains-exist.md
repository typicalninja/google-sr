---
"google-sr": major
---

Rewrite the api to be customizable

google-sr has been completely rewritten to be more customizable. It is possible to create your own selector functions and use them to scrape the data you want.

`filterResults` option was replaced by `resultTypes` which accepts a function instead of a string. This allows you to add your own custom selectors to be used as a parser.

```diff
search({
-      filterResults: [ResultTypes.SearchResult]
+      resultTypes: []    
})
```

Check the newly added api documentation [here](https://github.com/typicalninja/google-sr/tree/master/packages/google-sr#google-sr-api)

