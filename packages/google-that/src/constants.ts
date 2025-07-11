import { ResultTypes } from "google-sr";
export interface CLIArguments {
	[x: string]: unknown;
	query: string | undefined;
	queries: (string | number)[] | undefined;
	write: string | undefined;
	page: number | undefined;
	pages: number | undefined;
	start: number | undefined;
	parsers: (typeof ResultTypes)[keyof typeof ResultTypes][];
}

export const parserTypeArray: CLIArguments["parsers"] = [
	ResultTypes.OrganicResult,
	ResultTypes.UnitConversionResult,
	ResultTypes.DictionaryResult,
	ResultTypes.TimeResult,
	ResultTypes.TranslateResult,
] as const;
