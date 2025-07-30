# google-sr-selectors

## 3.0.0

### Major Changes

- [`786a8fc`](https://github.com/typicalninja/google-sr/commit/786a8fc47a5d4fc1f32afbf2ad7846d6c614af80) Thanks [@typicalninja](https://github.com/typicalninja)! - Rename CurrencyConvertSelector to UnitConversionSelector

  Rename `CurrencyConvertSelector` to `UnitConversionSelector` to better reflect its ability to handle all conversion queries (currency, units, measurements, etc.), not just currency conversions.

  **Breaking Changes:**

  - `CurrencyConvertSelector` → `UnitConversionSelector`

  ```diff
  - import { CurrencyConvertSelector } from 'google-sr-selectors';
  + import { UnitConversionSelector } from 'google-sr-selectors';
  ```

### Minor Changes

- [#90](https://github.com/typicalninja/google-sr/pull/90) [`352ba4c`](https://github.com/typicalninja/google-sr/commit/352ba4c68b19c74596b5f7fed0f243855da50346) Thanks [@typicalninja](https://github.com/typicalninja)! - Add metadata selectors to OrganicSearchSelector

  This release adds new CSS selectors for extracting metadata from Google search results:

  The `metaSource` and `metaAd` selectors are nested within the `metaContainer` element.

  ```ts
  const OrganicSearchSelector = {
    metaContainer: "span.qXLe6d.dXDvrc",
    metaSource: "span.fYyStc:last-of-type",
    metaAd: "span.dloBPe.fYyStc",
  };
  ```

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

- [#96](https://github.com/typicalninja/google-sr/pull/96) [`51580a6`](https://github.com/typicalninja/google-sr/commit/51580a698cb9f465d00edcf5f64ba56add0c5814) Thanks [@typicalninja](https://github.com/typicalninja)! - Add RelatedSearchesSelector for parsing related search queries

  Add new CSS selectors for extracting related search suggestions that appear at the bottom of Google search results.

- [#94](https://github.com/typicalninja/google-sr/pull/94) [`6c08082`](https://github.com/typicalninja/google-sr/commit/6c08082c298be3ec26c152764de5f05281b375ca) Thanks [@typicalninja](https://github.com/typicalninja)! - Migrate packages to ESM-first with CJS compatibility via dual build

  All packages have been migrated from CJS-first to ESM-first architecture. Existing users can continue using the packages without any code changes as both ESM and CJS builds are provided.

## 2.0.0

### Major Changes

- f9d57ea: Update dictionary result selectors

  Following selectors were replaced with new ones / removed.

  ```json5
  {
    audio: "...",
    definition: "...",
    definitionPartOfSpeech: "...",
    definitionExample: "...",
    definitionSynonyms: "...",
  }
  ```

  The following selectors are the replacement for the above selectors.

  ```json5
  {
    definitionsContainer: "...",
    // container has multiple of these blocks
    definitionsBlock: "...",
    // within a definition block
    definitionPartOfSpeech: "...",
    definitionList: "...",
    // the selector for synonyms and examples are the same
    definitionTextBlock: "...",
  }
  ```

- f9d57ea: Update translate result selectors

  Following selectors were replaced with new ones / removed.

  ```json5
  {
    translationText: "...",
    sourceLanguage: "...",
    targetLanguage: "...",
  }
  ```

  The following selectors are the replacement for the above selectors.

  - `translateFromTo` -> `sourceLanguage` and `targetLanguage`
    - translateFromTo is a string in the format of `sourceLanguage to targetLanguage`
  - `translatedText` -> `translationText`

- f9d57ea: Update knowledge panel result selectors

  Following selectors are no longer available.

  ```json5
  {
    catalogBlock: "...",
    catalogTitle: "...",
    catalogItem: "...",
    catalogItemImage: "...",
    catalogItemTitle: "...",
    catalogItemCaption: "...",
  }
  ```

  Following selectors have some changes on how they are used (or new).

  ```json5
  {
    // Direct children of the first element
    // obtained via the `headerBlock` selector.
    title: "...",
    label: "...",
    // This is a child of the second element
    // obtained via `headerBlock` selector
    imageUrl: "...",
    // description block contains description and metadata (description source link)
    // the first span is the description
    // and the first "<a>" is the source link
    descriptionBlock: "...",
  }
  ```

- f9d57ea: Update organic search result selectors

  Following selectors were moved to a separate `GeneralSelector`,
  other usages stay similar

  ```json5
  {
    block: "",
  }
  ```

### Patch Changes

- f9d57ea: Patch currency and time result selectors

## 1.1.0

### Minor Changes

- 0d21c7a: Add selectors for knowledge graph results

### Patch Changes

- fabb572: patch the translate search result selectors

## 1.0.0

### Major Changes

- 563bfc4: Patch dictionary selectors

  google updated the page structure a while back. this affected definitions and word selector.
  the definition selector was expanded to multiple seperate selectors to include every part of a definition, such as example, synonyms, part of speech.

### Patch Changes

- e1a4af2: Patch organic search block selector
