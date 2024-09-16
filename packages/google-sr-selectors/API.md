# Table of Contents

* [google-sr-selectors API](#google-sr-selectors-api)
  * [OrganicResult](#organicresult)
  * [TranslateResult](#translateresult)
  * [DictionaryResult](#dictionaryresult)
  * [TimeResult](#timeresult)
  * [CurrencyResult](#currencyresult)

# google-sr-selectors API

## OrganicResult

```ts
interface OrganicSearchSelector: {
    block: string;
    link: string;
    title: string;
    description: string;
};
```

## TranslateResult

```ts
interface TranslateSearchSelector: {
    sourceLanguage: string;
    targetLanguage: string;
    translationText: string;
    sourceText: string;
    pronunciation: string;
};
```

## DictionaryResult

```ts
interface DictionarySearchSelector: {
    audio: string;
    phonetic: string;
    word: string;
    definition: string;
    definitionPartOfSpeech: string;
    definitionExample: string;
    definitionSynonyms: string;
};
```

## TimeResult

```ts
interface TimeSearchSelector: {
    location: string;
    time: string;
    timeInWords: string;
};
```

## CurrencyResult

```ts
interface CurrencyConvertSelector: {
    from: string;
    to: string;
};
```