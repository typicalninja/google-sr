import { GeneralSelector, TranslateSearchSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
	TranslateSourceTextRegex,
} from "../constants";
import { coerceToStringOrUndefined, throwNoCheerioError } from "../utils";

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
export const TranslateResult: ResultParser<TranslateResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("TranslateResult");
	// only one block is expected, and it should be the first one
	const translateBlock = $(GeneralSelector.block).first();
	// if we don't find a valid block drop this
	if (!translateBlock.length) return null;

	// old version does not have separate source and target language
	// instead it has ex "English (detected) to Spanish "
	const translatedFromTo = coerceToStringOrUndefined(
		translateBlock.find(TranslateSearchSelector.translateFromTo).text(),
	);
	if (noPartialResults && !translatedFromTo) return null;

	let sourceLanguage: string | undefined;
	let translationLanguage: string | undefined;

	if (translatedFromTo) {
		const fromTo = translatedFromTo.split(" to ");
		// we expect only 2 languages, source and target
		// so if we don't have exactly 2 parts, we can't parse it correctly
		if (fromTo.length !== 2) return null;
		sourceLanguage = coerceToStringOrUndefined(fromTo[0].trimEnd());
		translationLanguage = coerceToStringOrUndefined(fromTo[1].trim());
	}

	if (noPartialResults && (!sourceLanguage || !translationLanguage))
		return null;

	// source text is in the format "hello" in Japanese
	const sourceTextBlock = coerceToStringOrUndefined(
		translateBlock.find(TranslateSearchSelector.sourceText).text(),
	);

	if (noPartialResults && !sourceTextBlock) return null;

	let sourceText: string | undefined;
	if (sourceTextBlock) {
		sourceText = sourceTextBlock.match(TranslateSourceTextRegex)?.[1];
	}

	if (noPartialResults && !sourceText) return null;

	const translatedText = coerceToStringOrUndefined(
		translateBlock.find(TranslateSearchSelector.translatedText).text(),
	);

	if (noPartialResults && !translatedText) return null;

	return {
		type: ResultTypes.TranslateResult,
		sourceLanguage,
		translationLanguage,
		sourceText,
		translatedText,
	} as TranslateResultNode;
};
