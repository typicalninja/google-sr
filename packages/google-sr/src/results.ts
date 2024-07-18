import {
  ResultSelector,
  ResultTypes,
  //
  OrganicResultNode,
  TranslateResultNode,
  DictionaryResultNode,
  TimeResultNode,
  CurrencyResultNode,
} from "./constants";
import {
  OrganicSearchSelector,
  TranslateSearchSelector,
  DictionarySearchSelector,
  TimeSearchSelector,
  CurrencyConvertSelector,
} from "google-sr-selectors";
import { extractUrlFromGoogleLink, isEmpty, throwNoCheerioError } from "./utils";

/**
 * Parses regular non-ads search results.
 * @returns Array of OrganicSearchResultNodes
 */
export const OrganicResult: ResultSelector<OrganicResultNode> = ($, strictSelector) => {
  if (!$) throwNoCheerioError("OrganicResult");
  const parsedResults: OrganicResultNode[] = [];
  const organicSearchBlocks = $(OrganicSearchSelector.block).toArray();
  // parse each block individually for its content
  // TODO: switched from cheerio.each to for..of loop (check performance in future tests)
  for (const element of organicSearchBlocks) {
    let link = $(element).find(OrganicSearchSelector.link).attr("href") as string;
    let description = $(element).find(OrganicSearchSelector.description).text() as string;
    let title = $(element).find(OrganicSearchSelector.title).text();

    if (typeof link === "string")
      link = extractUrlFromGoogleLink(link) as string;
    if (typeof description === "string") description = description;

    if(isEmpty(strictSelector, link, description, title)) continue;

    parsedResults.push({
      type: ResultTypes.OrganicResult,
      link: link,
      description,
      title,
    });
  }

  return parsedResults;
};

/**
 * Parses translation search results.
 * @returns Array of TranslateSearchResultNodes
 */
export const TranslateResult: ResultSelector<TranslateResultNode> = ($, strictSelector) => {
  if (!$) throwNoCheerioError("TranslateResult");
  const sourceLanguage = $(TranslateSearchSelector.sourceLanguage)
    .text()
    .trim();
  let sourceText = $(TranslateSearchSelector.sourceText).val() as string;


  const translationText = $(TranslateSearchSelector.translationText).text().trim();
  const translationLanguage = $(TranslateSearchSelector.targetLanguage)
  .text()
  .trim();
  const translationPronunciation = $(TranslateSearchSelector.pronunciation).text().trim();


  if(isEmpty(strictSelector, sourceLanguage, translationLanguage, sourceText, translationText, translationPronunciation)) return null;

  return {
    type: ResultTypes.TranslateResult,
    sourceLanguage,
    sourceText,

    translationLanguage,
    translationText,
    translationPronunciation
  };
};

/**
 * Parses dictionary search results.
 * @returns Array of DictionaryResultNode
 */
export const DictionaryResult: ResultSelector<DictionaryResultNode> = ($, strictSelector) => {
  if (!$) throwNoCheerioError("DictionaryResult");
  const audio = $(DictionarySearchSelector.audio).attr("src") || "";
  const phonetic = $(DictionarySearchSelector.phonetic).text().trim();
  const word = $(DictionarySearchSelector.word).text().trim();

  const definitions: [string, string][] = []; 

  $(DictionarySearchSelector.definitions).each(
    (index, el) => {
      definitions[index] = ["", ""];
      definitions[index][0] = $(el).text().trim();
    }
  );

  $(DictionarySearchSelector.examples).each((index, el) => {
    if (definitions[index]) {
      let example = $(el).text().trim();

      if (example.startsWith(`"`)) example = example.slice(1);
      if (example.endsWith(`"`)) example = example.slice(0, example.length - 1);

      definitions[index][1] = example;
    }
  });

  if(isEmpty(strictSelector, audio, phonetic, word)) return null;

  return {
    type: ResultTypes.DictionaryResult,
    audio,
    phonetic,
    word,
    definitions,
  }
};


/**
 * Parses time search results.
 * @returns Array of TimeResultNode
 */
export const TimeResult: ResultSelector<TimeResultNode> = ($, strictSelector) => {
  if (!$) throwNoCheerioError("TimeResult");
  const location = $(TimeSearchSelector.location).text().trim();
  const time = $(TimeSearchSelector.time).text().trim();
  const timeInWords = $(TimeSearchSelector.timeInWords).text().trim();

  if(isEmpty(strictSelector, location, time, timeInWords)) return null;

  return {
    type: ResultTypes.TimeResult,
    location,
    time,
    timeInWords
  };
};

/**
 * Parses currency convert search results.
 * @returns Array of CurrencyResultNode
 */
export const CurrencyResult: ResultSelector<CurrencyResultNode> = ($, strictSelector) => {
  if (!$) throwNoCheerioError("CurrencyResult");
  const from = $(CurrencyConvertSelector.from).text().replace('=', '').trim();
  const to = $(CurrencyConvertSelector.to).text().trim();


  if(isEmpty(strictSelector, from, to)) return null;

  return {
    type: ResultTypes.CurrencyResult,
    from: from,
    to
  };
}; 