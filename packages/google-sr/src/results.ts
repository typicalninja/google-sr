import {
	CurrencyConvertSelector,
	DictionarySearchSelector,
	KnowledgePanelSelector,
	OrganicSearchSelector,
	TimeSearchSelector,
	TranslateSearchSelector,
} from "google-sr-selectors";
import {
	type CurrencyResultNode,
	type DictionaryDefinition,
	type DictionaryResultNode,
	type KnowledgePanelCatalog,
	type KnowledgePanelCatalogItem,
	type KnowledgePanelImage,
	type KnowledgePanelMetadata,
	type KnowledgePanelResultNode,
	type OrganicResultNode,
	type ResultSelector,
	ResultTypes,
	type TimeResultNode,
	type TranslateResultNode,
	TranslateSourceTextRegex,
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
		let link = $(element).find(OrganicSearchSelector.link).attr("href") ?? null;
		const description = $(element)
			.find(OrganicSearchSelector.description)
			.text() as string;
		const title = $(element).find(OrganicSearchSelector.title).text() as string;
		link = extractUrlFromGoogleLink(link);
		// if not links is found its not a valid result, we can safely skip it
		if (typeof link !== "string") continue;
		// both title and description can be empty, we skip the result only if strictSelector is true
		if (isEmpty(strictSelector, description, title)) continue;

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
	// only one block is expected, and it should be the first one
	const translateBlock = $(TranslateSearchSelector.block).first();
	if (!translateBlock) return null;
	// old version does not have seperate source and target language
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
			strictSelector,
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

/**
 * Parses knowledge panel search results.
 * @param $
 * @param strictSelector
 * @returns KnowledgePanelResultNode
 */
export const KnowledgePanelResult: ResultSelector<KnowledgePanelResultNode> = (
	$,
	strictSelector,
) => {
	if (!$) throwNoCheerioError("KnowledgePanelResult");
	const title = $(KnowledgePanelSelector.title).text().trim();
	const description = $(KnowledgePanelSelector.description)
		.contents()
		.first()
		.text()
		.trim();
	const label = $(KnowledgePanelSelector.label).text().trim();

	const metadataBlock = $(KnowledgePanelSelector.metadataBlock);
	const metadata: KnowledgePanelMetadata[] = [];

	for (const element of metadataBlock) {
		const label = $(element)
			.find(KnowledgePanelSelector.metadataLabel)
			.text()
			.trim();
		const value = $(element)
			.find(KnowledgePanelSelector.metadataValue)
			.text()
			.trim();
		if (label && value) metadata.push({ label, value });
	}

	const imageSource = $(KnowledgePanelSelector.imageSource);
	const images: KnowledgePanelImage[] = [];
	for (const element of imageSource) {
		const source = $(element).attr("href") as string;
		const url = $(element)
			.find(KnowledgePanelSelector.imageUrl)
			.attr("src") as string;
		if (source && url) {
			const filteredSource = extractUrlFromGoogleLink(source);
			if (filteredSource)
				images.push({ source: filteredSource as string, url });
		}
	}

	const catalogBlock = $(KnowledgePanelSelector.catalogBlock);
	const catalog: KnowledgePanelCatalog[] = [];
	for (const element of catalogBlock) {
		const title = $(element)
			.find(KnowledgePanelSelector.catalogTitle)
			.text()
			.trim();
		const items: KnowledgePanelCatalogItem[] = [];
		const catalogItems = $(element).find(KnowledgePanelSelector.catalogItem);
		if (!title || !catalogItems.length) continue;
		for (const item of catalogItems) {
			const itemImage = $(item)
				.find(KnowledgePanelSelector.catalogItemImage)
				.attr("src") as string;
			const itemTitle = $(item)
				.find(KnowledgePanelSelector.catalogItemTitle)
				.text()
				.trim();
			const itemCaption = $(item)
				.find(KnowledgePanelSelector.catalogItemCaption)
				.text()
				.trim();
			// only itemTitle and itemImage are required
			if (item && itemImage)
				items.push({
					title: itemTitle,
					image: itemImage,
					caption: itemCaption,
				});
		}
		if (title && items.length) catalog.push({ title, items });
	}

	if (isEmpty(strictSelector, title, description, label)) return null;

	return {
		type: ResultTypes.KnowledgePanelResult,
		title,
		description,
		label,
		metadata,
		images,
		catalog,
	};
};
