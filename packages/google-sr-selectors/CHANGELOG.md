# google-sr-selectors

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
