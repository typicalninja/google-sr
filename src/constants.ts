import { AxiosRequestConfig } from "axios";

export interface SearchSelectors {
  block: string;
  link: string;
  title: string;
  description: string;
}

export interface TranslateSelectors {
  sourceLanguage: string;
  targetLanguage: string;
  translationText: string;
  sourceText: string;
  pronunciation: string;
}

/**
 * Search options supported by the parser
 */
export interface SearchOptions {
  /**
   * Options for axios request
   */
  requestOptions: AxiosRequestConfig;
  /**
   * Toggle to enable google safe mode
   */
  safeMode: boolean;
  /** 
   * jquery selectors (cheerio) to extract data from scraped data
  */
  selectors: {
    SearchNodes: SearchSelectors;
    TranslateNodes: TranslateSelectors;
  }
  /**
   * Page number to fetch. Google page numbers are different that what you might expect
   * we suggest you to use searchWithPages instead
   */
  page: number;
  /**
   * Sets the filter parameter in search query, filtering unrelated data
   */
  omitUnrelated: boolean;
  /**
   * Base url of the service by default google.com/search
   */
  baseUrl: string;
  /**
   * Search query
   */
  query: string;
}


export const defaultOptions: SearchOptions = {
  requestOptions: {
    responseType: "text",
    responseEncoding: 'utf-8',
    headers: {
      // mimic a real user agent
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0",
      Accept: "text/plain",
    },
  },
  safeMode: true,
  // these selectors must be updated when necessary
  // last selector update was on 8/15/2023
  selectors: {
    SearchNodes: {
      block: ".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe",
      link: "[jsname][data-ved]",
      title: "h3.zBAuLc",
      description: ".BNeawe.s3v9rd.AP7Wnd",
    },
    TranslateNodes: {
      sourceLanguage: '#tsuid_2 option:selected',
      targetLanguage: '#tsuid_4 option:selected',
      translationText: '[id="lrtl-translation-text"]',
      sourceText: '#lrtl-source-text input[name="tlitetxt"]',
      pronunciation: '[id="lrtl-transliteration-text"]'
    }
  },
  // by default only the first page is resolved
  page: 0,
  omitUnrelated: true,
  query: "",
  baseUrl: "https://www.google.com/search",
};

export enum ResultTypes {
  SearchResult = "SEARCH",
  TranslateResult = "TRANSLATE"
}



export interface SearchResultNode {
  /** Type of this result node */
  type: ResultTypes.SearchResult;
  /**
   * Link or url of this search result
   */
  link: string;
  description: string;
  title: string;
}

export interface TranslateResultNode {
  /** Type of this result node */
  type: ResultTypes.TranslateResult;
  /**
   * Source for translation
   */
  source: {
    /**
     * Language of the source text
     */
    language: string;
    /**
     * Source text
     */
    text: string;
  };
  /**
   * Translated content
   */
  translation: {
    /**
     * Language of the translated text
     */
    language: string;
    /**
     * translated text
     */
    text: string;
    /**
     * Pronunciation of the translation in english
     */
    pronunciation: string;
  };
}

export type ResultNode = SearchResultNode | TranslateResultNode;
