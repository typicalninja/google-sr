# Advanced Usage guide


## Filtering result

Both `search` and `searchWithPages` offer a `filterResults` options to configure what results are obtained via scraping.

**By default filterResult is set to [ResultTypes.SearchResult] to only return 
[Regular organic search](./types.md#regular-search-results)**

You can instead configure it as below

> Following example shows how to retrieve **only** [Translate data from google search](./types.md#translations)

```ts
import { search, ResultTypes } from 'google-sr'


search({ query: 'translate hello to spanish', filterResults: [ResultTypes.TranslateResult] }).then(console.log)
```