#!/usr/bin/env node

import fsPromises from "node:fs/promises";
import { ResultTypes, search } from "google-sr";
import yargs from "yargs/yargs";
import { resultTypeArray } from "./constants.js";
import { selectorTypeArrayToSelector, validateOptions } from "./helpers.js";

const argv = yargs(process.argv.slice(2))
	.options({
		// our query, can be one or multiple queries
		query: { type: "string", alias: "q" },
		queries: { type: "array", alias: "Q" },

		// in default mode, output will go to stdout
		// providing a string will write to a file with that name (placeholder variables are supported)
		// such as %query% will be replaced with the query
		// and %queryIndex% will be replaced with the index of the query
		write: { type: "string", alias: "w" },
		// fetch specific page
		page: { type: "number", alias: "p" },
		// fetch multiple specific pages
		pages: { type: "number", alias: "P" },
		// the cursor start for pages
		start: { type: "number", alias: "s" },
	})
	.option("resultTypes", {
		type: "array",
		alias: "r",
		choices: resultTypeArray,
		default: [ResultTypes.OrganicResult],
	})
	.parseSync();

if (!validateOptions(argv)) {
	process.exit(1);
}

const providedQuery = (argv.query ? [argv.query] : argv.queries) as string[];

const queryResult: { query: string; results: unknown }[] = [];

for (const query of providedQuery) {
	// sometimes the query is a number (yargs parse it this way), convert it to string
	const stringQuery = String(query);
	const selectors = selectorTypeArrayToSelector(argv.resultTypes);

	const results = await search({
		query: stringQuery,
		resultTypes: selectors,
	});

	if (results.length) {
		queryResult.push({ query, results });
	}
}

if (typeof argv.write === "string") {
	let fileWriteFormat = "";
	if (argv.write === "") {
		// use the default write format which is %queryIndex%-%query%.json
		fileWriteFormat = "%queryIndex%-%query%.json";
	} else {
		// use the provided format
		fileWriteFormat = argv.write;
	}

	for (const item in queryResult) {
		const { query, results } = queryResult[item];
		const formattedFileName = fileWriteFormat
			.replace("%query%", query)
			.replace("%queryIndex%", item);
		await fsPromises.writeFile(
			formattedFileName,
			JSON.stringify(results, null, 1),
		);
	}
} else {
	// simply log the results with minimal formatting
	process.stdout.write(JSON.stringify(queryResult, null, 1));
}
