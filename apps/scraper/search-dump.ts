import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

import { generateSelectorReport } from "./selector-report.js";
import { generateSummary } from "./summary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const curDate = Date.now();
const destinationDir = path.resolve(__dirname, `sdump/${curDate}`);
const query = process.argv.slice(2).join(" ");

// Format bytes to human readable format
function formatBytes(bytes: number) {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

const requestHeaders = {
	Accept: "text/html, application/xhtml+xml, */*",
	"Accept-Encoding": "gzip, deflate",
	"Accept-Language": "en-US,en;q=0.5",
	// IE 9 user agent to get no js google search page
	"User-Agent": "Mozilla/5.0 (MSIE 10.0; Windows NT 6.1; Trident/5.0)",
	Connection: "Keep-Alive",
	Referer: "https://www.google.com/",
};

// Main function to handle the search dumping process
async function main(searchQuery: string) {
	console.log(`\n🔍 Starting search dump for query: "${searchQuery}"\n`);

	const searchParams = new URLSearchParams({
		q: searchQuery,
		hl: "en",
		ie: "UTF-8",
	});

	const url = `https://www.google.com/search?${searchParams}`;

	try {
		const response = await fetch(url, {
			headers: requestHeaders,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		// Get data buffer and detect charset from headers
		//const dataBuffer = await response.arrayBuffer();
		const contentType = response.headers.get("content-type") || "";
		const charsetMatch = contentType.match(/charset=([^;]+)/i);
		const charset = charsetMatch ? charsetMatch[1].toLowerCase() : "iso-8859-1";

		// const data = new TextDecoder(charset).decode(dataBuffer);
		const data = await response.text();
		const dataBytes = formatBytes(data.length);
		console.log(
			`📥 Received response: ${dataBytes} of ${charset} content type`,
		);

		const $ = cheerio.load(data);
		const mainContent = $("html");

		const htmlDumpFile = path.resolve(destinationDir, "./dump.html");
		const selectorDumpFile = path.resolve(destinationDir, "./selectors.md");
		const summaryFile = path.resolve(destinationDir, "./summary.md");

		const [selectorReport, statistics] = generateSelectorReport({
			query: searchQuery,
			$,
		});

		const summary = generateSummary({
			query: searchQuery,
			searchParams,
			url,
			requestHeaders,
			dataBytes,
			response,
			selectorStatistics: statistics,
		});

		// Create directory and write files in parallel
		await fs.mkdir(destinationDir, { recursive: true });

		await Promise.all([
			fs.writeFile(
				htmlDumpFile,
				mainContent.html() ?? "Unknown Content??",
				"utf-8",
			),
			fs.writeFile(summaryFile, summary, "utf-8"),
			fs.writeFile(selectorDumpFile, selectorReport, "utf-8"),
		]);

		console.log(
			`\n✅ Search dump completed. Files saved to: ${destinationDir}\n`,
		);
	} catch (error) {
		console.error(`\n❌ Error: ${(error as Error).message}\n`);
		process.exit(1);
	}
}

// Check if query is provided and run the main function
if (!query || query.length === 0) {
	console.error("\n❌ Error: No search query provided.\n");
} else {
	main(query);
}
