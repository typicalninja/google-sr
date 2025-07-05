// Importing the Selectors from google-sr-selectors
import { GeneralSelector, UnitConversionSelector } from "google-sr-selectors";
import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isEmpty, throwNoCheerioError } from "../utils";

export interface UnitConversionResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.UnitConversionResult;
	from: string; // The conversion unit being converted from
	to: string; // The conversion unit being converted to
}

/**
 * Parses unit conversion search results.
 * @returns Array of UnitConversionResultNode
 */
export const UnitConversionResult: ResultSelector<UnitConversionResultNode> = (
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
	const to = block.find(UnitConversionSelector.to).text().trim();

	if (isEmpty(noPartialResults, from, to)) return null;

	return {
		type: ResultTypes.UnitConversionResult,
		from: from,
		to,
	};
};
