# google-sr 🔍

[![testing workflow](https://github.com/typicalninja/google-sr/actions/workflows/tests.yml/badge.svg)](https://github.com/typicalninja/google-sr)
[![npm downloads](https://img.shields.io/npm/dw/google-sr)](https://www.npmjs.com/package/google-sr)
[![GitHub issues](https://img.shields.io/github/issues/typicalninja/google-sr)](https://github.com/typicalninja/google-sr/issues)
[![NPM](https://img.shields.io/npm/l/google-sr)](https://www.npmjs.com/package/google-sr)
[![npm version](https://img.shields.io/npm/v/google-sr)](https://www.npmjs.com/package/google-sr)
[![Discord](https://img.shields.io/discord/807868280387665970)](https://discord.gg/ynwckXS9T2)
[![CodeFactor](https://www.codefactor.io/repository/github/typicalninja/google-sr/badge)](https://www.codefactor.io/repository/github/typicalninja/google-sr)

Simple & Fast Package for scraping Google search results without the need for an API key. 🚀

# Table of Contents

* [Features](#features)
* [Install](#install)
* [Usage](#usage)
* [google-sr API](#google-sr-api)
  * [search(SearchOptions\<R>)](#searchsearchoptionsr-promisesearchresulttyper)
    * [SearchOptions\<R>](#searchoptionsr--resultselector)
  * [searchWithPages(SearchOptionsWithPages\<R>)](#searchwithpagessearchoptionswithpagesr-promisesearchresulttyper)
    * [SearchOptionsWithPages\<R>](#searchoptionswithpagesr--resultselector)
  * [ResultSelector](#resultselector)
  * [SearchResultNode](#searchresultnode)
    * [OrganicResult](#organicresult)
    * [TranslateResult](#translateresult)
    * [DictionaryResult](#dictionaryresult)
    * [TimeResult](#timeresult)
    * [CurrencyResult](#currencyresult)
  * [ResultTypes](#resulttypes)
* [Disclaimer](#disclaimer)
* [Related projects 🥂](#related-projects)
* [Tests](#tests)
* [Support & Bug Reporting 🛠️🐞](#support--bug-reporting)
* [License](#license)

# Features

* Simple to use
* [Well tested 🔄](#tests)
* Available for both typescript and javascript
* No API key is needed 🔑

# Install 📦

To get started, you can install **google-sr** using your preferred package manager:

> google-sr is not supported on browser environments.

```bash
npm install google-sr
# or pnpm / yarn add google-sr
```

# Usage

You can easily perform a single-page search like this:

```ts
import { search, OrganicResult } from 'google-sr';

// using await/async
const queryResult = await search({
    query: "nodejs",
    // OrganicResult is the default, however it is recommended to always specify the result type
    resultTypes: [OrganicResult],
});

// will return a SearchResult[]
console.log(searchResults);
// should log: true
console.log(searchResults[0].type === ResultTypes.OrganicResult)
```

To search for multiple pages of results, use the `searchWithPages` function:

```ts
import { searchWithPages, OrganicResult } from 'google-sr';

// using await/async
const queryResult = await searchWithPages({
    query: "nodejs",
    // OrganicResult is the default, however it is recommended to always specify the result type
    resultTypes: [OrganicResult],
    pages: 2,
});

// will return a SearchResult[][]
console.log(searchResults);
// should log: true
console.log(searchResults[0][0].type === ResultTypes.OrganicResult)
```

> By default only `ResultTypes.OrganicResult` result type are returned, use the [resultTypes](#searchoptionsr--resultselector) option to configure it

* Additional examples can be found in [tests](#tests) and [apps/examples](https://github.com/typicalninja/google-sr/tree/main/apps/examples) directory

# google-sr API

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

# ⚠️ Disclaimer

This is not sponsored, supported, or affiliated with Google Inc.

Unlike the conventional recommendation of using the Google API, this module scrapes the Google search result page (which might potentially infringe upon Google's terms of service).

The source code within this repository is intended solely for educational & research purposes.

The author (typicalninja) & contributors takes **NO** responsibility for any issues that arise from misuse, such as IP blocking by Google. Your discretion in usage is advised.

# Related projects 🥂

* [google-that](https://g-sr.vercel.app/google/that) - CLI wrapper around google-sr
* [google-sr-selectors](https://g-sr.vercel.app/google/selectors) - Selectors for google search results used by google-sr

# Tests

Tests are written using [vitest](https://vitest.dev/) and can be run by using the `test` script.

> Weekly tests are executed using a github action to ensure compatibility and catch breakage due google changes

google-sr uses pnpm as its package manager

```bash
pnpm run test
```

# Support & Bug Reporting 🛠️🐞

> Make sure you are on the latest version before creating bug reports

Support and bug reporting both can be done on  [github issues](https://github.com/typicalninja/google-sr/issues)

# License

This repository and the code inside it is licensed under the Apache-2.0 License. Read [LICENSE](./LICENSE) for more information.