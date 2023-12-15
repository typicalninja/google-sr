import type { CheerioAPI } from "cheerio";

// only types
import type {
  // nodes
  SearchResultNode,
  TranslateResultNode,
  DictionaryResultNode,
  TimeResultNode,
  CurrencyResultNode
} from "./constants";
import { ResultTypes } from "./constants";

import type { OrganicSearchSelector, TranslateSearchSelector, DictionarySearchSelector, TimeSearchSelector, CurrencyConvertSelector } from 'google-sr-selectors'

import { extractUrlFromGoogleLink } from "./helpers";

/**
 * Loader for Regular Results
 * @param $
 * @param selectors
 * @returns
 * @private
 */
export function loadSearchNodes(
  $: CheerioAPI,
  selectors: typeof OrganicSearchSelector
): SearchResultNode[] {
  const parsedResults: SearchResultNode[] = [];
  $(selectors.block).each((_index, element) => {
    const result = { type: ResultTypes.SearchResult } as SearchResultNode;
    /**
     * Get each item for this element block individually for validation
     */
    const link = $(element).find(selectors.link).attr("href");
    const description = $(element).find(selectors.description).text();
    const title = $(element).find(selectors.title).text();

    if (typeof title === "string") result.title = title;
    if (typeof link === "string")
      result.link = extractUrlFromGoogleLink(link) as string;
    if (typeof description === "string") result.description = description;

    parsedResults.push(result);
  });
  return parsedResults;
}

/**
 * Loader for translation blocks
 * @param $
 * @param selectors
 * @returns
 * @private
 */
export function loadTranslateNodes(
  $: CheerioAPI,
  selectors: typeof TranslateSearchSelector
): TranslateResultNode | null {
  const sourceLanguage = $(selectors.sourceLanguage).text().trim();
  const targetLanguage = $(selectors.targetLanguage).text().trim();

  const translation = $(selectors.translationText).text().trim();
  const source = $(selectors.sourceText).val();
  const pronunciation = $(selectors.pronunciation).text().trim();

  // validate these exist
  if (
    [translation, source, sourceLanguage, targetLanguage].some(
      (value) => value === ""
    )
  )
    return null;

  const result = {
    type: ResultTypes.TranslateResult,
    source: {
      language: sourceLanguage,
      // expect this to be always a string
      text: source as string,
    },
    translation: {
      language: targetLanguage,
      text: translation,
      pronunciation: pronunciation,
    },
  } satisfies TranslateResultNode;

  return result;
}

/**
 * Loader for dictionary blocks
 * @private
 */
export function loadDictionaryNodes(
  $: CheerioAPI,
  selectors: typeof DictionarySearchSelector
): DictionaryResultNode | null {
  const audio = $(selectors.audio).attr("src");
  const phonetic = $(selectors.phonetic).text().trim();
  const word = $(selectors.word).text().trim();

  if([audio, phonetic, word].some(val => val === '')) return null;

  const definitions: [string, string][] = [];

  $(selectors.definitions).each(
    (index, el) => {
      definitions[index] = ["", ""];
      definitions[index][0] = $(el).text().trim();
    }
  );

  $(selectors.examples).each((index, el) => {
    if (definitions[index]) {
      let example = $(el).text().trim();

      if (example.startsWith(`"`)) example = example.slice(1);
      if (example.endsWith(`"`)) example = example.slice(0, example.length - 1);

      definitions[index][1] = example;
    }
  });

  const result = {
    type: ResultTypes.DictionaryResult,
    audio,
    phonetic,
    word,
    definitions,
  } satisfies DictionaryResultNode;

  return result;
}

/**
 * @param $ 
 * @param selectors 
 * @returns 
 * @private
 */
export function loadTimeNode(
  $: CheerioAPI,
  selectors: typeof TimeSearchSelector
): TimeResultNode | null {
  const location = $(selectors.location).text().trim();
  const time = $(selectors.time).text().trim()
  const timeInWords = $(selectors.timeInWords).text().trim();

  if([location, time, timeInWords].some(val => val === '')) return null;

  const result = {
    type: ResultTypes.TimeResult,
    location,
    time,
    timeInWords
  } satisfies TimeResultNode;

  return result
}

/**
 * 
 * @param $ 
 * @param selectors 
 * @returns 
 * @private
 */
export function loadCurrencyNode(
  $: CheerioAPI,
  selectors: typeof CurrencyConvertSelector
): CurrencyResultNode | null {
  const from = $(selectors.from).text().trim();
  const to = $(selectors.to).text().trim();

  const formula = `${from} ${to}`;

  if([to ,from].some(val => val === '')) return null;

  const result = {
    type: ResultTypes.CurrencyResult,
    formula,
    from: from.replace('=', ''),
    to
  } satisfies CurrencyResultNode;

  return result
}
