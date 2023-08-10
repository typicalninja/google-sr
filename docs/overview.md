# API & overview

This sections covers some useful options provided by the package.

> For a comprehensive list of available options, you can refer to the unofficial Typedoc [here](https://paka.dev/npm/google-sr/api).

In this section, we'll cover the fundamental options that you can use with **google-sr**.

1) `query` - This is a required parameter that specifies your search term. It accepts a `string` value. For example, `query: "nodejs"`.

2) `safeMode` - Enable or disable Google's safe mode for search results. When enabled, safe mode filters out explicit content from search results. You can set this option to `true` to activate safe mode, or `false` to turn it off. Keep in mind that while safe mode provides a more family-friendly experience, it might limit some search results. For instance, setting `safeMode: true` ensures a safer search environment, while `safeMode: false` offers unrestricted search results.

3) `page` - You can use this option to fetch results from a specific page. It defaults to `0` for the first page. If you intend to use it, it's recommended to use the `pageToGoogleQueryPage` helper to convert regular page numbers (like `1`, `2`) to the corresponding page parameter used by Google (e.g., `1 => 0`, `2 => 10`). If you're fetching results from multiple pages, use the `searchWithPages` function instead. It accepts a `number` value. Example: `page: 10`.

4) `selectors` - Selectors are jQuery-style selectors used to target the specific block of search results within the HTML. Usually, you won't need to set these manually. However, in case Google updates their HTML structure and the package has bee not yet officially patched, you can use this option to temporarily address the issue.


> For **current** selectors visit [here](./selectors.md)