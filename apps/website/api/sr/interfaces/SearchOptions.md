# Interface: SearchOptions

Search options supported by the parser

## Table of contents

### Properties

- [baseUrl](SearchOptions.md#baseurl)
- [filterResults](SearchOptions.md#filterresults)
- [page](SearchOptions.md#page)
- [query](SearchOptions.md#query)
- [requestConfig](SearchOptions.md#requestconfig)
- [safeMode](SearchOptions.md#safemode)
- [selectors](SearchOptions.md#selectors)

## Properties

### baseUrl

• **baseUrl**: `string`

Base url of the service by default google.com/search

#### Defined in

[google-sr/src/constants.ts:127](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L127)

___

### filterResults

• **filterResults**: [`ResultTypes`](../enums/ResultTypes.md)[]

Filter the types of results returned (may have performance impact)

#### Defined in

[google-sr/src/constants.ts:135](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L135)

___

### page

• **page**: `number`

Page number to fetch. Google page numbers are different that what you might expect
we suggest you to use searchWithPages instead

#### Defined in

[google-sr/src/constants.ts:123](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L123)

___

### query

• **query**: `string`

Search query

#### Defined in

[google-sr/src/constants.ts:131](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L131)

___

### requestConfig

• **requestConfig**: `AxiosRequestConfig`\<`any`\>

raw config for axios

#### Defined in

[google-sr/src/constants.ts:114](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L114)

___

### safeMode

• **safeMode**: `boolean`

Toggle to enable google safe mode

#### Defined in

[google-sr/src/constants.ts:118](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L118)

___

### selectors

• **selectors**: `__module`

jquery selectors (cheerio) to extract data from scraped data

#### Defined in

[google-sr/src/constants.ts:139](https://github.com/typicalninja/google-sr/blob/eafa30a/packages/google-sr/src/constants.ts#L139)
