---
"google-sr": minor
---

Support custom selectors

Use the new `ResultNodeTyper` to create a custom node, and use the `ResultSelector` to create a function that will parse the raw html for results and return a node.

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