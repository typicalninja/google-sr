// Importing the CSS Selectors from google-sr-selectors
import { GeneralSelector, TimeSearchSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isStringEmpty, throwNoCheerioError } from "../utils";

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
	const location = block.find(TimeSearchSelector.location).text();
	// if we don't find a valid location drop this
	if (noPartialResults && isStringEmpty(location)) return null;
	const layoutTable = block.find(TimeSearchSelector.timeLayoutTable).first();
	if (!layoutTable) return null;
	const time = layoutTable.find(TimeSearchSelector.time).text();
	// if we don't find a valid time drop this
	if (noPartialResults && isStringEmpty(time)) return null;
	const timeInWords = layoutTable.find(TimeSearchSelector.timeInWords).text();
	// if we don't find a valid time in words drop this
	if (noPartialResults && isStringEmpty(timeInWords)) return null;

	return {
		type: ResultTypes.TimeResult,
		location,
		time,
		timeInWords,
	};
};
