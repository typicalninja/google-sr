# Searching one page

### Searching the first page

For page (**default**) You can use the `search` function exposed by the package.


```ts
import { search } from 'google-sr';

search({ query: 'nodejs' }).then(console.log);

// or if using await/async
const searchResults = await search({ query: 'nodejs' });
console.log(searchResults);
```

This would return structure similar to below.

```js
[
    {
        title: '...',
        description: '...',
        link: '...'
    },
    {
        title: '...',
        description: '...',
        link: '...'
    },
    {
        title: '...',
        description: '...',
        link: '...'
    }
]
```


### Searching a specific page

By modifying the `page` options available with the `search` function we can scrape a specific page.

> NOTE: The way pages in google search work is different from what one my might expect.
> for example, page 1 is 0 & page 2 is 10. Googles system uses a from `start` system instead of a direct pages system.
> Due to this when using `page` options use the `pageToGoogleQueryPage` helper exported by google-sr if you intend to use pages like (page 1 = 1, and page 2 = 2).


```ts
import { search, pageToGoogleQueryPage } from 'google-sr';

search({ query: 'nodejs', page: pageToGoogleQueryPage(5) }).then(console.log);

// or if using await/async
const searchResults = await search({ query: 'nodejs', page: pageToGoogleQueryPage(5) });
console.log(searchResults);
```


Same example is below without using the `pageToGoogleQueryPage` helper


```ts
import { search, pageToGoogleQueryPage } from 'google-sr';

search({ query: 'nodejs', page: 40 }).then(console.log);

// or if using await/async
const searchResults = await search({ query: 'nodejs', page: 40 });
console.log(searchResults);
```