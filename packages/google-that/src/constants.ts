import { ResultTypes } from "google-sr";
export interface CLIArguments {
	[x: string]: unknown;
	query: string;
	write: boolean;
	page: number | undefined;
	pages: number | undefined;
	start: number | undefined;
	resultTypes: (typeof ResultTypes)[keyof typeof ResultTypes][];
}

export const resultTypeArray: CLIArguments["resultTypes"] = [
	ResultTypes.OrganicResult,
	ResultTypes.CurrencyResult,
	ResultTypes.DictionaryResult,
	ResultTypes.TimeResult,
	ResultTypes.TranslateResult,
] as const;
