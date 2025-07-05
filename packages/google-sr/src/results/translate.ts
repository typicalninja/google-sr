import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
	TranslateSourceTextRegex,
} from "../constants";
import { isEmpty, throwNoCheerioError } from "../utils";

// Importing the Selectors from google-sr-selectors
import { GeneralSelector, TranslateSearchSelector } from "google-sr-selectors";

export interface TranslateResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.TranslateResult;
	sourceLanguage: string;
	translationLanguage: string;
	sourceText: string;
	translatedText: string;
}

/**
 * Parses translation search results.
 * @returns Array of TranslateSearchResultNodes
 */
export const TranslateResult: ResultSelector<TranslateResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("TranslateResult");
	// only one block is expected, and it should be the first one
	const translateBlock = $(GeneralSelector.block).first();
	if (!translateBlock) return null;
	// old version does not have separate source and target language
	// instead it has ex "English (detected) to Spanish "
	const translatedFromTo = translateBlock
		.find(TranslateSearchSelector.translateFromTo)
		.text();
	const fromTo = translatedFromTo.split(" to ");
	// we expect only 2 languages, source and target
	if (fromTo.length !== 2) return null;

	const sourceLanguage = fromTo[0].trim();
	const translationLanguage = fromTo[1].trim();
	// source text is in the format "hello" in Japanese
	const sourceTextBlock = translateBlock
		.find(TranslateSearchSelector.sourceText)
		.text()
		.trim();
	const sourceText = sourceTextBlock.match(TranslateSourceTextRegex)?.[1] ?? "";

	const translatedText = translateBlock
		.find(TranslateSearchSelector.translatedText)
		.text()
		.trim();

	if (
		isEmpty(
			noPartialResults,
			sourceLanguage,
			translationLanguage,
			sourceText,
			translatedText,
		)
	)
		return null;

	return {
		type: ResultTypes.TranslateResult,
		sourceLanguage,
		translationLanguage,
		sourceText,
		translatedText,
	};
};
