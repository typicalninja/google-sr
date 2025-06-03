import type { Statistics } from "./selector-report.js";

interface SummaryParams {
	query: string;
	searchParams: URLSearchParams;
	url: string;
	requestHeaders: Record<string, string>;
	dataBytes: string;
	response: Response;
	selectorStatistics: Statistics;
}

function getPercentage(part: number, total: number): string {
	return total > 0 ? `${((part / total) * 100).toFixed(2)}%` : "0%";
}

export function generateSummary({
	query,
	searchParams,
	url,
	requestHeaders,
	dataBytes,
	response,
	selectorStatistics,
}: SummaryParams): string {
	console.log("Generating summary for this run...");
	const selectorMatchPercentage = getPercentage(
		selectorStatistics.totalSelectorsMatched,
		selectorStatistics.totalSelectorsChecked,
	);
	const summaryGenerationTime = Date.now();
	return `## Summary
Generated at: \`${new Date(summaryGenerationTime).toLocaleString()}\` for query: \`${query}\`

## Statistics
- \`${selectorMatchPercentage}\` of selectors matched the query.
  - **Total Selectors Checked:** \`${selectorStatistics.totalSelectorsChecked}\`
  - **Total Selectors Matched:** \`${selectorStatistics.totalSelectorsMatched}\`

### Selector Breakdown
${Object.entries(selectorStatistics.selectorsByType)
	.map(
		([
			type,
			{ nonMatchedSelectors, matchedSelectors, totalSelectors },
		]) => `[\`${type}\`](./selectors.md#${type.toLowerCase()}): ${matchedSelectors}/${totalSelectors} (\`${getPercentage(matchedSelectors, totalSelectors)}\`)
<details>
\n<summary>Non matched (${nonMatchedSelectors.length})</summary>\n\n${nonMatchedSelectors.map((selector) => `- ${selector}`).join("\n")}
</details>\n<br>\n`,
	)
	.join("\n")}

## Request Information
- **Search Query:** \`${query}\`
- **Query params:** \`${searchParams.toString()}\`
- **Request URL:** \`${url}\`
- **Headers:** 
${Object.entries(requestHeaders)
	.map(([key, value]) => `  - \`${key}: ${value}\``)
	.join("\n")}

## Response Information
- **Response Size:** \`${dataBytes}\`
- **Response Headers:**
${Array.from(response.headers.entries())
	.map(([key, value]) => `  - \`${key}: ${value}\``)
	.join("\n")}
---
Generation Time: \`${Date.now() - summaryGenerationTime} ms\`
	`;
}
