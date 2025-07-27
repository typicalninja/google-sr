import type { Cheerio } from "cheerio";
import { DictionarySearchSelector, GeneralSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants.js";
import { coerceToStringOrUndefined, throwNoCheerioError } from "../utils.js";

export interface DictionaryDefinition {
	definition: string; // The definition text
	example?: string; // An example sentence using the word
	synonyms?: string[]; // List of synonyms for this definition
}

export interface DictionaryMeaning {
	partOfSpeech: string; // The part of speech (e.g., "noun", "verb")
	definitions: DictionaryDefinition[]; // Array of definitions for this part of speech
}

export interface DictionaryResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.DictionaryResult;
	meanings: DictionaryMeaning[];
	phonetic: string; // The phonetic spelling of the word
	word: string; // The word being defined
}

// extract logic for parsing dictionary definitions into a separate function
const parseDefinitionBlock = (
	// biome-ignore lint/suspicious/noExplicitAny: Element type no longer exported from cheerio v1.1.0, avoiding domhandler dependency for single type usage
	definitionBlock: Cheerio<any>,
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
export const DictionaryResult: ResultParser<DictionaryResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("DictionaryResult");
	const dictionaryBlock = $(GeneralSelector.block).first();
	if (!dictionaryBlock.length) return null;

	const phonetic = coerceToStringOrUndefined(
		dictionaryBlock.find(DictionarySearchSelector.phonetic).first().text(),
	);
	if (noPartialResults && !phonetic) return null;

	const word = coerceToStringOrUndefined(
		dictionaryBlock.find(DictionarySearchSelector.word).text(),
	);
	if (noPartialResults && !word) return null;

	const definitionContainer = dictionaryBlock
		.find(DictionarySearchSelector.definitionsContainer)
		.first();
	// if no definitions, we return null as we can't parse the result
	if (!definitionContainer.length) return null;

	const definitionBlocks = definitionContainer
		.find(DictionarySearchSelector.definitionsBlock)
		.toArray();
	const meanings: DictionaryMeaning[] = [];
	// there is no clear distinction between definitions, we need to loop through each block
	// definitions at most will have a part of speech, and an ol list of definitions
	// each definition may have a definition text (required), an example and synonyms (not guaranteed)
	// we loop through each block
	let partOfSpeech: string | undefined;
	for (const definitionBlock of definitionBlocks) {
		const $definitionBlock = $(definitionBlock);
		if (!partOfSpeech) {
			// if no previous part of speech, then we expect this block to have it
			// normally the first (and only) element in this block is the part of speech
			// but just to be sure we use first() to get the first element with the selector
			partOfSpeech = coerceToStringOrUndefined(
				$definitionBlock
					.find(DictionarySearchSelector.definitionPartOfSpeech)
					.first()
					.text(),
			);
		} else {
			// if we have a part of speech, then we expect this block to have definitions
			const definitionLists = $definitionBlock
				.find(DictionarySearchSelector.definitionList)
				.toArray();

			let definitions: DictionaryDefinition[] | undefined;
			if (definitionLists.length > 0) {
				definitions = definitionLists
					.map((item) => parseDefinitionBlock($(item)))
					.filter((d) => d !== null);
			} else {
				// single definition words do not have list
				// instead they have the content directly as children
				const definition = parseDefinitionBlock($definitionBlock);
				if (definition) definitions = [definition];
			}

			// if there were definitions found, we add them to the meanings array
			if (definitions && definitions.length > 0) {
				meanings.push({
					partOfSpeech,
					definitions,
				});
			}
			// reset part of speech for the next block
			partOfSpeech = undefined;
		}
	}

	if (noPartialResults && meanings.length === 0) return null;

	return {
		type: ResultTypes.DictionaryResult,
		phonetic,
		word,
		meanings,
	} as DictionaryResultNode;
};
