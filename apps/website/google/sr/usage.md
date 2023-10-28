# Using google-sr

Using google-sr is simple as it ever gets. After finishing the steps to install in [Introduction](./index.md) section, checkout the below topics to learn more.

## Single page search (Basic search)

```ts{4}
import { search, ResultTypes } from 'google-sr';

// using async/await
const searchResults = await search({ query: 'nodejs' });
// searchResults is a array of objects (see typedoc)
if(searchResults[0].type === ResultTypes.SearchResult) {
    // log the first result
    console.log(searchResults[0])
}
```

> [See returned data type](https://typicalninja.github.io/google-sr/types/google_sr.ResultNode.html)

::: tip ⚙️ Default behaviour
By default only `ResultTypes.SearchResult` type is returned. see the [Filtering search results](#filtering-search-results) for more info.
:::

### Choose the page to search

To search a specific page you can use the `page` option.

```ts
import { search, pageToGoogleQueryPage } from 'google-sr';

await search({ 
    page: 40, // [!code ++]
    // or
    page: pageToGoogleQueryPage(5) // [!code ++]
});
```

## Multipage search

google-sr offers a simple helper function that wraps around [`search`](https://typicalninja.github.io/google-sr/functions/google_sr.search.html)
named [`searchWithPages`](https://typicalninja.github.io/google-sr/functions/google_sr.searchWithPages.html) to perform multi-page searches. This function accepts the same options
as the regular search function, it utilizes `pages` option to specify the pages to retrieve (Array of numbers indicating the pages to get).

> Providing it a individual number will internally be parsed to a Array of numbers from 0 to the provided number (ex: provide 5, parsed pages will be [0, 1, 2, 3, 4, 5])

```ts
import { searchWithPages } from 'google-sr';

// using await (inside async)
const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
// searchResults is array of arrays containing same objects as "search()"
```

### Searching range of pages

Instead of providing a number, you provide an array to specify the pages you want to fetch

```ts
await searchWithPages({ 
    query: 'nodejs', 
    pages: [1, 2, 3, 4, 5] // [!code hl]
});
```

:::tip
The pages does not have to be in order and can be skipped if needed to
:::

## Filtering search results

Filtering search results allow you to finely control what your are receiving.
on some occassions this **may even** speed up the parsing.

We specify the result we want using the `filterResults` option. google-sr will only parse the search results you specify in the option and ignore others.


:::tip
Not specifying `filterResults` is eqvuivelent to using `filterResults: [ResultTypes.SearchResult]`


```ts
import { search, ResultTypes } from 'google-sr';
await search({ 
    // default behaviour will be the same, you can remove this safely
    filterResults: [ResultTypes.SearchResult], // [!code --]
    // Using a empty [] will result in 0 results being returned and 
    // is NOT similar to above
    filterResults: [] // [!code warning]
});
```
:::


### Example with translate queries

This example will show how to get results for translate queries.

> Only including a special type (e.x. `ResultTypes.TranslateResult`) **may** return empty results if used in a non related query (e.x. non translate query) it is suggested to be used with `ResultTypes.SearchResult`.

```ts
import { search, ResultTypes } from 'google-sr';
const searchResults = await search({ 
    query: 'translate hello to spanish', 
    filterResults: [ResultTypes.TranslateResult, ResultTypes.SearchResult] 
});
```