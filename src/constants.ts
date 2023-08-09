import { AxiosRequestConfig } from "axios";

/**
 * Search options supported by the parser
 */
export interface SearchOptions {
    requestOptions: AxiosRequestConfig;
    /**
     * Toggle to enable google safe mode
     */
    safeMode: boolean;
    /*
        jquery selectors (cheerio) to extract data from scraped data
      */
    selectors: {
      block: string;
      title: string;
      description: string;
      link: string;
    };
    /**
     * Page number to fetch. Google page numbers are different that what you might expect
     * we suggest you to use searchWithPages instead
     */
    page: number;
    /**
     * Base url of the service by default google.com/search
     */
    baseUrl: string;
    /**
     * Search query
     */
    query: string;
    /**
     * Sometimes the parsed block may not contains a description if this happens should we that block
     */
    ignoreIfPartial: boolean;
}


export const defaultOptions: SearchOptions = {
  requestOptions: {
    responseType: 'arraybuffer',
    headers: {
        // mimic a real user agent
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 OPR/100.0.0.0',
        'Accept': 'text/plain'
    },
  },
  safeMode: true,
  // these selectors must be updated when necessary
  // last selector update was on 8/9/2023
  selectors: {
    block: ".Gx5Zad.fP1Qef.xpd.EtOod.pkphOe",
    link: "[jsname][data-ved]",
    title: "h3.zBAuLc",
    description: ".BNeawe.s3v9rd.AP7Wnd",
  },
  // by default only the first page is resolved
  page: 0,
  query: '',
  baseUrl: 'https://www.google.com/search',
  ignoreIfPartial: true,
};
