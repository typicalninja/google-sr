---
"google-sr": major
---

Replace Axios with native Fetch API

Axios HTTP client was replaced with the native fetch API to reduce external dependencies and improve compatibility across different environments.

The `requestConfig` option now accepts the `RequestOptions` interface (extending [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit)). You'll need to update your configuration from the previous `AxiosRequestConfig` format.

```diff
import { search } from "google-sr";

search({
	 requestConfig: {
-   	params: {
+		queryParams: {
			safe: "active",
			gl: "us",
		},
		headers: {
			"Some-Header": "value",
		},
	},
})
```
