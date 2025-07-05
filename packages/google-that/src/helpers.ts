import {
	DictionaryResult,
	KnowledgePanelResult,
	OrganicResult,
	type ResultSelector,
	ResultTypes,
	TimeResult,
	TranslateResult,
	UnitConversionResult,
} from "google-sr";
import type { CLIArguments } from "./constants.js";

// validates the options passed in
// Follows following rules:
// - query is required
// - pages and page are mutually exclusive
// - start and pages are mutually exclusive
export function validateOptions(options: CLIArguments): boolean {
	if (!options.query && !Array.isArray(options.queries)) {
		console.log("Please specify -q <query> or -Q <queries>");
		return false;
	}

	if (options.start && !options.pages && !options.page) {
		console.log(
			"Start can only be used when pages (-P) or page (-p) is specified",
		);
		return false;
	}

	return true;
}

export function selectorTypeToSelector(selector: string): ResultSelector {
	switch (selector) {
		case ResultTypes.OrganicResult:
			return OrganicResult;
		case ResultTypes.TimeResult:
			return TimeResult;
		case ResultTypes.TranslateResult:
			return TranslateResult;
		case ResultTypes.DictionaryResult:
			return DictionaryResult;
		case ResultTypes.UnitConversionResult:
			return UnitConversionResult;
		case ResultTypes.KnowledgePanelResult:
			return KnowledgePanelResult;
		default:
			throw new Error(`Unknown selector type: ${selector}`);
	}
}

export function selectorTypeArrayToSelector(
	selector: string[],
): ResultSelector[] {
	const selectors: ResultSelector[] = [];

	for (const type of selector) {
		selectors.push(selectorTypeToSelector(type));
	}

	return selectors;
}
