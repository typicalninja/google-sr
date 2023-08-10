import { AxiosRequestConfig } from "axios";
import { SearchOptions } from "./constants";

/**
 * Extract the actual webpage link from a href tag result
 * @param googleLink
 * @returns
 */
export function extractUrlFromGoogleLink(googleLink: string): string | null {
  // regex to match the part
  // ! as of 8/9/2023:
  // following is how the link will look:
  // * /url?q=https://expressjs.com/&sa=U&ved=2ahUKEwihg46ous-AAxU8XaQEHWwVBxIQFnoECAgQAg&usg=AOvVaw0RwID-oweDOqO2Pg_8gWi1
  const match = googleLink.match(/\/url\?q=([^&]+)/);
  if (match) {
    const decodedUrl = decodeURIComponent(match[1]);
    return decodedUrl;
  }
  // link could not be parsed
  return null;
}


// construct the url to scrape
export function constructSearchQuery(query: string, options: SearchOptions): AxiosRequestConfig {
    const params = new URLSearchParams();
    params.append('gbv', '1')
    params.append("q", query);
    // if safe mode is enabled, we need to add the safe mode parameter
    if (options.safeMode) {
      params.append("safe", "active");
    }

    if(!options.omitUnrelated) {
      params.append('filter', '0')
    }

    // if options defined a page number, we need to add it to the query as the start parameter
    if (options.page) {
      params.append("start", options.page.toString());
    }
  
    return {
        params,
        ...options.requestOptions
    }
}

/**
 * Convert a normal page to google query page
 */
export function pageToGoogleQueryPage(page: number) {
    return Math.max((page * 10) - 10, 0)
}

export const generateArrayOfNumbers = (maxNumber: number) => new Array(maxNumber).fill(0).map((_, index) => index + 1)