import {
	CurrencyConvertSelector,
	DictionarySearchSelector,
	OrganicSearchSelector,
	TimeSearchSelector,
	TranslateSearchSelector,
} from "google-sr-selectors";
import {
	type CurrencyResultNode,
	type DictionaryDefinition,
	type DictionaryResultNode,
	//
	type OrganicResultNode,
	type ResultSelector,
	ResultTypes,
	type TimeResultNode,
	type TranslateResultNode,
} from "./constants";
import {
	extractUrlFromGoogleLink,
	isEmpty,
	throwNoCheerioError,
} from "./utils";

/**
 * Parses regular non-ads search results.
 * @returns Array of OrganicSearchResultNodes
 */
export const OrganicResult: ResultSelector<OrganicResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("OrganicResult");
	const parsedResults: OrganicResultNode[] = [];
	const organicSearchBlocks = $(OrganicSearchSelector.block).toArray();
	// parse each block individually for its content
	// TODO: switched from cheerio.each to for..of loop (check performance in future tests)
	for (const element of organicSearchBlocks) {
		let link = $(element)
			.find(OrganicSearchSelector.link)
			.attr("href") as string;
		const description = $(element)
			.find(OrganicSearchSelector.description)
			.text() as string;
		const title = $(element).find(OrganicSearchSelector.title).text();

		if (typeof link === "string")
			link = extractUrlFromGoogleLink(link) as string;

		if (isEmpty(strictSelector, link, description, title)) continue;

		parsedResults.push({
			type: ResultTypes.OrganicResult,
			link: link,
			description,
			title,
		});
	}

	return parsedResults;
};

/**
 * Parses translation search results.
 * @returns Array of TranslateSearchResultNodes
 */
export const TranslateResult: ResultSelector<TranslateResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("TranslateResult");
	const sourceLanguage = $(TranslateSearchSelector.sourceLanguage)
		.text()
		.trim();
	const sourceText = $(TranslateSearchSelector.sourceText).val() as string;

	const translationText = $(TranslateSearchSelector.translationText)
		.text()
		.trim();
	const translationLanguage = $(TranslateSearchSelector.targetLanguage)
		.text()
		.trim();
	const translationPronunciation = $(TranslateSearchSelector.pronunciation)
		.text()
		.trim();

	if (
		isEmpty(
			strictSelector,
			sourceLanguage,
			translationLanguage,
			sourceText,
			translationText,
			translationPronunciation,
		)
	)
		return null;

	return {
		type: ResultTypes.TranslateResult,
		sourceLanguage,
		sourceText,

		translationLanguage,
		translationText,
		translationPronunciation,
	};
};

/**
 * Parses dictionary search results.
 * @returns Array of DictionaryResultNode
 */
export const DictionaryResult: ResultSelector<DictionaryResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("DictionaryResult");
	const audio = $(DictionarySearchSelector.audio).attr("src") || "";
	const phonetic = $(DictionarySearchSelector.phonetic).first().text().trim();
	const word = $(DictionarySearchSelector.word).text().trim();

	const definitions: DictionaryDefinition[] = [];

	// get all the matching partOfSpeech elements, we assume that as the overall number of elements
	// to be checked for definitions
	const definitionElements = $(DictionarySearchSelector.definitionPartOfSpeech);

	for (let i = 0; i < definitionElements.length; i++) {
		const partOfSpeech = $(definitionElements[i]).text().trim();
		if (partOfSpeech) {
			const definition = $(DictionarySearchSelector.definition)
				.eq(i)
				.text()
				.trim();
			const example = $(DictionarySearchSelector.definitionExample)
				.eq(i)
				.text()
				.trim();
			const synonyms = $(DictionarySearchSelector.definitionSynonyms)
				.eq(i)
				.text()
				// at the start of the string, remove "synonyms: "
				.replace("synonyms: ", "")
				.split(",")
				// some strings have extra spaces, trim them (might have performance implications TODO: check later)
				.map((synonym) => synonym.trim());

			definitions.push({
				partOfSpeech,
				definition,
				example,
				synonyms,
			});
		}
	}

	if (isEmpty(strictSelector, audio, phonetic, word)) return null;

	return {
		type: ResultTypes.DictionaryResult,
		audio,
		phonetic,
		word,
		definitions,
	};
};

/**
 * Parses time search results.
 * @returns Array of TimeResultNode
 */
export const TimeResult: ResultSelector<TimeResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("TimeResult");
	const location = $(TimeSearchSelector.location).text().trim();
	const time = $(TimeSearchSelector.time).text().trim();
	const timeInWords = $(TimeSearchSelector.timeInWords).text().trim();

	if (isEmpty(strictSelector, location, time, timeInWords)) return null;

	return {
		type: ResultTypes.TimeResult,
		location,
		time,
		timeInWords,
	};
};

/**
 * Parses currency convert search results.
 * @returns Array of CurrencyResultNode
 */
export const CurrencyResult: ResultSelector<CurrencyResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("CurrencyResult");
	const from = $(CurrencyConvertSelector.from).text().replace("=", "").trim();
	const to = $(CurrencyConvertSelector.to).text().trim();

	if (isEmpty(strictSelector, from, to)) return null;

	return {
		type: ResultTypes.CurrencyResult,
		from: from,
		to,
	};
};
