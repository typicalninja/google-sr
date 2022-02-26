import { AxiosRequestConfig } from "axios";
export declare const REQUEST_URL = "https://www.google.com/search";
declare let defaultSelectors: {
    DescriptionSelector: string;
    LinkSelector: string;
    TitleSelector: string;
};
interface SearchOptions {
    requestOptions?: AxiosRequestConfig;
    safeMode?: boolean;
    page?: number | string;
    selectors?: {
        DescriptionSelector?: string;
        LinkSelector?: string;
        TitleSelector?: string;
    };
}
declare function search(query: string, options?: SearchOptions): Promise<unknown>;
export default search;
export { defaultSelectors, search };
