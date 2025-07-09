---
"google-sr": major
---

Remove ResultNodeTyper type helper

`ResultNodeTyper` was a helper type that was used to define the type returned by a parser. This was removed, as it can be replaced with a simple interface definition.

```diff
- import { ResultNodeTyper } from 'google-sr';
- type MyCustomNode = ResultNodeTyper<"CUSTOM", 'link' | 'title'>;

+ interface MyCustomNode {
+    type: "CUSTOM";
+    link: string;
+    title: string;
+ }
```
