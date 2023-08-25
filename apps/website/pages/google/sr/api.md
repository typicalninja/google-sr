[**google-sr**](api.md)
***

# Index

## ResultTypes

### Enumeration Members

#### CurrencyResult

> **CurrencyResult**: `"CURRENCY"`

***

#### DictionaryResult

> **DictionaryResult**: `"DICTIONARY"`

***

#### SearchResult

> **SearchResult**: `"SEARCH"`

***

#### TimeResult

> **TimeResult**: `"TIME"`

***

#### TranslateResult

> **TranslateResult**: `"TRANSLATE"`

***

## CurrencyResultNode

### Properties

#### formula

> **formula**: `string`

***

#### from

> **from**: `string`

***

#### to

> **to**: `string`

***

#### type

> **type**: [`CurrencyResult`](api.md#currencyresult)

Type of this result node

***

## DictionaryResultNode

### Properties

#### audio

> `optional` **audio**: `string`

Audio pronunciation of this word

***

#### definitions

> **definitions**: [`string`, `string`][]

Array of array containing definitions and their respective examples

##### Example

```ts
[
 [
   'causing great surprise or wonder; astonishing.',
   'an amazing number of people registered'
 ]
]

```

***

#### phonetic

> **phonetic**: `string`

***

#### type

> **type**: [`DictionaryResult`](api.md#dictionaryresult)

Type of this result node

***

#### word

> **word**: `string`

***

## SearchOptions

Search options supported by the parser

### Properties

#### baseUrl

> **baseUrl**: `string`

Base url of the service by default google.com/search

***

#### filterResults

> **filterResults**: [`ResultTypes`](api.md#resulttypes)[]

Filter the types of results returned (may have performance impact)

***

#### page

> **page**: `number`

Page number to fetch. Google page numbers are different that what you might expect
we suggest you to use searchWithPages instead

***

#### query

> **query**: `string`

Search query

***

#### requestConfig

> **requestConfig**: `AxiosRequestConfig`\< `any` \>

raw config for axios

***

#### safeMode

> **safeMode**: `boolean`

Toggle to enable google safe mode

***

#### selectors

> **selectors**: `__module`

jquery selectors (cheerio) to extract data from scraped data

***

## SearchResultNode

### Properties

#### description

> **description**: `string`

***

#### link

> **link**: `string`

Link or url of this search result

***

#### title

> **title**: `string`

***

#### type

> **type**: [`SearchResult`](api.md#searchresult)

Type of this result node

***

## TimeResultNode

### Properties

#### location

> **location**: `string`

***

#### time

> **time**: `string`

***

#### timeInWords

> **timeInWords**: `string`

***

#### type

> **type**: [`TimeResult`](api.md#timeresult)

Type of this result node

***

## TranslateResultNode

### Properties

#### source

> **source**: `object`

Source for translation

##### Type declaration

> ###### `source.language`
>
> > **language**: `string`
>
> Language of the source text
>
> ###### `source.text`
>
> > **text**: `string`
>
> Source text
>
>

***

#### translation

> **translation**: `object`

Translated content

##### Type declaration

> ###### `translation.language`
>
> > **language**: `string`
>
> Language of the translated text
>
> ###### `translation.pronunciation`
>
> > `optional` **pronunciation**: `string`
>
> Pronunciation of the translation in english
> Only available in certain cases
>
> ###### `translation.text`
>
> > **text**: `string`
>
> translated text
>
>

***

#### type

> **type**: [`TranslateResult`](api.md#translateresult)

Type of this result node

***

## ResultNode

> **ResultNode**: [`SearchResultNode`](api.md#searchresultnode) \| [`TranslateResultNode`](api.md#translateresultnode) \| [`DictionaryResultNode`](api.md#dictionaryresultnode) \| [`TimeResultNode`](api.md#timeresultnode) \| [`CurrencyResultNode`](api.md#currencyresultnode)

***

## generateArrayOfNumbers

> **generateArrayOfNumbers**(`maxNumber`): `number`[]

### Parameters

| Parameter | Type |
| :------ | :------ |
| `maxNumber` | `number` |

### Returns

`number`[]

***

## pageToGoogleQueryPage

> **pageToGoogleQueryPage**(`page`): `number`

Convert a normal page to google query page

### Parameters

| Parameter | Type |
| :------ | :------ |
| `page` | `number` |

### Returns

`number`

***

## search

> **search**(`searchOptions`): `Promise`\< [`ResultNode`](api.md#resultnode)[] \>

Search for a individual page

### Parameters

| Parameter | Type |
| :------ | :------ |
| `searchOptions` | `Partial`\< [`SearchOptions`](api.md#searchoptions) \> |

### Returns

`Promise`\< [`ResultNode`](api.md#resultnode)[] \>

Array of Results

### Example

```ts
search({ query: 'nodejs' }).then(console.log);
// or if using await/async
const searchResults = await search({ query: 'nodejs' });
console.log(searchResults);
```

***

## searchWithPages

> **searchWithPages**(`__namedParameters`): `Promise`\< [`ResultNode`](api.md#resultnode)[][] \>

Search multiple pages

### Parameters

| Parameter | Type |
| :------ | :------ |
| `__namedParameters` | `Partial`\< `Omit`\< [`SearchOptions`](api.md#searchoptions), `"page"` \> \> & \{`pages`: `number` \| `number`[];} |

### Returns

`Promise`\< [`ResultNode`](api.md#resultnode)[][] \>

Array of arrays representing pages containing search results

### Example

Specify amount of pages to fetch

```ts

searchWithPages({ query: 'nodejs', pages: 5 }).then(console.log);
// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: 5 });
console.log(searchResults);
```

### Example

Specifying specific pages to fetch

```ts
searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] }).then(console.log);
// or if using await/async
const searchResults = await searchWithPages({ query: 'nodejs', pages: [1, 2, 5, 10] });
console.log(searchResults);
```
