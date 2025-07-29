import { GeneralSelector, UnitConversionSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants.js";
import { coerceToStringOrUndefined, throwNoCheerioError } from "../utils.js";

export interface UnitConversionResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.UnitConversionResult;
	from: string; // The conversion unit being converted from
	to: string; // The conversion unit being converted to
}

/**
 * Parses unit conversion search results.
 *
 * @example
 * ```ts
 * import { UnitConversionResult, search } from 'google-sr';
 *
 * const results = await search({
 * 	query: '100 USD to EUR',
 * 	parsers: [UnitConversionResult],
 * });
 * ```
 *
 * @param $ - The CheerioAPI instance
 * @param noPartialResults - Whether to exclude results with missing properties
 * @returns
 * - If noPartialResults is true: {@link UnitConversionResultNode} object or null
 * - If noPartialResults is false: {@link PartialExceptType}<{@link UnitConversionResultNode}> object or null
 */
export const UnitConversionResult: ResultParser<UnitConversionResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("UnitConversionResult");
	const block = $(GeneralSelector.block).first();
	if (!block.length) return null;

	const from = coerceToStringOrUndefined(
		block.find(UnitConversionSelector.from).text().replace("=", "").trim(),
	);

	if (noPartialResults && !from) return null;

	const to = coerceToStringOrUndefined(
		block.find(UnitConversionSelector.to).text().trim(),
	);

	if (noPartialResults && !to) return null;

	return {
		type: ResultTypes.UnitConversionResult,
		from: from,
		to,
	} as UnitConversionResultNode;
};
