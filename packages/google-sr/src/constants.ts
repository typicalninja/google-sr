import type { CheerioAPI } from "cheerio";
import type { ResultNodeTyper } from "./utils";
import type { AxiosRequestConfig } from "axios";

export const ResultTypes = {
  OrganicResult: "ORGANIC",
  TranslateResult: "TRANSLATE",
  DictionaryResult: "DICTIONARY",
  TimeResult: "TIME",
  CurrencyResult: "CURRENCY",
} as const;

// Specific result types returned by gsr
export type OrganicResultNode = ResultNodeTyper<typeof ResultTypes.OrganicResult, "title" | "description" | "link">;
export type TranslateResultNode = ResultNodeTyper<typeof ResultTypes.TranslateResult, "sourceLanguage" | "translationLanguage" | "sourceText" | "translationText" | "translationPronunciation">;
// Dictionary result contains a special property called definitions which is an array
export type DictionaryResultNode = ResultNodeTyper<typeof ResultTypes.DictionaryResult, "audio" | "phonetic" | "word"> & { definitions: [string, string][] };
export type TimeResultNode = ResultNodeTyper<typeof ResultTypes.TimeResult, "location" | "time" | "timeInWords">;
export type CurrencyResultNode = ResultNodeTyper<typeof ResultTypes.CurrencyResult, "from" | "to">;

// All possible result types as a union
export type SearchResultNode = OrganicResultNode | TranslateResultNode | DictionaryResultNode | TimeResultNode | CurrencyResultNode;
// the type used to identify a parser/selector function
export type ResultSelector<R extends SearchResultNode = SearchResultNode> = (cheerio: CheerioAPI, strictSelector: boolean) => R[] | R | null;
export interface SearchOptions<R extends ResultSelector = ResultSelector> {
  /**
   * Search query
   */
  query: string;
  /**
   * Toggle to enable google safe mode
   */
  safeMode?: boolean;
  /**
   * Page number to fetch. Google page numbers are different that what you might expect
   * we suggest you to use searchWithPages instead
   */
  page?: number;
  /**
   * Control the type of results returned (can have a significant performance impact)
   */
  resultTypes?: R[];

  /**
   * when true, will only return resultNodes that do not contain any undefined/empty properties
   */
  strictSelector?: boolean;

  /**
   * Custom request configuration to be sent with the request
   */
  requestConfig?: AxiosRequestConfig;
}
