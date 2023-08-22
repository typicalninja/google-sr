import type { AxiosRequestConfig } from "axios";
import type { SearchOptions } from "./constants";
import { deepmerge } from "deepmerge-ts";

/**
 * Extract the actual webpage link from a href tag result
 * @param googleLink
 * @returns
 * @private
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

/**
 * Constructs the axios config by deep merging user provided config
 * @private
 */
export function constructSearchConfig(
  options: SearchOptions
): AxiosRequestConfig {
  const AxiosRequestOptions = options.requestConfig || { headers: {} };

  // add headers
  AxiosRequestOptions.headers = deepmerge(
    {
      Accept: "text/html",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "en-US,en",
      Referer: "https://www.google.com/",
      "upgrade-insecure-requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    },
    AxiosRequestOptions.headers || {}
  );

  const params = new URLSearchParams(AxiosRequestOptions.params ?? undefined);

  // necessary parameter for non js search page
  params.append("gbv", "1");

  // main query parameter
  params.append("q", options.query);

  // if safe mode is enabled, we need to add the safe mode parameter
  if (options.safeMode) {
    params.append("safe", "active");
  }

  // if options defined a page number, we need to add it to the query as the start parameter
  if (options.page) {
    params.append("start", options.page.toString());
  }

  const newConfig = {
    params,
    // require response data
    responseType: "text",
    responseEncoding: "utf-8",
  } as AxiosRequestConfig;

  return deepmerge(AxiosRequestOptions, newConfig);
}

/**
 * Convert a normal page to google query page
 */
export function pageToGoogleQueryPage(page: number) {
  return Math.max(page * 10 - 10, 0);
}

export const generateArrayOfNumbers = (maxNumber: number) =>
  new Array(maxNumber).fill(0).map((_, index) => index + 1);
