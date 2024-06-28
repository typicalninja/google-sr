# API Documentation - google-sr-v3.3.1

## Functions

### search

▸ **search**(`searchOptions`): `Promise`\<[`ResultNode`](#resultnode)[]\>

Search for a individual page

#### Parameters

| Name | Type |
| :------ | :------ |
| `searchOptions` | `Partial`\<[`SearchOptions`](interfaces/SearchOptions.md)\> |

#### Returns

`Promise`\<[`ResultNode`](#resultnode)[]\>

Array of Results

**`Example`**

```ts
search({ query: 'nodejs' }).then(console.log);
// or if using await/async
const searchResults = await search({ query: 'nodejs' });
console.log(searchResults);
```
___

### searchWithPages

▸ **searchWithPages**(`«destructured»`): `Promise`\<[`ResultNode`](#resultnode)[][]\>

Search multiple pages

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Partial`\<`Omit`\<[`SearchOptions`](interfaces/SearchOptions.md), ``"page"``\>\> & \{ `pages`: `number` \| `number`[]  } |

#### Returns

`Promise`\<[`ResultNode`](#resultnode)[][]\>

Array of arrays representing pages containing search results

**`Example`**

Specify amount of pages to fetch

```ts

searchWithPages({ query: 'nodejs', pages: 5 }).then(console.log);
// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
console.log(searchResults);
```

**`Example`**

Specifying specific pages to fetch

```ts
searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] }).then(console.log);
// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] });
console.log(searchResults);
```


## Types

### Interface: SearchOptions