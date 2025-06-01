import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isEmpty, throwNoCheerioError } from "../utils";

// Importing the Selectors from google-sr-selectors
import { TimeSearchSelector } from "google-sr-selectors";

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
export const TimeResult: ResultSelector<TimeResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("TimeResult");
	const block = $(TimeSearchSelector.block).first();
	const location = block.find(TimeSearchSelector.location).text();
	// if we don't find a valid location drop this
	if (location === "") return null;
	const layoutTable = block.find(TimeSearchSelector.timeLayoutTable).first();
	if (!layoutTable) return null;
	const time = layoutTable.find(TimeSearchSelector.time).text();
	const timeInWords = layoutTable.find(TimeSearchSelector.timeInWords).text();
	if (isEmpty(strictSelector, time, timeInWords)) return null;

	return {
		type: ResultTypes.TimeResult,
		location,
		time,
		timeInWords,
	};
};
