---
"google-sr": major
---

Replace Axios with native Fetch API

Replace Axios HTTP client with native fetch API to reduce external dependencies and improve compatibility across environments.

**Breaking Change**: The `requestConfig` option now accepts the `RequestOptions` interface (extending [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit)) instead of `AxiosRequestConfig`.

```diff
import { search } from "google-sr";

search({
  requestConfig: {
-   params: {
+   queryParams: {
      safe: "active",
      gl: "us",
    },
    headers: {
      "Some-Header": "value",
    },
  },
})
```
