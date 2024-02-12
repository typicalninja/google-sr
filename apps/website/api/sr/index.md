# google-sr - v3.2.1

## Table of contents

### Enumerations

- [ResultTypes](enums/ResultTypes.md)

### Interfaces

- [CurrencyResultNode](interfaces/CurrencyResultNode.md)
- [DictionaryResultNode](interfaces/DictionaryResultNode.md)
- [SearchOptions](interfaces/SearchOptions.md)
- [SearchResultNode](interfaces/SearchResultNode.md)
- [TimeResultNode](interfaces/TimeResultNode.md)
- [TranslateResultNode](interfaces/TranslateResultNode.md)

### Type Aliases

- [ResultNode](#resultnode)

### Functions

- [generateArrayOfNumbers](#generatearrayofnumbers)
- [loadCurrencyNode](#loadcurrencynode)
- [loadDictionaryNodes](#loaddictionarynodes)
- [loadSearchNodes](#loadsearchnodes)
- [loadTimeNode](#loadtimenode)
- [loadTranslateNodes](#loadtranslatenodes)
- [pageToGoogleQueryPage](#pagetogooglequerypage)
- [search](#search)
- [searchWithPages](#searchwithpages)

## Type Aliases

### ResultNode

Ƭ **ResultNode**: [`SearchResultNode`](interfaces/SearchResultNode.md) \| [`TranslateResultNode`](interfaces/TranslateResultNode.md) \| [`DictionaryResultNode`](interfaces/DictionaryResultNode.md) \| [`TimeResultNode`](interfaces/TimeResultNode.md) \| [`CurrencyResultNode`](interfaces/CurrencyResultNode.md)

#### Defined in

[google-sr/src/constants.ts:100](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L100)

## Functions

### generateArrayOfNumbers

▸ **generateArrayOfNumbers**(`maxNumber`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxNumber` | `number` |

#### Returns

`number`[]

#### Defined in

[google-sr/src/helpers.ts:83](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/helpers.ts#L83)

___

### loadCurrencyNode

▸ `Private` **loadCurrencyNode**(`$`, `selectors`): [`CurrencyResultNode`](interfaces/CurrencyResultNode.md) \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `$` | `CheerioAPI` |
| `selectors` | `Object` |
| `selectors.from` | `string` |
| `selectors.to` | `string` |

#### Returns

[`CurrencyResultNode`](interfaces/CurrencyResultNode.md) \| ``null``

#### Defined in

[google-sr/src/loaders.ts:170](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/loaders.ts#L170)

___

### loadDictionaryNodes

▸ `Private` **loadDictionaryNodes**(`$`, `selectors`): [`DictionaryResultNode`](interfaces/DictionaryResultNode.md) \| ``null``

Loader for dictionary blocks

#### Parameters

| Name | Type |
| :------ | :------ |
| `$` | `CheerioAPI` |
| `selectors` | `Object` |
| `selectors.audio` | `string` |
| `selectors.definitions` | `string` |
| `selectors.examples` | `string` |
| `selectors.phonetic` | `string` |
| `selectors.word` | `string` |

#### Returns

[`DictionaryResultNode`](interfaces/DictionaryResultNode.md) \| ``null``

#### Defined in

[google-sr/src/loaders.ts:96](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/loaders.ts#L96)

___

### loadSearchNodes

▸ `Private` **loadSearchNodes**(`$`, `selectors`): [`SearchResultNode`](interfaces/SearchResultNode.md)[]

Loader for Regular Results

#### Parameters

| Name | Type |
| :------ | :------ |
| `$` | `CheerioAPI` |
| `selectors` | `Object` |
| `selectors.block` | `string` |
| `selectors.description` | `string` |
| `selectors.link` | `string` |
| `selectors.title` | `string` |

#### Returns

[`SearchResultNode`](interfaces/SearchResultNode.md)[]

#### Defined in

[google-sr/src/loaders.ts:25](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/loaders.ts#L25)

___

### loadTimeNode

▸ `Private` **loadTimeNode**(`$`, `selectors`): [`TimeResultNode`](interfaces/TimeResultNode.md) \| ``null``

#### Parameters

| Name | Type |
| :------ | :------ |
| `$` | `CheerioAPI` |
| `selectors` | `Object` |
| `selectors.location` | `string` |
| `selectors.time` | `string` |
| `selectors.timeInWords` | `string` |

#### Returns

[`TimeResultNode`](interfaces/TimeResultNode.md) \| ``null``

#### Defined in

[google-sr/src/loaders.ts:143](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/loaders.ts#L143)

___

### loadTranslateNodes

▸ `Private` **loadTranslateNodes**(`$`, `selectors`): [`TranslateResultNode`](interfaces/TranslateResultNode.md) \| ``null``

Loader for translation blocks

#### Parameters

| Name | Type |
| :------ | :------ |
| `$` | `CheerioAPI` |
| `selectors` | `Object` |
| `selectors.pronunciation` | `string` |
| `selectors.sourceLanguage` | `string` |
| `selectors.sourceText` | `string` |
| `selectors.targetLanguage` | `string` |
| `selectors.translationText` | `string` |

#### Returns

[`TranslateResultNode`](interfaces/TranslateResultNode.md) \| ``null``

#### Defined in

[google-sr/src/loaders.ts:56](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/loaders.ts#L56)

___

### pageToGoogleQueryPage

▸ **pageToGoogleQueryPage**(`page`): `number`

Convert a normal page to google query page

#### Parameters

| Name | Type |
| :------ | :------ |
| `page` | `number` |

#### Returns

`number`

#### Defined in

[google-sr/src/helpers.ts:79](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/helpers.ts#L79)

___

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

#### Defined in

[google-sr/src/search.ts:37](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/search.ts#L37)

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

#### Defined in

[google-sr/src/search.ts:120](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/search.ts#L120)
