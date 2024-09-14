---
"google-sr": minor
---

Remove uneeded top level options


Removed the `safemode` top-level options as the same result can be achieved using the requestConfig option.

```diff
const queryResult = await search({
-    safemode: true,
    // requestConfig is of type AxiosRequestConfig
+    requestConfig: {
+		params: {
+            // enable "safe mode"
+			safe: 'active'
+		},
+	},
});