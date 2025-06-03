import type { CheerioAPI } from "cheerio";
import * as Selectors from "google-sr-selectors";

export interface Statistics {
	totalSelectorsChecked: number;
	totalSelectorsMatched: number;
	selectorsByType: Record<
		string,
		{
			matchedSelectors: number;
			totalSelectors: number;
			nonMatchedSelectors: string[];
		}
	>;
}

interface SelectorReportParams {
	query: string;
	$: CheerioAPI;
}

export function generateSelectorReport({
	query,
	$,
}: SelectorReportParams): [string, Statistics] {
	console.log("Generating selector report");
	// this is used by the summary generation
	const statistics: Statistics = {
		totalSelectorsChecked: 0,
		totalSelectorsMatched: 0,
		selectorsByType: {},
	};

	let selectorReport = `# Selector Report
Generated for query: \`${query}\` at \`${new Date().toLocaleString()}\``;

	for (const [queryType, querySelectors] of Object.entries(Selectors)) {
		statistics.selectorsByType[queryType] = {
			matchedSelectors: 0,
			totalSelectors: Object.keys(querySelectors).length,
			nonMatchedSelectors: [],
		};

		let selectorReportSection = `\n\n---\n\n#### ${queryType}`;

		for (const [selectorName, selector] of Object.entries(querySelectors)) {
			statistics.totalSelectorsChecked++;
			const result = $(selector);
			const matchedCount = result.length;

			if (matchedCount > 0) {
				statistics.selectorsByType[queryType].matchedSelectors++;
				statistics.totalSelectorsMatched++;
				selectorReportSection += `\n\n##### **${selectorName}**: \`${selector}\`\n>\`${matchedCount}\` matched elements\n`;

				// Individual text nodes
				let textBlocks = "";
				result.each((_, el) => {
					const text = $(el).text().trim();
					if (text && text.length > 0) {
						textBlocks += `\n\`\`\`txt\n${text}\n\`\`\`\n`;
					}
				});
				if (textBlocks) {
					selectorReportSection += `\n<details><summary>Matching Text Content</summary>\n${textBlocks}\n</details>`;
				}

				// Individual HTML nodes
				let htmlBlocks = "";
				result.each((_, el) => {
					let html = $(el).html();
					if (html) {
						html = html.trim();
						if (html.length > 0) {
							htmlBlocks += `\n\`\`\`html\n${html}\n\`\`\`\n`;
						}
					}
				});
				if (htmlBlocks) {
					selectorReportSection += `\n<details><summary>Matching HTML Content</summary>\n${htmlBlocks}\n</details>`;
				}
			} else {
				statistics.selectorsByType[queryType].nonMatchedSelectors.push(
					`${selectorName}: \`${selector}\``,
				);
			}
		}

		const nonMatchedSelectors =
			statistics.selectorsByType[queryType].nonMatchedSelectors;
		// Add any selectors that did not match to the end of the section
		if (nonMatchedSelectors.length > 0) {
			selectorReportSection += `\n\n#### Non-matched selectors:\n- ${nonMatchedSelectors.join("\n- ")}`;
		} else {
			selectorReportSection += "\n\n#### No non-matched selectors.";
		}

		if (statistics.selectorsByType[queryType].matchedSelectors > 0) {
			selectorReport += selectorReportSection;
		}
	}

	return [selectorReport, statistics];
}
