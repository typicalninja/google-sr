// Importing the CSS Selectors from google-sr-selectors
import { TimeSearchSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants.js";
import { coerceToStringOrUndefined, throwNoCheerioError } from "../utils.js";

export interface TimeResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.TimeResult;
	location: string; // The location for which the time is being displayed
	time: string; // The time in the specified location
	timeInWords: string; // The time expressed in words (e.g., "3:00 PM")
}

/**
 * Parses time search results.
 * @returns Array of TimeResultNode
 */
export const TimeResult: ResultParser<TimeResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("TimeResult");
	const block = $(TimeSearchSelector.block).first();

	const location = coerceToStringOrUndefined(
		block.find(TimeSearchSelector.location).text(),
	);
	if (noPartialResults && !location) return null;

	const layoutTable = block.find(TimeSearchSelector.timeLayoutTable).first();
	// if no layout table is found, we can't parse the time
	if (!layoutTable) return null;

	const time = coerceToStringOrUndefined(
		layoutTable.find(TimeSearchSelector.time).text(),
	);
	if (noPartialResults && !time) return null;

	const timeInWords = coerceToStringOrUndefined(
		layoutTable.find(TimeSearchSelector.timeInWords).text(),
	);
	if (noPartialResults && !timeInWords) return null;

	return {
		type: ResultTypes.TimeResult,
		location,
		time,
		timeInWords,
	} as TimeResultNode;
};
