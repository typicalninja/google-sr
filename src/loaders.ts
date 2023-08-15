import { type CheerioAPI } from "cheerio";
import {
  SearchSelectors,
  SearchResultNode,
  ResultTypes,
  TranslateSelectors,
  TranslateResultNode,
} from "./constants";
import { extractUrlFromGoogleLink } from "./helpers";

/**
 * Loader for Regular Results
 * @param $
 * @param selectors
 * @returns
 */
export function loadSearchNodes(
  $: CheerioAPI,
  selectors: SearchSelectors
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
 */
export function loadTranslateNodes(
  $: CheerioAPI,
  selectors: TranslateSelectors
): TranslateResultNode[] {
  const sourceLanguage = $(selectors.sourceLanguage);
  const targetLanguage = $(selectors.targetLanguage);

  const translation = $(selectors.translationText);
  const source = $(selectors.sourceText);
  const pronunciation = $(selectors.pronunciation);

  const result = {
    type: ResultTypes.TranslateResult,
    source: {
      language: sourceLanguage.text(),
      // expect this to be always a string
      text: source.val() as string,
    },
    translation: {
      language: targetLanguage.text(),
      text: translation.text(),
      pronunciation: pronunciation.text(),
    },
  } satisfies TranslateResultNode;

  return [result];
}
