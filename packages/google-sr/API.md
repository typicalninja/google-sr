# Table of Contents

* [google-sr API](#google-sr-api)
  * [search(SearchOptions\<R>)](#searchsearchoptionsr-promisesearchresulttyper)
    * [SearchOptions\<R>](#searchoptionsr--resultselector)
  * [searchWithPages(SearchOptionsWithPages\<R>)](#searchwithpagessearchoptionswithpagesr-promisesearchresulttyper)
    * [SearchOptionsWithPages\<R>](#searchoptionswithpagesr--resultselector-extends-searchoptionsr)
  * [ResultSelector](#resultselector)
  * [SearchResultNode](#searchresultnode)
    * [OrganicResult](#organicresult)
    * [TranslateResult](#translateresult)
    * [DictionaryResult](#dictionaryresult)
    * [TimeResult](#timeresult)
    * [CurrencyResult](#currencyresult)
  * [ResultTypes](#resulttypes)

# API

## search([SearchOptions\<R>](#searchoptionsr--resultselector)): Promise\<SearchResultType\<R>[]\>

Query a single page of google results.

## searchWithPages([SearchOptionsWithPages\<R>](#searchoptionswithpagesr--resultselector)): Promise\<SearchResultType\<R>[][]\>

Query multiple pages of google results. google uses cursor-based pagination (using param start=number), therefore, when providing the pages to query, make sure to provide a single page number (for auto pagination) or provide an array of page numbers of 10 increments, starting at 10 (for manual pagination).

## SearchOptions\<R = [ResultSelector](#resultselector)>

* **query**: `string` - The query to search for
* **safeMode**: `boolean` - Toggle to enable google safe mode
* **resultTypes**: `R[]` - Control the type of results returned (can have a significant performance impact)
* **strictSelector**: `boolean` - when true, will only return resultNodes that do not contain any undefined/empty 
properties
* **requestConfig**: [`AxiosRequestConfig`](https://axios-http.com/docs/req_config) - Custom request configuration to be sent with the request.

## SearchOptionsWithPages\<R = ResultSelector> extends [SearchOptions\<R>](#searchoptionsr--resultselector)

* **pages**: `number | number[]` - Total number of pages to search or an array of specific pages to search

## ResultSelector

A function that accepts a cheerio instance and returns an array of SearchResultNodes.

`(cheerio: CheerioAPI, strictSelector: boolean) => SearchResultNode[]`

## SearchResultNode

An interface that represents a single search result node. Each node has a type property that identifies the type of result.

```ts
interface SearchResultNode {
  type: ResultTypes;
}
```


#### OrganicResult

```ts
interface OrganicResultNode extends SearchResultNode {
  type: ResultTypes.OrganicResult;
  link: string;
  description: string;
  title: string;
}
```

#### TranslateResult

```ts
interface TranslateResultNode extends SearchResultNode {
  type: ResultTypes.TranslateResult;
  sourceLanguage: string;
  sourceText: string;
  translationLanguage: string;
  translationText: string;
  translationPronunciation: string;
}
```

#### DictionaryResult

```ts
interface DictionaryResultNode extends SearchResultNode {
  type: ResultTypes.DictionaryResult;
  audio: string;
  phonetic: string;
  word: string;
  definitions: [string, string][];
}
```

#### TimeResult

```ts
interface TimeResultNode extends SearchResultNode {
  type: ResultTypes.TimeResult;
  location: string;
  time: string;
  timeInWords: string;
}
```

#### CurrencyResult

```ts
interface CurrencyResultNode extends SearchResultNode {
  type: ResultTypes.CurrencyResult;
  from: string;
  to: string;
}
```

## ResultTypes

An enum that represents the different types of search results.

```ts
enum ResultTypes {
  OrganicResult = "ORGANIC",
  TranslateResult = "TRANSLATE",
  DictionaryResult = "DICTIONARY",
  TimeResult = "TIME",
  CurrencyResult = "CURRENCY",
}
```