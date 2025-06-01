---
"google-sr": major
---

The `ResultNodeTyper` type helper has been removed

`ResultNodeTyper` was a helper type that was used to define parsers returning a `ResultNode`. This was removed, as it can be replaced with a simple interface definition.

```diff
- import { ResultNodeTyper } from 'google-sr';
- type MyCustomNode = ResultNodeTyper<"CUSTOM", 'link' | 'title'>;

+ interface MyCustomNode {
+    type: "CUSTOM";
+    link: string;
+    title: string;
+ }
```
