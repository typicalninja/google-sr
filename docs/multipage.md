# Searching in multiple pages

For searching multiple pages efficiently the packages exposes `searchWithPages` function.

### Searching multiple pages with maxPages

The default method suggested is provided the `pages` options to specify how much pages to fetch, this will fetch all pages from 0 (first page) to specified number pages (`pages`).

> **NOTE:** Unlike `search` with `page` option, we internally call `pageToGoogleQueryPage` on each page, you do not have to call it your self


```ts
import { searchWithPages } from 'google-sr';

searchWithPages({ query: 'nodejs', pages: 5 }).then(console.log);

// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
console.log(searchResults);

```

This would return structure similar to below.

```js
// contains a array of arrays
[
  // each array represents a page
  [
    {
        type: ResultType.SearchResult,
        title: '...',
        description: '...',
        link: '...'
    },
    {
        type: ResultTypes.TimeResult
        location: '...',
        time: '...',
        timeInWords: '...'
    },
  ],
  [  
    {
        type: ResultType.SearchResult,
        title: '...',
        description: '...',
        link: '...'
    },
  ]
]
```


### Searching specific pages

Alternatively you can specify array of pages you want to fetch. The order of pages does not matter here and it can  start and end from where ever you want (**Ensure no duplicated pages are present**)

> **NOTE:** Unlike [`search`](./onepage.md) with `page` option we internally call `pageToGoogleQueryPage` on each page, you do NOT have to call it your self



```ts
import { searchWithPages } from 'google-sr';

searchWithPages({ query: 'nodejs', pages: [5, 2, 4, 10] }).then(console.log);

// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: [5, 2, 4, 10] });
console.log(searchResults);
```


### Searching specific range of pages

While not baked in, extending the idea in [Searching specific pages](#searching-specific-pages) we can search a range of pages

for this we may make a special utility called `generateRangeOfPages`

```ts
// simple function as a demo, does not have validation
function generateRangeOfPages(start: number, end: number) { 
    const pages = []
    for(let i =start; i <= end; i++) { 
        pages.push(i) 
    }
    return pages
}
```


then you can use it as below

```ts
import { searchWithPages } from 'google-sr';

searchWithPages({ query: 'nodejs', pages: generateRangeOfPages(10, 15) }).then(console.log);

// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: generateRangeOfPages(10, 15) });
console.log(searchResults);
```