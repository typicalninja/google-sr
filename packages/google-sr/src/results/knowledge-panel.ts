import {
	type ResultSelector,
	ResultTypes,
	type SearchResultNodeLike,
} from "../constants";
import {
	extractUrlFromGoogleLink,
	isEmpty,
	throwNoCheerioError,
} from "../utils";

// Importing the Selectors from google-sr-selectors
import { GeneralSelector, KnowledgePanelSelector } from "google-sr-selectors";

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
 * @param $
 * @param noPartialResults
 * @returns KnowledgePanelResultNode
 */
export const KnowledgePanelResult: ResultSelector<KnowledgePanelResultNode> = (
	$,
	noPartialResults,
) => {
	if (!$) throwNoCheerioError("KnowledgePanelResult");
	// knowledge panel can be anywhere, at the start, or +x (mostly 2) from the start
	const blocks = $(GeneralSelector.block);
	// we loop through each block to find the first valid knowledge panel
	// we use cheerio.each instead of for-of loop because we need to break the loop to avoid
	// parsing non-knowledge panel blocks
	let knowledgePanel: KnowledgePanelResultNode | null = null;
	blocks.each((index, element) => {
		// knowledge panel will always be within +5 blocks from the start
		if (index > 5) return false;
		const block = $(element);
		const headerContainer = block.find(KnowledgePanelSelector.headerBlock);
		const headerBlock = headerContainer.first();
		// the second td contains the image data
		const imageContainer = headerBlock.next();
		if (!headerBlock) return;
		const title = headerBlock.find(KnowledgePanelSelector.title).text().trim();
		const label = headerBlock.find(KnowledgePanelSelector.label).text().trim();
		const imageLink = imageContainer
			.find(KnowledgePanelSelector.imageUrl)
			.attr("src");
		// if we don't find a title or label, then this is an invalid knowledge panel
		if (title === "" || label === "") return;
		const descriptionBlock = block.find(
			KnowledgePanelSelector.descriptionBlock,
		);
		const description = descriptionBlock.find("span").first().text().trim();
		// second span is the source link, we can get the source link from the href attribute
		const sourceLink = descriptionBlock.find("a").attr("href");
		const cleanSourceLink = extractUrlFromGoogleLink(sourceLink ?? null);
		// source link is optional in normal reqs, we ignore it for strictSelector check
		const metadataBlocks = block
			.find(KnowledgePanelSelector.metadataBlock)
			.toArray();
		const metadata: KnowledgePanelMetadata[] = [];

		for (const metadataContainerElement of metadataBlocks) {
			const metadataContainer = $(metadataContainerElement);
			const label = metadataContainer
				.find(KnowledgePanelSelector.metadataLabel)
				.first()
				.text()
				.trim();
			if (label === "") continue;
			const value = metadataContainer
				.find(KnowledgePanelSelector.metadataValue)
				.text()
				.trim();
			if (value === "") continue;
			metadata.push({
				label,
				value,
			});
		}

		if (!isEmpty(noPartialResults, title, description, label))
			knowledgePanel = {
				type: ResultTypes.KnowledgePanelResult,
				title,
				label,
				description,
				sourceLink: cleanSourceLink ?? undefined,
				imageLink: imageLink ?? undefined,
				metadata,
			};
		return false;
	});

	return knowledgePanel;
};
