import type { Cheerio, Element } from "cheerio";
import {
	CurrencyConvertSelector,
	DictionarySearchSelector,
	GeneralSelector,
	KnowledgePanelSelector,
	OrganicSearchSelector,
	TimeSearchSelector,
	TranslateSearchSelector,
} from "google-sr-selectors";
import {
	type CurrencyResultNode,
	type DictionaryDefinition,
	type DictionaryMeaning,
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
	const organicSearchBlocks = $(GeneralSelector.block).toArray();
	// parse each block individually for its content
	// TODO: switched from cheerio.each to for..of loop (check performance in future tests)
	for (const element of organicSearchBlocks) {
		let link = $(element).find(OrganicSearchSelector.link).attr("href") ?? null;
		const description = $(element)
			.find(OrganicSearchSelector.description)
			.text() as string;
		const title = $(element).find(OrganicSearchSelector.title).text() as string;
		link = extractUrlFromGoogleLink(link);
		// if not links is found it's not a valid result, we can safely skip it
		// most likely the first result can be a special block
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

// extract logic for parsing dictionary definitions into a separate function
const parseDefinitionBlock = (
	definitionBlock: Cheerio<Element>,
): DictionaryDefinition | null => {
	const definitionTextBlock = definitionBlock.find(
		DictionarySearchSelector.definitionTextBlock,
	);
	const definitionText = definitionTextBlock.eq(0).text().trim();
	const example = definitionTextBlock.eq(1).text().trim();
	// synonym is a comma separated list starting with "synonyms: "
	const synonyms = definitionTextBlock
		.eq(2)
		.text()
		.trim()
		.replace("synonyms: ", "")
		.split(", ")
		.filter((s) => s !== "");
	// definition is required, example and synonyms are optional
	if (!definitionText) return null;
	const definition: DictionaryDefinition = {
		definition: definitionText,
	};
	if (example && example !== "") definition.example = example;
	if (synonyms && synonyms.length > 0) definition.synonyms = synonyms;

	return definition;
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
	const dictionaryBlock = $(GeneralSelector.block).first();
	if (!dictionaryBlock) return null;
	const phonetic = dictionaryBlock
		.find(DictionarySearchSelector.phonetic)
		.first()
		.text()
		.trim();
	const word = dictionaryBlock
		.find(DictionarySearchSelector.word)
		.text()
		.trim();

	const meanings: DictionaryMeaning[] = [];
	const definitionContainer = dictionaryBlock
		.find(DictionarySearchSelector.definitionsContainer)
		.first();
	// if no definitions, we return null
	if (!definitionContainer) return null;
	const definitionBlocks = definitionContainer
		.find(DictionarySearchSelector.definitionsBlock)
		.toArray();
	// there is no clear distinction between definitions, we need to loop through each block
	// definitions at most will have a part of speech, and an ol list of definitions
	// each definition may have a definition text (required), an example and synonyms (not guaranteed)
	// we loop through each block
	let partOfSpeech: string | null = null;
	for (const definitionBlock of definitionBlocks) {
		if (!partOfSpeech) {
			// if no previous part of speech, then we expect this block to have it
			// normally the first (and only) element in this block is the part of speech
			// but just to be sure we use first() to get the first element with a selector
			partOfSpeech = $(definitionBlock)
				.find(DictionarySearchSelector.definitionPartOfSpeech)
				.first()
				.text()
				.trim();
		} else {
			// if we have a part of speech, then we expect this block to have definitions
			const definitionLists = $(definitionBlock)
				.find(DictionarySearchSelector.definitionList)
				.toArray();
			let definitions: DictionaryDefinition[];
			if (definitionLists.length > 0) {
				definitions = definitionLists
					.map((item) => parseDefinitionBlock($(item)))
					.filter((d) => d !== null);
			} else {
				// single definition words do not have list
				// instead they have the content directly as children
				const definition = parseDefinitionBlock($(definitionBlock));
				if (definition) definitions = [definition];
				else definitions = [];
			}
			// single definition words do not have list, instead they have the thing that is supposed to be in the list directly

			meanings.push({
				partOfSpeech,
				definitions,
			});
			// reset part of speech for the next block
			partOfSpeech = null;
		}
	}

	if (isEmpty(strictSelector, phonetic, word)) return null;

	return {
		type: ResultTypes.DictionaryResult,
		phonetic,
		word,
		meanings,
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
