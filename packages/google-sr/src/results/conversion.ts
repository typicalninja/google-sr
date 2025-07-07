// Importing the Selectors from google-sr-selectors
import { GeneralSelector, UnitConversionSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isStringEmpty, throwNoCheerioError } from "../utils";

export interface UnitConversionResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.UnitConversionResult;
	from: string; // The conversion unit being converted from
	to: string; // The conversion unit being converted to
}

/**
 * Parses unit conversion search results.
 * @returns Array of UnitConversionResultNode
 */
export const UnitConversionResult: ResultParser<UnitConversionResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("UnitConversionResult");
	const block = $(GeneralSelector.block).first();
	const from = block
		.find(UnitConversionSelector.from)
		.text()
		.replace("=", "")
		.trim();

	if (noPartialResults && isStringEmpty(from)) return null;

	const to = block.find(UnitConversionSelector.to).text().trim();

	if (noPartialResults && isStringEmpty(to)) return null;

	return {
		type: ResultTypes.UnitConversionResult,
		from: from,
		to,
	};
};
