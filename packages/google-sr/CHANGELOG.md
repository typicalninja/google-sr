# google-sr

## 6.0.0

### Major Changes

- [#76](https://github.com/typicalninja/google-sr/pull/76) [`51828ad`](https://github.com/typicalninja/google-sr/commit/51828ad0e2a94646ddba8727aea5f6bfce1274c4) Thanks [@typicalninja](https://github.com/typicalninja)! - Replace Axios with native Fetch API

  Replace Axios HTTP client with native fetch API to reduce external dependencies and improve compatibility across environments.

  **Breaking Change**: The `requestConfig` option now accepts the [`RequestOptions`](https://typicalninja.github.io/google-sr/interfaces/google-sr_src.RequestOptions.html) interface (extending [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit)) instead of `AxiosRequestConfig`.

  ```diff
  import { search } from "google-sr";

  search({
    requestConfig: {
  -   params: {
  +   queryParams: {
        safe: "active",
        gl: "us",
      },
      headers: {
        "Some-Header": "value",
      },
    },
  })
  ```

- [#79](https://github.com/typicalninja/google-sr/pull/79) [`ae54adf`](https://github.com/typicalninja/google-sr/commit/ae54adf075c39771c09a1cfb719d5affe0dfd49d) Thanks [@typicalninja](https://github.com/typicalninja)! - Rename CurrencyResult to UnitConversionResult

  Rename `CurrencyResult` to `UnitConversionResult` to better reflect its ability to handle all conversion queries (currency, units, measurements, etc.), not just currency conversions.

  **Breaking Changes:**

  - `CurrencyResult` → `UnitConversionResult`
  - `CurrencyResultNode` → `UnitConversionResultNode`
  - `ResultTypes.CurrencyResult` → `ResultTypes.UnitConversionResult`

  ```diff
  - import { CurrencyResult, CurrencyResultNode } from 'google-sr';
  + import { UnitConversionResult, UnitConversionResultNode } from 'google-sr';

  const results = search({
    query: "100 USD to EUR",
  -  parsers: [CurrencyResult]
  +  parsers: [UnitConversionResult]
  });

  - if (result.type === ResultTypes.CurrencyResult) {
  + if (result.type === ResultTypes.UnitConversionResult) {
    // handle unit conversion result
  }
  ```

- [#80](https://github.com/typicalninja/google-sr/pull/80) [`592ea47`](https://github.com/typicalninja/google-sr/commit/592ea4764a5947ab8c90aa51b06d50cdcb6ff607) Thanks [@typicalninja](https://github.com/typicalninja)! - Remove strictSelector in favor of noPartialResults

  Replace `strictSelector` option with `noPartialResults` for improved clarity and better description of its behavior.

  ```diff
  search({
  - strictSelector: true,
  + noPartialResults: true,
  });
  ```

- [#92](https://github.com/typicalninja/google-sr/pull/92) [`2722f6d`](https://github.com/typicalninja/google-sr/commit/2722f6d1b39e9103c5f105ca893dcd90ead98193) Thanks [@typicalninja](https://github.com/typicalninja)! - Fixed types and improved all result parsers

  Fixed generic types for partial results. Now `search` and `searchWithPages` return the correct types based on the `noPartialResults` option.

  **Breaking Changes:**

  - `DictionaryResultNode` interface: `phonetic` and `word` properties are now required when `noPartialResults` is `true`. This makes all result types consistent.
    - `DictionaryResultNode` now has the proper `type` property.
  - All parsers now convert empty strings to `undefined` (this was in the types but not working). This may break your code if you expected empty strings in the previous versions.

  **Other Changes:**

  - Refactored all internal parsers for better consistency
  - Added better documentation and examples
  - Improved parsing reliability

- [#93](https://github.com/typicalninja/google-sr/pull/93) [`4ac1402`](https://github.com/typicalninja/google-sr/commit/4ac14024070f16db370de4c51fa6ce956b16eaa0) Thanks [@typicalninja](https://github.com/typicalninja)! - Make OrganicResult description field optional

  The `description` field in `OrganicResultNode` is now optional (`string | undefined`) to handle cases where search results don't include a description. This is a breaking change as existing code may need to be updated to handle the undefined case.

- [#73](https://github.com/typicalninja/google-sr/pull/73) [`f462148`](https://github.com/typicalninja/google-sr/commit/f462148023b580d10703b5e767dafd7811ff5a58) Thanks [@typicalninja](https://github.com/typicalninja)! - Remove ResultNodeTyper type helper

  `ResultNodeTyper` was a helper type that was used to define the type returned by a parser. This was removed, as it can be replaced with a simple interface definition.

  ```diff
  - import { ResultNodeTyper } from 'google-sr';
  - type MyCustomNode = ResultNodeTyper<"CUSTOM", 'link' | 'title'>;

  + interface MyCustomNode {
  +    type: "CUSTOM";
  +    link: string;
  +    title: string;
  + }
  ```

- [#85](https://github.com/typicalninja/google-sr/pull/85) [`85bae81`](https://github.com/typicalninja/google-sr/commit/85bae810fdf33643545ae289d578cbc3ffa97f41) Thanks [@typicalninja](https://github.com/typicalninja)! - Rename `ResultSelector` to `ResultParser` and `resultTypes` to `parsers`

  The API has been updated to use more intuitive naming that eliminates confusion between CSS selectors and result parser functions.

  **Breaking Changes:**

  - `ResultSelector` type renamed to `ResultParser`
  - `resultTypes` option renamed to `parsers` in search functions

  **Migration Guide:**

  ```diff
  import { search, OrganicResult } from "google-sr";

  const results = await search({
    query: "hello world",
  - resultTypes: [OrganicResult],
  + parsers: [OrganicResult],
  });
  ```

### Minor Changes

- [#71](https://github.com/typicalninja/google-sr/pull/71) [`cae9f30`](https://github.com/typicalninja/google-sr/commit/cae9f30d98a10b031c8f1833819e30d692f4bfde) Thanks [@tresorama](https://github.com/tresorama)! - Add NewsResult for parsing Google News tab results

  Add `NewsResult` parser for Google News tab search results. Requires setting `tbm: 'nws'` in `requestConfig` and is incompatible with other parsers.

  ```ts
  import { NewsResult, search } from "google-sr";

  const results = await search({
    query: "latest news",
    parsers: [NewsResult],
    requestConfig: {
      queryParams: {
        tbm: "nws", // Required for news results
      },
    },
  });
  ```

- [#89](https://github.com/typicalninja/google-sr/pull/89) [`bb1cc1a`](https://github.com/typicalninja/google-sr/commit/bb1cc1afcd931948b1ebe02bd5627fdc6bc3287e) Thanks [@typicalninja](https://github.com/typicalninja)! - Add thumbnail image to news parser & selector

- [#90](https://github.com/typicalninja/google-sr/pull/90) [`352ba4c`](https://github.com/typicalninja/google-sr/commit/352ba4c68b19c74596b5f7fed0f243855da50346) Thanks [@typicalninja](https://github.com/typicalninja)! - Add metadata properties to OrganicSearch parser

  The parser now returns an `OrganicResultNode` with the following new properties:

  - `source`: The source of the result, usually a human friendly version of the URL.
  - `isAd`: boolean indicating if the result is an ad.

  ```diff
  export interface OrganicResultNode extends SearchResultNodeLike {
  	type: typeof ResultTypes.OrganicResult;
  +	source: string;
  +	isAd: boolean;
  }
  ```

- [#94](https://github.com/typicalninja/google-sr/pull/94) [`6c08082`](https://github.com/typicalninja/google-sr/commit/6c08082c298be3ec26c152764de5f05281b375ca) Thanks [@typicalninja](https://github.com/typicalninja)! - Migrate packages to ESM-first with CJS compatibility via dual build

  All packages have been migrated from CJS-first to ESM-first architecture. Existing users can continue using the packages without any code changes as both ESM and CJS builds are provided.

- [#96](https://github.com/typicalninja/google-sr/pull/96) [`51580a6`](https://github.com/typicalninja/google-sr/commit/51580a698cb9f465d00edcf5f64ba56add0c5814) Thanks [@typicalninja](https://github.com/typicalninja)! - Add RelatedSearchesResult parser for extracting related search queries

  Add `RelatedSearchesResult` parser to extract the "Related searches" suggestions that Google displays at the bottom of search results to help users find similar queries.

  ```ts
  import { RelatedSearchesResult, search } from "google-sr";

  const results = await search({
    query: "nodejs frameworks",
    parsers: [RelatedSearchesResult],
  });

  // results[0].queries might contain: ["express.js", "react.js", "vue.js", ...]
  ```

  The parser returns a `RelatedSearchesResultNode` with:

  - `type`: `"RELATED_SEARCHES"`
  - `queries`: Array of related search query strings

### Patch Changes

- [#98](https://github.com/typicalninja/google-sr/pull/98) [`33993c9`](https://github.com/typicalninja/google-sr/commit/33993c99bcb6f5626f0330f39a441b0de650dac4) Thanks [@typicalninja](https://github.com/typicalninja)! - Fix delay option in searchWithPages function

  The delay option was previously defined in `SearchOptionsWithPages` interface but was not actually implemented in the `searchWithPages` function. This fix adds the missing delay functionality that applies the specified delay (default 1000ms) between page requests, helping to prevent rate limiting.

- [#83](https://github.com/typicalninja/google-sr/pull/83) [`52d4ed8`](https://github.com/typicalninja/google-sr/commit/52d4ed8229f7c897531904f90bcf0aa5924faa35) Thanks [@typicalninja](https://github.com/typicalninja)! - Optimize parser performance by checking for empty data earlier when noPartialResults is enabled

- [#65](https://github.com/typicalninja/google-sr/pull/65) [`fe575b5`](https://github.com/typicalninja/google-sr/commit/fe575b56fb8080d155a54f3b0310f209a44c247c) Thanks [@typicalninja](https://github.com/typicalninja)! - Update dependencies to latest versions

- Updated dependencies [[`352ba4c`](https://github.com/typicalninja/google-sr/commit/352ba4c68b19c74596b5f7fed0f243855da50346), [`cae9f30`](https://github.com/typicalninja/google-sr/commit/cae9f30d98a10b031c8f1833819e30d692f4bfde), [`bb1cc1a`](https://github.com/typicalninja/google-sr/commit/bb1cc1afcd931948b1ebe02bd5627fdc6bc3287e), [`786a8fc`](https://github.com/typicalninja/google-sr/commit/786a8fc47a5d4fc1f32afbf2ad7846d6c614af80), [`51580a6`](https://github.com/typicalninja/google-sr/commit/51580a698cb9f465d00edcf5f64ba56add0c5814), [`6c08082`](https://github.com/typicalninja/google-sr/commit/6c08082c298be3ec26c152764de5f05281b375ca)]:
  - google-sr-selectors@3.0.0

## 5.0.0

### Major Changes

- f9d57ea: Bypass JavaScript requirement for Google search

  In a recent Google update, the ability to access search result pages without enabling JavaScript was disabled.
  (See [#51](https://github.com/typicalninja/google-sr/issues/51) for more details.)

  A workaround that bypasses the JavaScript requirement by utilizing an alternate page version served to specific user agents
  is now implemented. However, this alternate page lacks certain
  features available on the standard page, resulting in the removal of some properties.

  #### Changes to results

  - `OrganicResult` - No user facing changes
  - `TranslateResult` - `translationPronunciation` property was removed
  - `DictionaryResult` - `definition` property was removed in favour of a `meaning` property, check the documentation for more details
  - `CurrencyResult` - No user facing changes
  - `TimeResult` - No user facing changes
  - `KnowledgePanelResult` - `images` and `catalog` properties were removed, new properties `sourceLink` and `imageLink` were added.

### Patch Changes

- Updated dependencies [f9d57ea]
- Updated dependencies [f9d57ea]
- Updated dependencies [f9d57ea]
- Updated dependencies [f9d57ea]
- Updated dependencies [f9d57ea]
  - google-sr-selectors@2.0.0

## 4.1.0

### Minor Changes

- 0d21c7a: Implement knowledge graph results

### Patch Changes

- Updated dependencies [fabb572]
- Updated dependencies [0d21c7a]
  - google-sr-selectors@1.1.0

## 4.0.0

### Major Changes

- 563bfc4: Update dictionary selectors with accurate definitions

  This uses the updated dictionary definitions from google-sr-selectors as a response to google updating their result structure.

  Previously, dictionary definitions were returned as a [string, string]. Now, they are returned as an object with the following properties:

  ```ts
  interface DictionaryDefinition {
    partOfSpeech: string;
    definition: string;
    example: string;
    synonyms: string[];
  }
  ```

  Please take steps to update your code to use the new dictionary definition structure.

- c332095: Rewrite the api to be customizable

  google-sr has been completely rewritten to be more customizable. It is possible to create your own selector functions and use them to scrape the data you want.

  `filterResults` option was replaced by `resultTypes` which accepts a function instead of a string. This allows you to add your own custom selectors to be used as a parser.

  ```diff
  search({
  -      filterResults: [ResultTypes.SearchResult]
  +      resultTypes: []
  })
  ```

  Check the newly added api documentation [here](https://github.com/typicalninja/google-sr/tree/master/packages/google-sr#google-sr-api)

### Minor Changes

- 5676a7a: Support custom selectors

  Use the new `ResultNodeTyper` to create a custom node, and use the `ResultSelector` to create a function that will parse the raw html for results and return a node.

  ```ts
  import { ResultNodeTyper, ResultSelector } from "google-sr";
  // first argument is the "type" value (string) of the node, second is all the properties of the node
  type DidYouKnow = ResultNodeTyper<"SOMETYPE", "prop1" | "prop2"> & {
    // properties that are not string can be defined as this
    descriptions: string[];
  };
  const selector: ResultSelector<DidYouKnow> = ($, strictSelector) => {
    // return node
  };

  search({ resultTypes: [selector] });
  ```

- d98c496: Remove uneeded top level options

  Removed the `safemode` top-level options as the same result can be achieved using the requestConfig option.

  ```diff
  const queryResult = await search({
  -    safemode: true,
      // requestConfig is of type AxiosRequestConfig
  +    requestConfig: {
  +		params: {
  +            // enable "safe mode"
  +			safe: 'active'
  +		},
  +	},
  });
  ```

### Patch Changes

- Updated dependencies [563bfc4]
- Updated dependencies [e1a4af2]
  - google-sr-selectors@1.0.0
