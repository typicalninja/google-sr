import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isEmpty, throwNoCheerioError } from "../utils";

// Importing the Selectors from google-sr-selectors
import { GeneralSelector, UnitConversionSelector } from "google-sr-selectors";

export interface UnitConversionResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.UnitConversionResult;
	from: string; // The currency being converted from
	to: string; // The currency being converted to
}

/**
 * Parses currency convert search results.
 * @returns Array of CurrencyResultNode
 */
export const UnitConversionResult: ResultSelector<UnitConversionResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("UnitConversionResult");
	const block = $(GeneralSelector.block).first();
	const from = block
		.find(UnitConversionSelector.from)
		.text()
		.replace("=", "")
		.trim();
	const to = block.find(UnitConversionSelector.to).text().trim();

	if (isEmpty(strictSelector, from, to)) return null;

	return {
		type: ResultTypes.UnitConversionResult,
		from: from,
		to,
	};
};
