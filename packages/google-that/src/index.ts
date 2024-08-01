#!/usr/bin/env node

import { ResultTypes } from "google-sr";
import yargs from "yargs/yargs";
import { resultTypeArray } from "./constants.js";
import { validateOptions } from "./helpers.js";

// for running commands with args we use yargs
const argv = yargs(process.argv.slice(2))
	.options({
		// main query
		query: { type: "string", alias: "q", demandOption: true },
		// in default mode, output will go to stdout
		write: { type: "boolean", alias: "w", default: false },
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
