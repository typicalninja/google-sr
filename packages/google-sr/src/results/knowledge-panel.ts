import { GeneralSelector, KnowledgePanelSelector } from "google-sr-selectors";
import {
	type ResultParser,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants.js";
import {
	coerceToStringOrUndefined,
	extractUrlFromGoogleLink,
	throwNoCheerioError,
} from "../utils.js";

export interface KnowledgePanelMetadata {
	label: string;
	value: string;
}

export interface KnowledgePanelResultNode extends SearchResultNodeLike {
	type: typeof ResultTypes.KnowledgePanelResult;
	title: string; // The title of the knowledge panel
	description: string; // The description of the knowledge panel
	label: string;
	sourceLink?: string; // The link to the source of the knowledge panel
	imageLink?: string; // The link to the image associated with the knowledge panel
	metadata: KnowledgePanelMetadata[]; // An array of metadata objects containing label and value pairs
}

/**
 * Parses knowledge panel search results.
 * Knowledge panels appear for well-known entities like people, places, and organizations.
 *
 * @example
 * ```ts
 * import { KnowledgePanelResult, search } from 'google-sr';
 *
 * const results = await search({
 * 	query: 'Albert Einstein',
 * 	parsers: [KnowledgePanelResult],
 * });
 * ```
 *
 * @param $ - The CheerioAPI instance
 * @param noPartialResults - Whether to exclude results with missing properties
 * @returns
 * - If noPartialResults is true: {@link KnowledgePanelResultNode} object or null
 * - If noPartialResults is false: {@link PartialExceptType}<{@link KnowledgePanelResultNode}> object or null
 */
export const KnowledgePanelResult: ResultParser<KnowledgePanelResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("KnowledgePanelResult");
	// knowledge panel can be anywhere, at the start, or +x (mostly 2) from the start
	const blocks = $(GeneralSelector.block);
	let blocksSearched = 0;
	for (const block of blocks) {
		// according to the tests, knowledge panel is always within the first 5 blocks
		// so we can break the loop after 5 blocks
		if (blocksSearched > 5) break;
		blocksSearched++;
		const $el = $(block);
		const headerBlock = $el.find(KnowledgePanelSelector.headerBlock).first();
		if (!headerBlock.length) continue; // knowledge panel header block is required

		// USE continue for blocks that make this invalid block
		// USE break if we found a valid knowledge panel but certain properties are missing
		// and noPartialResults is true

		const title = coerceToStringOrUndefined(
			headerBlock.find(KnowledgePanelSelector.title).text(),
		);
		if (noPartialResults && !title) break;

		const label = coerceToStringOrUndefined(
			headerBlock.find(KnowledgePanelSelector.label).text().trim(),
		);
		if (noPartialResults && !label) break;

		const descriptionBlock = $el.find(KnowledgePanelSelector.descriptionBlock);
		if (!descriptionBlock.length) continue;

		const description = coerceToStringOrUndefined(
			descriptionBlock.find("span").first().text(),
		);
		if (noPartialResults && !description) break;

		// second span is the source link, we can get the source link from the href attribute
		// source link is optional, we ignore it for noPartialResults check
		const sourceLink = descriptionBlock.find("a").attr("href");
		const cleanSourceLink = coerceToStringOrUndefined(
			extractUrlFromGoogleLink(sourceLink),
		);

		// metadata blocks are optional, we can skip them if they are not present
		const metadataBlocks = $el
			.find(KnowledgePanelSelector.metadataBlock)
			.toArray();

		const metadata: KnowledgePanelMetadata[] = [];

		for (const metadataContainerElement of metadataBlocks) {
			const metadataContainer = $(metadataContainerElement);
			const label = metadataContainer
				.find(KnowledgePanelSelector.metadataLabel)
				.first()
				.text();
			if (label === "") continue;
			const value = metadataContainer
				.find(KnowledgePanelSelector.metadataValue)
				.text();
			if (value === "") continue;
			metadata.push({
				label,
				value,
			});
		}

		// image link is optional, so no need to check for noPartialResults
		const imageLink = coerceToStringOrUndefined(
			headerBlock.next().find(KnowledgePanelSelector.imageUrl).attr("src"),
		);

		return {
			type: ResultTypes.KnowledgePanelResult,
			title,
			label,
			description,
			sourceLink: cleanSourceLink,
			imageLink: imageLink,
			metadata,
		} as KnowledgePanelResultNode;
	}

	return null;
};
