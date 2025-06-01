import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isEmpty, throwNoCheerioError } from "../utils";

// Importing the Selectors from google-sr-selectors
import { CurrencyConvertSelector, GeneralSelector } from "google-sr-selectors";

export interface CurrencyResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.CurrencyResult;
	from: string; // The currency being converted from
	to: string; // The currency being converted to
}

/**
 * Parses currency convert search results.
 * @returns Array of CurrencyResultNode
 */
export const CurrencyResult: ResultSelector<CurrencyResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("CurrencyResult");
	const block = $(GeneralSelector.block).first();
	const from = block
		.find(CurrencyConvertSelector.from)
		.text()
		.replace("=", "")
		.trim();
	const to = block.find(CurrencyConvertSelector.to).text().trim();
	if (isEmpty(strictSelector, from, to)) return null;

	return {
		type: ResultTypes.CurrencyResult,
		from: from,
		to,
	};
};
