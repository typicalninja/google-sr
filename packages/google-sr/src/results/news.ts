import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import { isEmpty, throwNoCheerioError } from "../utils";

// Importing the Selectors from google-sr-selectors
import { GeneralSelector, NewsSearchSelector } from "google-sr-selectors";

export interface NewsResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.NewsResult;
	title: string;
	description: string;
	link: string;
	source: string;
	published_date: string;
}

/**
 * Parses news search results.
 * @returns Array of NewsResultNode
 */
export const NewsResult: ResultSelector<NewsResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("NewsResult");
	const parsedResults: NewsResultNode[] = [];
	const newsSearchBlocks = $(GeneralSelector.block).toArray();
	// parse each block individually for its content
	// TODO: switched from cheerio.each to for..of loop (check performance in future tests)
	for (const element of newsSearchBlocks) {
		const rawLink =
			$(element).find(NewsSearchSelector.link).attr("href") ?? null;
		// if not links is found it's not a valid result, we can safely skip it
		// most likely the first result can be a special block
		if (typeof rawLink !== "string") continue;
		// input: /url?q=https://example.com/about/&sa=U&ved=2ahUKEwi3tJu44JKNAxWc3gIHHdgBDogQxfQBegQIBRAC&usg=AOvVaw0yniKHiOvXs1sdLqSWk5zO
		// output: https://example.com/about/
		const link = rawLink.slice(7).split("&sa=")[0];

		const title = $(element).find(NewsSearchSelector.title).text();

		const description =
			$(element).find(NewsSearchSelector.description).text() ?? "";

		const source = $(element).find(NewsSearchSelector.source).text() ?? "";

		const published_date =
			$(element).find(NewsSearchSelector.published_date).text() ?? "";

		// both title, description, source and published_date can be empty, we skip the result only if strictSelector is true
		if (isEmpty(strictSelector, title, source, description, published_date))
			continue;

		parsedResults.push({
			type: ResultTypes.NewsResult,
			link,
			title,
			description,
			source,
			published_date,
		});
	}

	return parsedResults;
};
