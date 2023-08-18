import type { ResultTypes } from "google-sr";

export interface InputForm {
    queries: string[];
    searchType: ResultTypes;
    safeMode: boolean;
    pages: number;
    savePath: string;
    resultType: 'JSON' | 'TXT' | 'HTML'
}

export const estimateOffset = 1000