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

Use the new `ResultNodeTyper` to create a custom node.

```ts
import { ResultNodeTyper, ResultSelector } from "google-sr"
// first argument is the "type" value (string) of the node, second is all the properties of the node
type DidYouKnow = 
ResultNodeTyper<"SOMETYPE", "prop1" | "prop2"> 
// properties that are not string can be defined as this
& { descriptions: string[] } 
const selector: ResultSelector<DidYouKnow> = ($, strictSelector) => { 
    // return node
}

search({ resultTypes: [selector] })
```

Check the newly added api documentation [here](https://github.com/typicalninja/google-sr/tree/master/packages/google-sr#google-sr-api)

